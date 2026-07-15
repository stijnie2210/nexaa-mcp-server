package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterDatabase(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_db_create",
			mcp.WithDescription("Add a database to an existing cloud database cluster"),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("name", mcp.Required(), mcp.Description("Database name")),
			mcp.WithString("description"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			clusterName := req.GetString("clusterName", "")
			clusterNS := req.GetString("clusterNamespace", "")
			name := req.GetString("name", "")
			desc := req.GetString("description", "")

			dbInput := api.DatabaseInput{
				Name:  name,
				State: api.StatePresent,
			}
			if desc != "" {
				dbInput.Description = &desc
			}

			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterDatabaseResult, error) {
				return c.CloudDatabaseClusterDatabaseCreate(api.CloudDatabaseClusterDatabaseCreateInput{
					Cluster:  api.CloudDatabaseClusterResourceInput{Name: clusterName, Namespace: clusterNS},
					Database: dbInput,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_delete",
			mcp.WithDescription("Remove a database from a cloud database cluster. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("name", mcp.Required(), mcp.Description("Database name to delete")),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			clusterName := req.GetString("clusterName", "")
			clusterNS := req.GetString("clusterNamespace", "")
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "database"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.CloudDatabaseClusterDatabaseDelete(api.CloudDatabaseClusterDatabaseResourceInput{
					Cluster: api.CloudDatabaseClusterResourceInput{Name: clusterName, Namespace: clusterNS},
					Name:    name,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Database %q deleted from cluster %q.", name, clusterName)), nil
		},
	)
}
