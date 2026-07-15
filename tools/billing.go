package tools

import (
	"context"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

const financialInsightsQuery = `
query GetFinancialInsights($startDate: DateTime, $endDate: DateTime) {
  customer {
    credit { amount currency }
    priceBreakdown(startDate: $startDate, endDate: $endDate) {
      startDate endDate
      totalSum: resourceSum(resourceType: ALL) { price { amount currency } resourceType }
      ipAddressSum: resourceSum(resourceType: IPADDRESS) { price { amount currency } resourceType }
      namespaceSum: resourceSum(resourceType: NAMESPACE) { price { amount currency } resourceType }
      namespaceResources: resources(resourceType: NAMESPACE) {
        ... on NamespacePriceBreakdown {
          name price { amount currency }
          resources(resourceType: ALL) {
            ... on ContainerPriceBreakdown {
              __typename name price { amount currency } resourceType
              replicas { name cpu memory(unit: GB) price { amount currency } duration }
            }
            ... on StarterContainerPriceBreakdown {
              __typename name price { amount currency } resourceType
            }
            ... on ContainerJobPriceBreakdown {
              __typename name price { amount currency } resourceType
              runs { cpu duration runs memory(unit: GB) price { amount currency } }
            }
            ... on DatabaseClusterPriceBreakdown {
              __typename name price { amount currency } resourceType
            }
            ... on MessageQueuePriceBreakdown {
              __typename name price { amount currency } resourceType
            }
            ... on VolumePriceBreakdown {
              __typename name price { amount currency } resourceType
            }
          }
        }
      }
      ipAddressResources: resources(resourceType: IPADDRESS) {
        ... on IpAddressPriceBreakdown {
          name price { amount currency } resourceType
        }
      }
    }
  }
}
`

func RegisterBilling(s *server.MCPServer) {
	s.AddTool(
		mcp.NewTool("nexaa_billing_get_financial_insights",
			mcp.WithDescription("Get billing information for your Nexaa account. Returns the available account credit/balance and a cost breakdown over a date range, including per-namespace and per-resource details. Use this tool when the user asks about their credits, balance, remaining budget, or spending. All price amounts are in cents — divide by 100 to convert to the currency unit (e.g. EUR)."),
			mcp.WithString("startDate", mcp.Description("Start of the billing period (ISO-8601 date-time, e.g. \"2026-01-01T00:00:00Z\")")),
			mcp.WithString("endDate", mcp.Description("End of the billing period (ISO-8601 date-time, e.g. \"2026-04-01T00:00:00Z\")")),
		),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			vars := map[string]any{
				"startDate": nil,
				"endDate":   nil,
			}
			if s := req.GetString("startDate", ""); s != "" {
				vars["startDate"] = s
			}
			if e := req.GetString("endDate", ""); e != "" {
				vars["endDate"] = e
			}

			data, err := rawGQL(ctx, financialInsightsQuery, vars)
			if err != nil {
				return mcp.NewToolResultError(err.Error()), nil
			}
			return mcp.NewToolResultText(string(data)), nil
		},
	)
}
