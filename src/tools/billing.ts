import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  GetFinancialInsightsDocument,
  type GetFinancialInsightsQuery,
} from '../generated/graphql.js';

export function registerBillingTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_billing_get_financial_insights',
    {
      description:
        'Get billing information for your Nexaa account. Returns the available account credit/balance and a cost breakdown over a date range, including per-namespace and per-resource details. Use this tool when the user asks about their credits, balance, remaining budget, or spending. All price amounts are in cents — divide by 100 to convert to the currency unit (e.g. EUR).',
      inputSchema: {
        startDate: z
          .string()
          .optional()
          .describe(
            'Start of the billing period (ISO-8601 date-time, e.g. "2026-01-01T00:00:00Z")',
          ),
        endDate: z
          .string()
          .optional()
          .describe('End of the billing period (ISO-8601 date-time, e.g. "2026-04-01T00:00:00Z")'),
      },
    },
    async ({ startDate, endDate }) => {
      const data = await client.request<GetFinancialInsightsQuery>(GetFinancialInsightsDocument, {
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { credit: data.customer?.credit, priceBreakdown: data.customer?.priceBreakdown },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
