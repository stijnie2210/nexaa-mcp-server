package tools

import (
	"context"
	"fmt"
	"net/url"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/nexaa-cloud/nexaa-cli/api"
)

// intermediate types matching the MCP input schema

type envVarArg struct {
	Name   string `json:"name"`
	Value  string `json:"value"`
	Secret bool   `json:"secret"`
	State  string `json:"state"`
}

type allowListArg struct {
	IP    string `json:"ip"`
	State string `json:"state"`
}

type ingressArg struct {
	Port       int      `json:"port"`
	EnableTLS  bool     `json:"enableTLS"`
	Whitelist  []string `json:"whitelist"`
	DomainName *string  `json:"domainName"`
	State      string   `json:"state"`
}

type mountVolumeArg struct {
	Name       string `json:"name"`
	AutoCreate bool   `json:"autoCreate"`
	Increase   bool   `json:"increase"`
	Size       *int   `json:"size"`
}

type mountArg struct {
	Path   string         `json:"path"`
	Volume mountVolumeArg `json:"volume"`
	State  string         `json:"state"`
}

type healthCheckArg struct {
	Port int    `json:"port"`
	Path string `json:"path"`
}

type autoScalingTriggerArg struct {
	Type      string `json:"type"`
	Threshold int    `json:"threshold"`
}

type autoScalingArg struct {
	Replicas struct {
		Minimum int `json:"minimum"`
		Maximum int `json:"maximum"`
	} `json:"replicas"`
	Triggers []autoScalingTriggerArg `json:"triggers"`
}

type extConnPortArg struct {
	ExternalPort *int           `json:"externalPort"`
	InternalPort *int           `json:"internalPort"`
	Protocol     string         `json:"protocol"`
	State        string         `json:"state"`
	AllowList    []allowListArg `json:"allowList"`
}

type extConnArg struct {
	SharedIp bool             `json:"sharedIp"`
	State    string           `json:"state"`
	Ports    []extConnPortArg `json:"ports"`
}

func toEnvVars(args []envVarArg) []api.EnvironmentVariableInput {
	out := make([]api.EnvironmentVariableInput, len(args))
	for i, a := range args {
		out[i] = api.EnvironmentVariableInput{
			Name:   a.Name,
			Value:  a.Value,
			Secret: a.Secret,
			State:  api.State(a.State),
		}
	}
	return out
}

func toIngresses(args []ingressArg) []api.IngressInput {
	out := make([]api.IngressInput, len(args))
	for i, a := range args {
		out[i] = api.IngressInput{
			Port:       a.Port,
			EnableTLS:  a.EnableTLS,
			Whitelist:  a.Whitelist,
			DomainName: a.DomainName,
			State:      api.State(a.State),
		}
	}
	return out
}

func toMounts(args []mountArg) []api.MountInput {
	out := make([]api.MountInput, len(args))
	for i, a := range args {
		out[i] = api.MountInput{
			Path: a.Path,
			Volume: api.MountVolumeInput{
				Name:       a.Volume.Name,
				AutoCreate: a.Volume.AutoCreate,
				Increase:   a.Volume.Increase,
				Size:       a.Volume.Size,
			},
			State: api.State(a.State),
		}
	}
	return out
}

func toExtConn(a *extConnArg) *api.ExternalConnectionInput {
	if a == nil {
		return nil
	}
	ports := make([]api.ExternalConnectionPortInput, len(a.Ports))
	for i, p := range a.Ports {
		ports[i] = api.ExternalConnectionPortInput{
			ExternalPort: p.ExternalPort,
			InternalPort: p.InternalPort,
			Protocol:     api.Protocol(p.Protocol),
			State:        api.State(p.State),
			AllowList:    toAllowList(p.AllowList),
		}
	}
	return &api.ExternalConnectionInput{
		SharedIp: a.SharedIp,
		State:    api.State(a.State),
		Ports:    ports,
	}
}

