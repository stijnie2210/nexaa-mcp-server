package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterDatabaseUser(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_db_user_list",
			mcp.WithDescription("List all users of a cloud database cluster"),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.CloudDatabaseClusterUserResult, error) {
				return c.CloudDatabaseClusterUserList(api.CloudDatabaseClusterResourceInput{
					Name:      req.GetString("clusterName", ""),
					Namespace: req.GetString("clusterNamespace", ""),
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_user_create",
			mcp.WithDescription("Create a user in a cloud database cluster"),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("username", mcp.Required()),
			mcp.WithString("password"),
			mcp.WithArray("permissions", mcp.Items(dbUserPermItemSchema)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				ClusterName      string          `json:"clusterName"`
				ClusterNamespace string          `json:"clusterNamespace"`
				Username         string          `json:"username"`
				Password         *string         `json:"password"`
				Permissions      []dbUserPermArg `json:"permissions"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}

			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterUserResult, error) {
				return c.CloudDatabaseClusterUserCreate(api.CloudDatabaseClusterUserCreateInput{
					Cluster: api.CloudDatabaseClusterResourceInput{
						Name:      args.ClusterName,
						Namespace: args.ClusterNamespace,
					},
					User: api.DatabaseUserInput{
						Name:        args.Username,
						Password:    args.Password,
						State:       api.StatePresent,
						Permissions: toDatabaseUserPermissions(args.Permissions),
					},
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_user_modify",
			mcp.WithDescription("Modify a database user's permissions"),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("username", mcp.Required()),
			mcp.WithArray("permissions", mcp.Required(), mcp.Items(dbUserPermItemSchema)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				ClusterName      string          `json:"clusterName"`
				ClusterNamespace string          `json:"clusterNamespace"`
				Username         string          `json:"username"`
				Permissions      []dbUserPermArg `json:"permissions"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}

			cluster := api.CloudDatabaseClusterResourceInput{
				Name:      args.ClusterName,
				Namespace: args.ClusterNamespace,
			}
			user := api.DatabaseUserInput{
				Name:        args.Username,
				State:       api.StatePresent,
				Permissions: toDatabaseUserPermissions(args.Permissions),
			}

			result, err := withAPI(func(c *api.Client) (api.CloudDatabaseClusterUserResult, error) {
				return c.CloudDatabaseClusterUserModify(api.CloudDatabaseClusterUserModifyInput{
					Cluster: &cluster,
					User:    &user,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_db_user_delete",
			mcp.WithDescription("Delete a user from a cloud database cluster. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("clusterName", mcp.Required()),
			mcp.WithString("clusterNamespace", mcp.Required()),
			mcp.WithString("username", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			clusterName := req.GetString("clusterName", "")
			clusterNS := req.GetString("clusterNamespace", "")
			username := req.GetString("username", "")
			if ok, cancelled := confirmDelete(req, "database user"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.CloudDatabaseClusterUserDelete(api.CloudDatabaseClusterUserResourceInput{
					Cluster: api.CloudDatabaseClusterResourceInput{Name: clusterName, Namespace: clusterNS},
					Name:    username,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("User %q deleted from cluster %q.", username, clusterName)), nil
		},
	)
}
