package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterVolume(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_volume_list",
			mcp.WithDescription("List all volumes in a namespace"),
			mcp.WithString("namespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			result, err := withAPI(func(c *api.Client) ([]api.VolumeResult, error) {
				return c.ListVolumes(ns)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_volume_create",
			mcp.WithDescription("Create a new persistent volume"),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithInteger("size", mcp.Required(), mcp.Description("Size in GB")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			size := req.GetInt("size", 0)
			result, err := withAPI(func(c *api.Client) (api.VolumeResult, error) {
				return c.VolumeCreate(api.VolumeCreateInput{
					Namespace: ns,
					Name:      name,
					Size:      size,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_volume_increase",
			mcp.WithDescription("Increase the size of an existing volume (size can only be increased, not decreased)"),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithInteger("size", mcp.Required(), mcp.Description("New size in GB (must be larger than current)")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			size := req.GetInt("size", 0)
			result, err := withAPI(func(c *api.Client) (api.VolumeResult, error) {
				return c.VolumeIncrease(api.VolumeModifyInput{
					Namespace: ns,
					Name:      name,
					Size:      size,
				})
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_volume_delete",
			mcp.WithDescription("Delete a volume. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "volume"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.VolumeDelete(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Volume %q deleted from namespace %q.", name, ns)), nil
		},
	)
}
