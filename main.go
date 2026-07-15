package main

import (
	"crypto/subtle"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
	"github.com/nexaa-cloud/nexaa-cli/config"

	"github.com/nexaa-cloud/nexaa-mcp/tools"
)

func main() {
	_ = godotenv.Load()
	config.Initialize()

	if err := authenticate(); err != nil {
		fmt.Fprintf(os.Stderr, "authentication failed: %v\n", err)
		os.Exit(1)
	}

	tools.SetClient(api.NewClient())

	s := server.NewMCPServer("nexaa", "2.0.0")

	tools.RegisterNamespace(s)
	tools.RegisterContainer(s)
	tools.RegisterContainerJob(s)
	tools.RegisterVolume(s)
	tools.RegisterRegistry(s)
	tools.RegisterDatabaseCluster(s)
	tools.RegisterDatabase(s)
	tools.RegisterDatabaseUser(s)
	tools.RegisterMessageQueue(s)
	tools.RegisterBilling(s)

	if port := os.Getenv("MCP_HTTP_PORT"); port != "" {
		token := os.Getenv("MCP_HTTP_TOKEN")
		if token == "" {
			fmt.Fprintln(os.Stderr, "MCP_HTTP_TOKEN must be set when MCP_HTTP_PORT is set: every tool (including destructive deletes) would otherwise be reachable over the network with no authentication")
			os.Exit(1)
		}

		addr := ":" + port
		baseURL := fmt.Sprintf("http://localhost:%s", port)
		sse := server.NewSSEServer(s, server.WithBaseURL(baseURL))
		handler := bearerAuth(token, sse)

		fmt.Fprintf(os.Stderr, "nexaa-mcp listening on %s\n", addr)
		if err := http.ListenAndServe(addr, handler); err != nil {
			fmt.Fprintf(os.Stderr, "server error: %v\n", err)
			os.Exit(1)
		}
		return
	}

	if err := server.ServeStdio(s); err != nil {
		fmt.Fprintf(os.Stderr, "server error: %v\n", err)
		os.Exit(1)
	}
}

func bearerAuth(token string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		presented, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
		if !ok || subtle.ConstantTimeCompare([]byte(presented), []byte(token)) != 1 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func authenticate() error {
	username := os.Getenv("NEXAA_USERNAME")
	password := os.Getenv("NEXAA_PASSWORD")

	if username != "" && password != "" {
		return api.Login(username, password)
	}

	if err := config.LoadConfig(); err != nil {
		return fmt.Errorf("no credentials available: set NEXAA_USERNAME and NEXAA_PASSWORD, or run nexaa-cli login first")
	}

	if config.AccessToken == "" {
		return fmt.Errorf("not authenticated: set NEXAA_USERNAME and NEXAA_PASSWORD, or run nexaa-cli login first")
	}

	if config.IsTokenExpired() {
		return fmt.Errorf("token expired: set NEXAA_USERNAME and NEXAA_PASSWORD to re-authenticate")
	}

	return nil
}