func toScaling(a *autoScalingArg) *api.ScalingInput {
	if a == nil {
		return nil
	}
	triggers := make([]api.AutoScalingTriggerInput, len(a.Triggers))
	for i, t := range a.Triggers {
		triggers[i] = api.AutoScalingTriggerInput{
			Type:      api.AutoScalingType(t.Type),
			Threshold: t.Threshold,
		}
	}
	return &api.ScalingInput{
		Auto: &api.AutoScalingInput{
			Replicas: api.ReplicasInput{
				Minimum: a.Replicas.Minimum,
				Maximum: a.Replicas.Maximum,
			},
			Triggers: triggers,
		},
	}
}

var envVarItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"name":   map[string]any{"type": "string"},
		"value":  map[string]any{"type": "string"},
		"secret": map[string]any{"type": "boolean"},
		"state":  map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	},
	"required": []string{"name", "value", "secret", "state"},
}

var mountItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"path": map[string]any{"type": "string", "description": "Mount path inside the container"},
		"volume": map[string]any{
			"type": "object",
			"properties": map[string]any{
				"name":       map[string]any{"type": "string"},
				"autoCreate": map[string]any{"type": "boolean"},
				"increase":   map[string]any{"type": "boolean"},
				"size":       map[string]any{"type": "integer", "description": "Size in GB"},
			},
			"required": []string{"name", "autoCreate", "increase"},
		},
		"state": map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	},
	"required": []string{"path", "volume", "state"},
}

var ingressItemSchema = map[string]any{
	"type": "object",
	"properties": map[string]any{
		"port":       map[string]any{"type": "integer"},
		"enableTLS":  map[string]any{"type": "boolean"},
		"whitelist":  map[string]any{"type": "array", "items": map[string]any{"type": "string"}, "description": "CIDR blocks"},
		"domainName": map[string]any{"type": "string", "description": "Omit for auto-assigned domain"},
		"state":      map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	},
	"required": []string{"port", "enableTLS", "whitelist", "state"},
}

// extConnSchemaProperties is the "properties" object for externalConnection's
// nested schema, reused directly by mcp.Properties wherever externalConnection
// appears (nexaa_container_create/modify).
var extConnSchemaProperties = map[string]any{
	"sharedIp": map[string]any{"type": "boolean"},
	"state":    map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
	"ports": map[string]any{
		"type": "array",
		"items": map[string]any{
			"type": "object",
			"properties": map[string]any{
				"externalPort": map[string]any{"type": "integer", "description": "Omit when creating new port"},
				"internalPort": map[string]any{"type": "integer"},
				"protocol":     map[string]any{"type": "string", "enum": []string{"TCP", "UDP"}},
				"state":        map[string]any{"type": "string", "enum": []string{"PRESENT", "ABSENT"}},
				"allowList": map[string]any{
					"type":  "array",
					"items": allowListItemSchema,
				},
			},
			"required": []string{"protocol", "state", "allowList"},
		},
	},
}

