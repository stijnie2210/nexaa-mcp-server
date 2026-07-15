package tools

import (
	"context"
	"fmt"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

func RegisterContainerJob(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_container_job_list",
			mcp.WithDescription("List all container jobs in a namespace"),
			mcp.WithString("namespace", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			result, err := withAPI(func(c *api.Client) ([]api.ContainerJobResult, error) {
				return c.ContainerJobList(ns)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_job_get",
			mcp.WithDescription("Get a container job by name"),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			result, err := withAPI(func(c *api.Client) (api.ContainerJobResult, error) {
				return c.ContainerJobByName(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_job_create",
			mcp.WithDescription("Create a new container job. schedule is a cron expression e.g. '0 * * * *'. resources e.g. CPU_250_RAM_500."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("image", mcp.Required()),
			mcp.WithString("resources", mcp.Required(), mcp.Description("Resource profile e.g. CPU_250_RAM_500")),
			mcp.WithString("schedule", mcp.Required(), mcp.Description("Cron expression e.g. '0 * * * *'")),
			mcp.WithBoolean("enabled", mcp.Description("Enable the job"), mcp.DefaultBool(true)),
			mcp.WithString("registry"),
			mcp.WithArray("command", mcp.WithStringItems()),
			mcp.WithArray("entrypoint", mcp.WithStringItems()),
			mcp.WithArray("environmentVariables", mcp.Items(envVarItemSchema)),
			mcp.WithArray("mounts", mcp.Items(mountItemSchema)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Namespace            string      `json:"namespace"`
				Name                 string      `json:"name"`
				Image                string      `json:"image"`
				Resources            string      `json:"resources"`
				Schedule             string      `json:"schedule"`
				Enabled              bool        `json:"enabled"`
				Registry             string      `json:"registry"`
				Command              []string    `json:"command"`
				Entrypoint           []string    `json:"entrypoint"`
				EnvironmentVariables []envVarArg `json:"environmentVariables"`
				Mounts               []mountArg  `json:"mounts"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			// mcp.DefaultBool only annotates the JSON schema; BindArguments is a
			// plain json.Unmarshal that doesn't apply it, so an omitted "enabled"
			// would otherwise leave args.Enabled at its Go zero value (false)
			// instead of the documented default of true.
			if _, ok := req.GetArguments()["enabled"]; !ok {
				args.Enabled = true
			}
			input := api.ContainerJobCreateInput{
				Namespace:            args.Namespace,
				Name:                 args.Name,
				Image:                args.Image,
				Resources:            api.ContainerResources(args.Resources),
				Schedule:             args.Schedule,
				Enabled:              args.Enabled,
				Command:              args.Command,
				Entrypoint:           args.Entrypoint,
				EnvironmentVariables: toEnvVars(args.EnvironmentVariables),
				Mounts:               toMounts(args.Mounts),
			}
			if args.Registry != "" {
				input.Registry = &args.Registry
			}
			result, err := withAPI(func(c *api.Client) (api.ContainerJobResult, error) {
				return c.ContainerJobCreate(input)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_job_modify",
			mcp.WithDescription("Modify an existing container job. namespace and name are required; all other fields are optional."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("image"),
			mcp.WithString("resources"),
			mcp.WithString("schedule"),
			mcp.WithBoolean("enabled"),
			mcp.WithString("registry"),
			mcp.WithArray("command", mcp.WithStringItems()),
			mcp.WithArray("entrypoint", mcp.WithStringItems()),
			mcp.WithArray("environmentVariables", mcp.Items(envVarItemSchema)),
			mcp.WithArray("mounts", mcp.Items(mountItemSchema)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Namespace            string      `json:"namespace"`
				Name                 string      `json:"name"`
				Image                *string     `json:"image"`
				Resources            *string     `json:"resources"`
				Schedule             *string     `json:"schedule"`
				Enabled              *bool       `json:"enabled"`
				Registry             *string     `json:"registry"`
				Command              []string    `json:"command"`
				Entrypoint           []string    `json:"entrypoint"`
				EnvironmentVariables []envVarArg `json:"environmentVariables"`
				Mounts               []mountArg  `json:"mounts"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			input := api.ContainerJobModifyInput{
				Namespace:            args.Namespace,
				Name:                 args.Name,
				Image:                args.Image,
				Registry:             args.Registry,
				Schedule:             args.Schedule,
				Enabled:              args.Enabled,
				Command:              args.Command,
				Entrypoint:           args.Entrypoint,
				EnvironmentVariables: toEnvVars(args.EnvironmentVariables),
				Mounts:               toMounts(args.Mounts),
			}
			if args.Resources != nil {
				r := api.ContainerResources(*args.Resources)
				input.Resources = &r
			}

			// api.ContainerJobModifyInput has no omitempty tags, so any field
			// left at its Go zero value here (because the caller omitted it)
			// would be sent as an explicit JSON null/[] and get reset instead of
			// left unchanged (see nexaa_container_modify in container.go for the
			// full explanation). environmentVariables/mounts are deliberately
			// NOT backfilled: EnvironmentVariableResult.Value can be redacted
			// for secret entries, so round-tripping it would silently wipe
			// stored secrets.
			provided := req.GetArguments()
			backfillFields := []string{"image", "resources", "registry", "schedule", "enabled", "command", "entrypoint"}
			needsCurrent := false
			for _, key := range backfillFields {
				if _, ok := provided[key]; !ok {
					needsCurrent = true
					break
				}
			}
			if needsCurrent {
				current, err := withAPI(func(c *api.Client) (api.ContainerJobResult, error) {
					return c.ContainerJobByName(args.Namespace, args.Name)
				})
				if err != nil {
					return mcp.NewToolResultError(err.Error()), nil
				}
				if _, ok := provided["image"]; !ok {
					input.Image = &current.Image
				}
				if _, ok := provided["resources"]; !ok {
					input.Resources = &current.Resources
				}
				if _, ok := provided["registry"]; !ok && current.PrivateRegistry != nil {
					input.Registry = &current.PrivateRegistry.Name
				}
				if _, ok := provided["schedule"]; !ok {
					input.Schedule = &current.Schedule
				}
				if _, ok := provided["enabled"]; !ok {
					input.Enabled = &current.Enabled
				}
				if _, ok := provided["command"]; !ok {
					input.Command = current.Command
				}
				if _, ok := provided["entrypoint"]; !ok {
					input.Entrypoint = current.Entrypoint
				}
			}

			result, err := withAPI(func(c *api.Client) (api.ContainerJobResult, error) {
				return c.ContainerJobModify(input)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_job_delete",
			mcp.WithDescription("Delete a container job. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "container job"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.ContainerJobDelete(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Container job %q deleted from namespace %q.", name, ns)), nil
		},
	)
}
