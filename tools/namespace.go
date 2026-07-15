package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterNamespace(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_namespace_list",
			mcp.WithDescription("List all namespaces in your Nexaa account"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.NamespaceResult, error) {
				return c.NamespacesList()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_namespace_get",
			mcp.WithDescription("Get a namespace by name"),
			mcp.WithString("name", mcp.Required(), mcp.Description("Namespace name")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			name := req.GetString("name", "")
			result, err := withAPI(func(c *api.Client) (api.NamespaceResult, error) {
				return c.NamespaceListByName(name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_namespace_create",
			mcp.WithDescription("Create a new namespace"),
			mcp.WithString("name", mcp.Required(), mcp.Description("Namespace name")),
			mcp.WithString("description", mcp.Description("Optional description")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			name := req.GetString("name", "")
			desc := req.GetString("description", "")
			input := api.NamespaceCreateInput{Name: name}
			if desc != "" {
				input.Description = &desc
			}
			result, err := withAPI(func(c *api.Client) (api.NamespaceResult, error) {
				return c.NamespaceCreate(input)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_namespace_delete",
			mcp.WithDescription("Delete a namespace. WARNING: This will delete the namespace and all its resources. Requires confirm: true."),
			mcp.WithString("name", mcp.Required(), mcp.Description("Namespace name to delete")),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be set to true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "namespace"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.NamespaceDelete(name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Namespace %q deleted.", name)), nil
		},
	)
}
