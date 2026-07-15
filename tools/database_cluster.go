package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

var dbUserPermItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"databaseName": map[string]any{"type": "string"},
		"permission":   map[string]any{"type": "string", "enum": []string{"READ_ONLY", "READ_WRITE"}},
		"state":        map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	},
	"required": []string{"databaseName", "permission", "state"},
}

var dbInputItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"name":        map[string]any{"type": "string"},
		"state":       map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
		"description": map[string]any{"type": "string"},
	},
	"required": []string{"name", "state"},
}

var dbUserInputItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"name":        map[string]any{"type": "string"},
		"password":    map[string]any{"type": "string"},
		"state":       map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
		"permissions": map[string]any{"type": "array", "items": dbUserPermItemSchema},
	},
	"required": []string{"name", "state", "permissions"},
}

type dbInputArg struct {
	Name        string  `json:"name"`
	State       string  `json:"state"`
	Description *string `json:"description"`
}

type dbUserPermArg struct {
	DatabaseName string `json:"databaseName"`
	Permission   string `json:"permission"`
	State        string `json:"state"`
}

type dbUserInputArg struct {
	Name        string          `json:"name"`
	Password    *string         `json:"password"`
	State       string          `json:"state"`
	Permissions []dbUserPermArg `json:"permissions"`
}

func toDatabaseInputs(args []dbInputArg) []api.DatabaseInput {
	out := make([]api.DatabaseInput, len(args))
	for i, a := range args {
		out[i] = api.DatabaseInput{
			Name:        a.Name,
			State:       api.State(a.State),
			Description: a.Description,
		}
	}
	return out
}

// toDatabaseUserPermissions converts the MCP-facing permission args into
// nexaa-cli's input type. Shared by nexaa_db_user_create/modify and
// toDatabaseUserInputs so the conversion only needs to be updated in one
// place if api.DatabaseUserPermissionInput's shape ever changes.
func toDatabaseUserPermissions(args []dbUserPermArg) []api.DatabaseUserPermissionInput {
	out := make([]api.DatabaseUserPermissionInput, len(args))
	for i, a := range args {
		out[i] = api.DatabaseUserPermissionInput{
			DatabaseName: a.DatabaseName,
			Permission:   api.DatabasePermission(a.Permission),
			State:        api.State(a.State),
		}
	}
	return out
}

func toDatabaseUserInputs(args []dbUserInputArg) []api.DatabaseUserInput {
	out := make([]api.DatabaseUserInput, len(args))
	for i, a := range args {
		out[i] = api.DatabaseUserInput{
			Name:        a.Name,
			Password:    a.Password,
			State:       api.State(a.State),
			Permissions: toDatabaseUserPermissions(a.Permissions),
		}
	}
	return out
}

func RegisterDatabaseCluster(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_list",
			mcp.WithDescription("List all cloud database clusters"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.CloudDatabaseClusterResult, error) {
				return c.CloudDatabaseClusterList()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_get",
			mcp.WithDescription("Get a cloud database cluster by name and namespace"),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterResult, error) {
				return c.CloudDatabaseClusterGet(api.CloudDatabaseClusterResourceInput{
					Name:      req.GetString("name", ""),
					Namespace: req.GetString("namespace", ""),
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_create",
			mcp.WithDescription("Create a cloud database cluster. Use nexaa_db_cluster_list_plans and nexaa_db_cluster_list_versions to discover valid plan IDs and spec values."),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("plan", mcp.Required(), mcp.Description("Plan ID from nexaa_db_cluster_list_plans")),
			mcp.WithObject("spec", mcp.Required(), mcp.Description("Database engine spec"),
				mcp.Properties(map[string]any{
					"type":    map[string]any{"type": "string", "description": "e.g. postgresql"},
					"version": map[string]any{"type": "string", "description": "e.g. 15"},
				}),
			),
			mcp.WithArray("databases", mcp.Items(dbInputItemSchema)),
			mcp.WithArray("users", mcp.Items(dbUserInputItemSchema)),
			mcp.WithObject("externalConnection"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Name               string           `json:"name"`
				Namespace          string           `json:"namespace"`
				Plan               string           `json:"plan"`
				Spec               struct {
					Type    string `json:"type"`
					Version string `json:"version"`
				} `json:"spec"`
				Databases          []dbInputArg     `json:"databases"`
				Users              []dbUserInputArg `json:"users"`
				ExternalConnection *extConnArg      `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterResult, error) {
				return c.CloudDatabaseClusterCreate(api.CloudDatabaseClusterCreateInput{
					Name:               args.Name,
					Namespace:          args.Namespace,
					Plan:               args.Plan,
					Spec:               api.CloudDatabaseClusterSpecInput{Type: args.Spec.Type, Version: args.Spec.Version},
					Databases:          toDatabaseInputs(args.Databases),
					Users:              toDatabaseUserInputs(args.Users),
					ExternalConnection: toExtConn(args.ExternalConnection),
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_modify",
			mcp.WithDescription("Modify a cloud database cluster. name and namespace are required; all other fields are optional."),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithArray("databases", mcp.Items(dbInputItemSchema)),
			mcp.WithArray("users", mcp.Items(dbUserInputItemSchema)),
			mcp.WithObject("externalConnection"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Name               string           `json:"name"`
				Namespace          string           `json:"namespace"`
				Databases          []dbInputArg     `json:"databases"`
				Users              []dbUserInputArg `json:"users"`
				ExternalConnection *extConnArg      `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterResult, error) {
				return c.CloudDatabaseClusterModify(api.CloudDatabaseClusterModifyInput{
					Name:               args.Name,
					Namespace:          args.Namespace,
					Databases:          toDatabaseInputs(args.Databases),
					Users:              toDatabaseUserInputs(args.Users),
					ExternalConnection: toExtConn(args.ExternalConnection),
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_delete",
			mcp.WithDescription("Delete a cloud database cluster. WARNING: This permanently deletes the cluster and all its data. Requires confirm: true."),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			name := req.GetString("name", "")
			ns := req.GetString("namespace", "")
			if ok, cancelled := confirmDelete(req, "database cluster"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.CloudDatabaseClusterDelete(api.CloudDatabaseClusterResourceInput{Name: name, Namespace: ns})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Database cluster %q deleted.", name)), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_list_plans",
			mcp.WithDescription("List available cloud database cluster plans with CPU, memory, storage, and pricing information"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.CloudDatabaseClusterPlan, error) {
				return c.CloudDatabaseClusterListPlans()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_cluster_list_versions",
			mcp.WithDescription("List supported database engine types and versions (e.g. postgresql 15, mysql 8)"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.CloudDatabaseClusterSpec, error) {
				return c.CloudDatabaseClusterListSpecs()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_user_get_credentials",
			mcp.WithDescription("Retrieve the DSN (connection string) for a database user. The DSN contains credentials — treat it as sensitive."),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("username", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			dsn, err := withAPI(func(c *api.Client) (string, error) {
				return c.CloudDatabaseClusterUserCredentials(
					api.CloudDatabaseClusterResourceInput{
						Name:      req.GetString("clusterName", ""),
						Namespace: req.GetString("clusterNamespace", ""),
					},
					req.GetString("username", ""),
				)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(dsn), nil
		},
	)
}
