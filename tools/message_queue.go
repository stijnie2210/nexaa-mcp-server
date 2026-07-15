package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

var allowListItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"ip":    map[string]any{"type": "string"},
		"state": map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	},
	"required": []string{"ip", "state"},
}

func toAllowList(args []allowListArg) []api.AllowListInput {
	out := make([]api.AllowListInput, len(args))
	for i, a := range args {
		out[i] = api.AllowListInput{Ip: a.IP, State: api.State(a.State)}
	}
	return out
}

func RegisterMessageQueue(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_message_queue_list",
			mcp.WithDescription("List all message queues"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.MessageQueueResult, error) {
				return c.MessageQueueList()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_message_queue_get",
			mcp.WithDescription("Get a message queue by name and namespace"),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) (api.MessageQueueResult, error) {
				return c.MessageQueueGet(api.MessageQueueResourceInput{
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
		mcp.NewTool("nexaa_message_queue_create",
			mcp.WithDescription("Create a message queue. Use nexaa_message_queue_list_plans and nexaa_message_queue_list_versions to discover valid plan IDs and spec values."),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("plan", mcp.Required(), mcp.Description("Plan ID from nexaa_message_queue_list_plans")),
			mcp.WithObject("spec", mcp.Required(), mcp.Description("Message queue engine spec"),
				mcp.Properties(map[string]any{
					"type":    map[string]any{"type": "string", "description": "e.g. rabbitmq"},
					"version": map[string]any{"type": "string", "description": "e.g. 3"},
				}),
			),
			mcp.WithArray("allowList", mcp.Items(allowListItemSchema)),
			mcp.WithObject("externalConnection"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Name               string         `json:"name"`
				Namespace          string         `json:"namespace"`
				Plan               string         `json:"plan"`
				Spec               struct {
					Type    string `json:"type"`
					Version string `json:"version"`
				} `json:"spec"`
				AllowList          []allowListArg `json:"allowList"`
				ExternalConnection *extConnArg    `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			result, err := withAPI(func(c *api.Client) (api.MessageQueueResult, error) {
				return c.MessageQueueCreate(api.MessageQueueCreateInput{
					Name:               args.Name,
					Namespace:          args.Namespace,
					Plan:               args.Plan,
					Spec:               api.MessageQueueSpecInput{Type: args.Spec.Type, Version: args.Spec.Version},
					AllowList:          toAllowList(args.AllowList),
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
		mcp.NewTool("nexaa_message_queue_modify",
			mcp.WithDescription("Modify a message queue's allowlist or external connection"),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithArray("allowList", mcp.Items(allowListItemSchema)),
			mcp.WithObject("externalConnection"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Name               string         `json:"name"`
				Namespace          string         `json:"namespace"`
				AllowList          []allowListArg `json:"allowList"`
				ExternalConnection *extConnArg    `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			result, err := withAPI(func(c *api.Client) (api.MessageQueueResult, error) {
				return c.MessageQueueModify(api.MessageQueueModifyInput{
					Name:               args.Name,
					Namespace:          args.Namespace,
					AllowList:          toAllowList(args.AllowList),
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
		mcp.NewTool("nexaa_message_queue_delete",
			mcp.WithDescription("Delete a message queue. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			name := req.GetString("name", "")
			ns := req.GetString("namespace", "")
			if ok, cancelled := confirmDelete(req, "message queue"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.MessageQueueDelete(api.MessageQueueResourceInput{Name: name, Namespace: ns})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Message queue %q deleted from namespace %q.", name, ns)), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_message_queue_list_plans",
			mcp.WithDescription("List available message queue plans with CPU, memory, storage, and pricing information"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.MessageQueuePlanResult, error) {
				return c.MessageQueuePlans()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_message_queue_list_versions",
			mcp.WithDescription("List supported message queue engine types and versions"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) ([]api.MessageQueueVersionResult, error) {
				return c.MessageQueueVersions()
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_message_queue_get_credentials",
			mcp.WithDescription("Retrieve credentials (DSN, password) for a message queue user. Treat the result as sensitive."),
			mcp.WithString("name", mcp.Required(), mcp.Description("Message queue name")),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("username", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			result, err := withAPI(func(c *api.Client) (api.MessageQueueUserCredentialsResult, error) {
				return c.MessageQueueAdminCredentials(
					api.MessageQueueResourceInput{
						Name:      req.GetString("name", ""),
						Namespace: req.GetString("namespace", ""),
					},
					req.GetString("username", ""),
				)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)
}
