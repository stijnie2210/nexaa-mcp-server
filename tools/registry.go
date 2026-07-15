package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterRegistry(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_registry_list",
			mcp.WithDescription("List all private registry connections in a namespace"),
			mcp.WithString("namespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			result, err := withAPI(func(c *api.Client) ([]api.RegistryResult, error) {
				return c.ListRegistries(ns)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_registry_create",
			mcp.WithDescription("Add a private container registry connection. Note: password is write-only and will not be returned in responses."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("source", mcp.Required(), mcp.Description("Registry URL e.g. registry.example.com")),
			mcp.WithString("username", mcp.Required()),
			mcp.WithString("password", mcp.Required()),
			mcp.WithBoolean("verify", mcp.Description("Verify registry credentials on creation"), mcp.DefaultBool(true)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args api.RegistryCreateInput
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			// mcp.DefaultBool only annotates the JSON schema; BindArguments is a
			// plain json.Unmarshal that doesn't apply it, so an omitted "verify"
			// would otherwise leave args.Verify at its Go zero value (false)
			// instead of the documented default of true.
			if _, ok := req.GetArguments()["verify"]; !ok {
				args.Verify = true
			}
			result, err := withAPI(func(c *api.Client) (api.RegistryResult, error) {
				return c.RegistryCreate(args)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_registry_delete",
			mcp.WithDescription("Remove a private registry connection. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "registry connection"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.RegistryDelete(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Registry %q deleted from namespace %q.", name, ns)), nil
		},
	)
}
