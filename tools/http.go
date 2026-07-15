package tools

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/Khan/genqlient/graphql"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/nexaa-cloud/nexaa-cli/api"
	"github.com/nexaa-cloud/nexaa-cli/config"
)

var (
	clientMu sync.RWMutex
	client   *api.Client
	authMu   sync.Mutex
)

// jsonResult marshals v and wraps it as a text tool result.
func jsonResult(v any) *mcp.CallToolResult {
	data, err := json.Marshal(v)
	if err != nil {
		return mcp.NewToolResultError(err.Error())
	}
	return mcp.NewToolResultText(string(data))
}

// confirmDelete reports whether the tool call set confirm: true. When it
// didn't, it also returns the cancellation result the handler should return.
func confirmDelete(req mcp.CallToolRequest, resourceLabel string) (ok bool, cancelled *mcp.CallToolResult) {
	if req.GetBool("confirm", false) {
		return true, nil
	}
	return false, mcp.NewToolResultText(fmt.Sprintf("Deletion cancelled: confirm must be true to delete a %s.", resourceLabel))
}

// SetClient installs the active API client. Called once after initial
// authentication in main.go, and again internally whenever the access
// token is refreshed.
func SetClient(c *api.Client) {
	clientMu.Lock()
	defer clientMu.Unlock()
	client = c
}

func currentClient() *api.Client {
	clientMu.RLock()
	defer clientMu.RUnlock()
	return client
}

// withAPI invokes fn with the active API client. If the call fails because
// the access token expired, it refreshes the token and retries fn once with
// a newly constructed client (api.Client bakes its bearer token into a fixed
// HTTP transport at construction time, so a refreshed token requires a new
// client instance).
func withAPI[T any](fn func(*api.Client) (T, error)) (T, error) {
	result, err := fn(currentClient())
	if isUnauthorized(err) {
		if refreshErr := refreshAuth(); refreshErr == nil {
			SetClient(api.NewClient())
			result, err = fn(currentClient())
		}
	}
	return result, err
}

func isUnauthorized(err error) bool {
	var httpErr *graphql.HTTPError
	if errors.As(err, &httpErr) {
		return httpErr.StatusCode == http.StatusUnauthorized
	}
	return false
}

// refreshAuth obtains a fresh access token: first via the OAuth refresh_token
// grant, falling back to a full username/password login if NEXAA_USERNAME
// and NEXAA_PASSWORD are set. Mirrors the token-refresh behavior of the
// former TypeScript implementation, which re-authenticated before every
// request instead of only once at startup.
func refreshAuth() error {
	authMu.Lock()
	defer authMu.Unlock()

	if config.RefreshToken != "" {
		if err := refreshWithToken(config.RefreshToken); err == nil {
			return nil
		}
	}

	username := os.Getenv("NEXAA_USERNAME")
	password := os.Getenv("NEXAA_PASSWORD")
	if username != "" && password != "" {
		return api.Login(username, password)
	}

	return fmt.Errorf("access token expired and could not be refreshed: set NEXAA_USERNAME/NEXAA_PASSWORD or run nexaa-cli login again")
}

func refreshWithToken(refreshToken string) error {
	data := url.Values{}
	data.Set("grant_type", "refresh_token")
	data.Set("client_id", "cloud-tilaa")
	data.Set("refresh_token", refreshToken)

	req, err := http.NewRequest(http.MethodPost, config.KEYCLOAK_URL+"/realms/tilaa/protocol/openid-connect/token", strings.NewReader(data.Encode()))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("refresh_token grant failed (%d)", resp.StatusCode)
	}

	var oauthResp struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		ExpiresIn    int64  `json:"expires_in"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&oauthResp); err != nil {
		return err
	}

	config.AccessToken = oauthResp.AccessToken
	config.RefreshToken = oauthResp.RefreshToken
	config.ExpiresAt = time.Now().Add(time.Duration(oauthResp.ExpiresIn) * time.Second).Unix()

	return config.SaveConfig()
}

func rawGQL(ctx context.Context, query string, vars map[string]any) (json.RawMessage, error) {
	return rawGQLAttempt(ctx, query, vars, true)
}

func rawGQLAttempt(ctx context.Context, query string, vars map[string]any, allowRetry bool) (json.RawMessage, error) {
	body, err := json.Marshal(map[string]any{"query": query, "variables": vars})
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", config.GRAPHQL_URL, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+config.AccessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized && allowRetry {
		if refreshErr := refreshAuth(); refreshErr == nil {
			return rawGQLAttempt(ctx, query, vars, false)
		}
	}

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("request failed (%d): %s", resp.StatusCode, string(respBody))
	}

	var result struct {
		Data   json.RawMessage `json:"data"`
		Errors []struct {
			Message string `json:"message"`
		} `json:"errors"`
	}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return nil, err
	}
	if len(result.Errors) > 0 {
		return nil, fmt.Errorf("%s", result.Errors[0].Message)
	}
	return result.Data, nil
}

func authFetch(ctx context.Context, path string) (string, error) {
	return authFetchAttempt(ctx, path, true)
}

func authFetchAttempt(ctx context.Context, path string, allowRetry bool) (string, error) {
	graphqlURL, err := url.Parse(config.GRAPHQL_URL)
	if err != nil {
		return "", fmt.Errorf("invalid NEXAA_GRAPHQL_URL %q: %w", config.GRAPHQL_URL, err)
	}
	baseURL := graphqlURL.Scheme + "://" + graphqlURL.Host
	req, err := http.NewRequestWithContext(ctx, "GET", baseURL+path, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+config.AccessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized && allowRetry {
		if refreshErr := refreshAuth(); refreshErr == nil {
			return authFetchAttempt(ctx, path, false)
		}
	}

	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("request failed (%d): %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	return string(body), err
}