func RegisterContainer(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_container_list_plans",
			mcp.WithDescription("List all available container resource plans (CPU/RAM combinations)"),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			const q = `{ resourceSpecifications(kind: "container") { id cpu ram price { amount currency } } }`
			data, err := rawGQL(ctx, q, nil)
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(string(data)), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_list",
			mcp.WithDescription("List all containers in a namespace"),
			mcp.WithString("namespace", mcp.Required(), mcp.Description("Namespace name")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			result, err := withAPI(func(c *api.Client) ([]api.ContainerResult, error) {
				return c.ListContainers(ns)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_get",
			mcp.WithDescription("Get a container by name"),
			mcp.WithString("namespace", mcp.Required(), mcp.Description("Namespace name")),
			mcp.WithString("name", mcp.Required(), mcp.Description("Container name")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			result, err := withAPI(func(c *api.Client) (api.ContainerResult, error) {
				return c.ListContainerByName(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_create",
			mcp.WithDescription("Create a new container. resources must be a ContainerResources enum value e.g. CPU_250_RAM_500. type must be DEFAULT or STARTER."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("image", mcp.Required(), mcp.Description("Container image e.g. nginx:latest")),
			mcp.WithString("resources", mcp.Required(), mcp.Description("Resource profile e.g. CPU_250_RAM_500")),
			mcp.WithString("type", mcp.Description("DEFAULT or STARTER"), mcp.DefaultString("DEFAULT")),
			mcp.WithString("registry", mcp.Description("Private registry name")),
			mcp.WithArray("command", mcp.Description("Command override"), mcp.WithStringItems()),
			mcp.WithArray("entrypoint", mcp.Description("Entrypoint override"), mcp.WithStringItems()),
			mcp.WithArray("ports", mcp.Description("Port numbers the container listens on e.g. [\"80\",\"443\"]"), mcp.WithStringItems()),
			mcp.WithArray("environmentVariables", mcp.Description("Environment variables"), mcp.Items(envVarItemSchema)),
			mcp.WithArray("ingresses", mcp.Description("HTTP ingress rules"), mcp.Items(ingressItemSchema)),
			mcp.WithArray("mounts", mcp.Description("Volume mounts"), mcp.Items(mountItemSchema)),
			mcp.WithObject("healthCheck", mcp.Description("Health check config"),
				mcp.Properties(map[string]any{
					"port": map[string]any{"type": "integer"},
					"path": map[string]any{"type": "string", "description": "e.g. /health"},
				}),
			),
			mcp.WithObject("autoScaling", mcp.Description("Auto-scaling config"),
				mcp.Properties(map[string]any{
					"replicas": map[string]any{
						"type": "object",
						"properties": map[string]any{
							"minimum": map[string]any{"type": "integer"},
							"maximum": map[string]any{"type": "integer"},
						},
						"required": []string{"minimum", "maximum"},
					},
					"triggers": map[string]any{
						"type": "array",
						"items": map[string]any{
							"type": "object",
							"properties": map[string]any{
								"type":      map[string]any{"type": "string", "enum": []string{"CPU", "MEMORY"}},
								"threshold": map[string]any{"type": "integer", "description": "Percentage 1-100"},
							},
							"required": []string{"type", "threshold"},
						},
					},
				}),
			),
			mcp.WithObject("externalConnection", mcp.Description("External connection config"), mcp.Properties(extConnSchemaProperties)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Namespace            string          `json:"namespace"`
				Name                 string          `json:"name"`
				Image                string          `json:"image"`
				Resources            string          `json:"resources"`
				Type                 string          `json:"type"`
				Registry             string          `json:"registry"`
				Command              []string        `json:"command"`
				Entrypoint           []string        `json:"entrypoint"`
				Ports                []string        `json:"ports"`
				EnvironmentVariables []envVarArg     `json:"environmentVariables"`
				Ingresses            []ingressArg    `json:"ingresses"`
				Mounts               []mountArg      `json:"mounts"`
				HealthCheck          *healthCheckArg `json:"healthCheck"`
				AutoScaling          *autoScalingArg `json:"autoScaling"`
				ExternalConnection   *extConnArg     `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			if args.Type == "" {
				args.Type = "DEFAULT"
			}
			input := api.ContainerCreateInput{
				Namespace:            args.Namespace,
				Name:                 args.Name,
				Image:                args.Image,
				Resources:            api.ContainerResources(args.Resources),
				Type:                 api.ContainerType(args.Type),
				Command:              args.Command,
				Entrypoint:           args.Entrypoint,
				Ports:                args.Ports,
				EnvironmentVariables: toEnvVars(args.EnvironmentVariables),
				Ingresses:            toIngresses(args.Ingresses),
				Mounts:               toMounts(args.Mounts),
				Scaling:              toScaling(args.AutoScaling),
				ExternalConnection:   toExtConn(args.ExternalConnection),
			}
			if args.Registry != "" {
				input.Registry = &args.Registry
			}
			if args.HealthCheck != nil {
				input.HealthCheck = &api.HealthCheckInput{
					Port: args.HealthCheck.Port,
					Path: args.HealthCheck.Path,
				}
			}
			result, err := withAPI(func(c *api.Client) (api.ContainerResult, error) {
				return c.ContainerCreate(input)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_modify",
			mcp.WithDescription("Modify an existing container. Only provide fields you want to change (namespace and name are always required)."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithString("image"),
			mcp.WithString("resources"),
			mcp.WithString("registry"),
			mcp.WithArray("command", mcp.WithStringItems()),
			mcp.WithArray("entrypoint", mcp.WithStringItems()),
			mcp.WithArray("ports", mcp.WithStringItems()),
			mcp.WithArray("environmentVariables", mcp.Items(envVarItemSchema)),
			mcp.WithArray("ingresses", mcp.Items(ingressItemSchema)),
			mcp.WithArray("mounts", mcp.Items(mountItemSchema)),
			mcp.WithObject("healthCheck", mcp.Properties(map[string]any{
				"port": map[string]any{"type": "integer"},
				"path": map[string]any{"type": "string"},
			})),
			mcp.WithObject("autoScaling", mcp.Properties(map[string]any{
				"replicas": map[string]any{
					"type": "object",
					"properties": map[string]any{
						"minimum": map[string]any{"type": "integer"},
						"maximum": map[string]any{"type": "integer"},
					},
					"required": []string{"minimum", "maximum"},
				},
				"triggers": map[string]any{
					"type": "array",
					"items": map[string]any{
						"type": "object",
						"properties": map[string]any{
							"type":      map[string]any{"type": "string", "enum": []string{"CPU", "MEMORY"}},
							"threshold": map[string]any{"type": "integer", "description": "Percentage 1-100"},
						},
						"required": []string{"type", "threshold"},
					},
				},
			})),
			mcp.WithObject("externalConnection", mcp.Properties(extConnSchemaProperties)),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			var args struct {
				Namespace            string          `json:"namespace"`
				Name                 string          `json:"name"`
				Image                *string         `json:"image"`
				Resources            *string         `json:"resources"`
				Registry             *string         `json:"registry"`
				Command              []string        `json:"command"`
				Entrypoint           []string        `json:"entrypoint"`
				Ports                []string        `json:"ports"`
				EnvironmentVariables []envVarArg     `json:"environmentVariables"`
				Ingresses            []ingressArg    `json:"ingresses"`
				Mounts               []mountArg      `json:"mounts"`
				HealthCheck          *healthCheckArg `json:"healthCheck"`
				AutoScaling          *autoScalingArg `json:"autoScaling"`
				ExternalConnection   *extConnArg     `json:"externalConnection"`
			}
			if err := req.BindArguments(&args); err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}

			input := api.ContainerModifyInput{
				Namespace:            args.Namespace,
				Name:                 args.Name,
				Image:                args.Image,
				Registry:             args.Registry,
				Command:              args.Command,
				Entrypoint:           args.Entrypoint,
				Ports:                args.Ports,
				EnvironmentVariables: toEnvVars(args.EnvironmentVariables),
				Ingresses:            toIngresses(args.Ingresses),
				Mounts:               toMounts(args.Mounts),
				Scaling:              toScaling(args.AutoScaling),
				ExternalConnection:   toExtConn(args.ExternalConnection),
			}
			if args.Resources != nil {
				r := api.ContainerResources(*args.Resources)
				input.Resources = &r
			}
			if args.HealthCheck != nil {
				input.HealthCheck = &api.HealthCheckInput{
					Port: args.HealthCheck.Port,
					Path: args.HealthCheck.Path,
				}
			}

			// api.ContainerModifyInput has no omitempty tags, so any field left
			// at its Go zero value here (because the caller omitted it) would be
			// sent as an explicit JSON null/[] and get reset by the API instead
			// of being left unchanged. For fields whose current value can be
			// read back faithfully, fetch the container and carry its current
			// value forward for anything the caller didn't specify.
			//
			// environmentVariables/ingresses/mounts and externalConnection are
			// deliberately NOT backfilled this way: EnvironmentVariableResult.Value
			// can be redacted (nil) for secret entries, so round-tripping it
			// would silently wipe stored secrets, and ExternalConnectionResult
			// doesn't expose sharedIp/state at all, so there's no way to
			// reconstruct a faithful ExternalConnectionInput from a Get call.
			provided := req.GetArguments()
			backfillFields := []string{"image", "resources", "registry", "command", "entrypoint", "ports", "healthCheck", "autoScaling"}
			needsCurrent := false
			for _, key := range backfillFields {
				if _, ok := provided[key]; !ok {
					needsCurrent = true
					break
				}
			}
			if needsCurrent {
				current, err := withAPI(func(c *api.Client) (api.ContainerResult, error) {
					return c.ListContainerByName(args.Namespace, args.Name)
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
				if _, ok := provided["command"]; !ok {
					input.Command = current.Command
				}
				if _, ok := provided["entrypoint"]; !ok {
					input.Entrypoint = current.Entrypoint
				}
				if _, ok := provided["ports"]; !ok {
					input.Ports = current.Ports
				}
				if _, ok := provided["healthCheck"]; !ok && current.HealthCheck != nil {
					input.HealthCheck = &api.HealthCheckInput{
						Port: current.HealthCheck.Port,
						Path: current.HealthCheck.Path,
					}
				}
				if _, ok := provided["autoScaling"]; !ok && current.AutoScaling != nil {
					triggers := make([]api.AutoScalingTriggerInput, len(current.AutoScaling.Triggers))
					for i, t := range current.AutoScaling.Triggers {
						triggers[i] = api.AutoScalingTriggerInput{Type: api.AutoScalingType(t.Type), Threshold: t.Threshold}
					}
					input.Scaling = &api.ScalingInput{
						Auto: &api.AutoScalingInput{
							Replicas: api.ReplicasInput{
								Minimum: current.AutoScaling.Replicas.Minimum,
								Maximum: current.AutoScaling.Replicas.Maximum,
							},
							Triggers: triggers,
						},
					}
				}
			}

			result, err := withAPI(func(c *api.Client) (api.ContainerResult, error) {
				return c.ContainerModify(input)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return jsonResult(result), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_delete",
			mcp.WithDescription("Delete a container. WARNING: This is irreversible. Requires confirm: true."),
			mcp.WithString("namespace", mcp.Required()),
			mcp.WithString("name", mcp.Required()),
			mcp.WithBoolean("confirm", mcp.Required(), mcp.Description("Must be true to confirm deletion")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			ns := req.GetString("namespace", "")
			name := req.GetString("name", "")
			if ok, cancelled := confirmDelete(req, "container"); !ok {
				return cancelled, nil
			}
			_, err := withAPI(func(c *api.Client) (bool, error) {
				return c.ContainerDelete(ns, name)
			})
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(fmt.Sprintf("Container %q deleted from namespace %q.", name, ns)), nil
		},
	)

	s.AddTool(
		mcp.NewTool("nexaa_container_logs",
			mcp.WithDescription("Fetch logs for a container replica. Use nexaa_container_get to retrieve the container id and replica name."),
			mcp.WithString("container_id", mcp.Required(), mcp.Description("Container ID from nexaa_container_get")),
			mcp.WithString("replica_name", mcp.Required(), mcp.Description("Replica name e.g. nexaa-mcp-245k8 from nexaa_container_get replicas array")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			containerID := req.GetString("container_id", "")
			replicaName := req.GetString("replica_name", "")
			logs, err := authFetch(ctx, fmt.Sprintf("/logs/container/%s/%s", url.PathEscape(containerID), url.PathEscape(replicaName)))
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(logs), nil
		},
	)
}
