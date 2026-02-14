/**
 * Shared MCP Server — used by both Node.js (index.ts) and CF Worker (worker.ts)
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { SheetsClient } from './sheets-client.js';
import { TOOLS } from './tools.js';

export interface SheetsMcpConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
  client: SheetsClient
) {
  switch (toolName) {
    // ========== Spreadsheet ==========
    case 'gs_create_spreadsheet':
      return client.createSpreadsheet({
        title: args.title as string,
        sheetTitles: args.sheet_titles as string[] | undefined,
        locale: args.locale as string | undefined,
        timeZone: args.time_zone as string | undefined,
      });
    case 'gs_get_spreadsheet':
      return client.getSpreadsheet({
        spreadsheetId: args.spreadsheet_id as string,
        ranges: args.ranges as string[] | undefined,
        includeGridData: args.include_grid_data as boolean | undefined,
        fields: (args.fields || args._fields) as string | undefined,
      });

    // ========== Values ==========
    case 'gs_read_values':
      return client.readValues({
        spreadsheetId: args.spreadsheet_id as string,
        range: args.range as string,
        majorDimension: args.major_dimension as string | undefined,
        valueRenderOption: args.value_render_option as string | undefined,
        dateTimeRenderOption: args.date_time_render_option as string | undefined,
      });
    case 'gs_batch_read':
      return client.batchRead({
        spreadsheetId: args.spreadsheet_id as string,
        ranges: args.ranges as string[],
        majorDimension: args.major_dimension as string | undefined,
        valueRenderOption: args.value_render_option as string | undefined,
      });
    case 'gs_write_values':
      return client.writeValues({
        spreadsheetId: args.spreadsheet_id as string,
        range: args.range as string,
        values: args.values as unknown[][],
        valueInputOption: args.value_input_option as string | undefined,
      });
    case 'gs_append_values':
      return client.appendValues({
        spreadsheetId: args.spreadsheet_id as string,
        range: args.range as string,
        values: args.values as unknown[][],
        valueInputOption: args.value_input_option as string | undefined,
        insertDataOption: args.insert_data_option as string | undefined,
      });
    case 'gs_clear_values':
      return client.clearValues({
        spreadsheetId: args.spreadsheet_id as string,
        range: args.range as string,
      });
    case 'gs_batch_write':
      return client.batchWrite({
        spreadsheetId: args.spreadsheet_id as string,
        data: args.data as Array<{ range: string; values: unknown[][] }>,
        valueInputOption: args.value_input_option as string | undefined,
      });

    // ========== Sheet Management ==========
    case 'gs_add_sheet':
      return client.addSheet({
        spreadsheetId: args.spreadsheet_id as string,
        title: args.title as string,
        rowCount: args.row_count as number | undefined,
        columnCount: args.column_count as number | undefined,
        tabColorRed: args.tab_color_red as number | undefined,
        tabColorGreen: args.tab_color_green as number | undefined,
        tabColorBlue: args.tab_color_blue as number | undefined,
      });
    case 'gs_delete_sheet':
      return client.deleteSheet({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
      });
    case 'gs_rename_sheet':
      return client.renameSheet({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        title: args.title as string,
      });
    case 'gs_copy_sheet':
      return client.copySheet({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        destinationSpreadsheetId: args.destination_spreadsheet_id as string,
      });
    case 'gs_duplicate_sheet':
      return client.duplicateSheet({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        newSheetName: args.new_sheet_name as string | undefined,
        insertSheetIndex: args.insert_sheet_index as number | undefined,
      });

    // ========== Formatting ==========
    case 'gs_format_cells':
      return client.formatCells({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number,
        endRowIndex: args.end_row_index as number,
        startColumnIndex: args.start_column_index as number,
        endColumnIndex: args.end_column_index as number,
        bold: args.bold as boolean | undefined,
        italic: args.italic as boolean | undefined,
        strikethrough: args.strikethrough as boolean | undefined,
        underline: args.underline as boolean | undefined,
        fontSize: args.font_size as number | undefined,
        fontFamily: args.font_family as string | undefined,
        foregroundColorRed: args.foreground_color_red as number | undefined,
        foregroundColorGreen: args.foreground_color_green as number | undefined,
        foregroundColorBlue: args.foreground_color_blue as number | undefined,
        backgroundColorRed: args.background_color_red as number | undefined,
        backgroundColorGreen: args.background_color_green as number | undefined,
        backgroundColorBlue: args.background_color_blue as number | undefined,
        horizontalAlignment: args.horizontal_alignment as string | undefined,
        verticalAlignment: args.vertical_alignment as string | undefined,
        wrapStrategy: args.wrap_strategy as string | undefined,
        numberFormatType: args.number_format_type as string | undefined,
        numberFormatPattern: args.number_format_pattern as string | undefined,
      });
    case 'gs_merge_cells':
      return client.mergeCells({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number,
        endRowIndex: args.end_row_index as number,
        startColumnIndex: args.start_column_index as number,
        endColumnIndex: args.end_column_index as number,
        mergeType: args.merge_type as string | undefined,
      });
    case 'gs_unmerge_cells':
      return client.unmergeCells({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number,
        endRowIndex: args.end_row_index as number,
        startColumnIndex: args.start_column_index as number,
        endColumnIndex: args.end_column_index as number,
      });
    case 'gs_auto_resize':
      return client.autoResize({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        dimension: args.dimension as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
      });

    // ========== Data Operations ==========
    case 'gs_sort_range':
      return client.sortRange({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number,
        endRowIndex: args.end_row_index as number,
        startColumnIndex: args.start_column_index as number,
        endColumnIndex: args.end_column_index as number,
        sortColumnIndex: args.sort_column_index as number,
        sortOrder: args.sort_order as string | undefined,
      });
    case 'gs_find_replace':
      return client.findReplace({
        spreadsheetId: args.spreadsheet_id as string,
        find: args.find as string,
        replacement: args.replacement as string,
        sheetId: args.sheet_id as number | undefined,
        matchCase: args.match_case as boolean | undefined,
        matchEntireCell: args.match_entire_cell as boolean | undefined,
        searchByRegex: args.search_by_regex as boolean | undefined,
        allSheets: args.all_sheets as boolean | undefined,
        includeFormulas: args.include_formulas as boolean | undefined,
      });
    case 'gs_set_basic_filter':
      return client.setBasicFilter({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number || 0,
        endRowIndex: args.end_row_index as number || 0,
        startColumnIndex: args.start_column_index as number || 0,
        endColumnIndex: args.end_column_index as number || 0,
        clear: args.clear as boolean | undefined,
      });
    case 'gs_add_protected_range':
      return client.addProtectedRange({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        startRowIndex: args.start_row_index as number,
        endRowIndex: args.end_row_index as number,
        startColumnIndex: args.start_column_index as number,
        endColumnIndex: args.end_column_index as number,
        description: args.description as string | undefined,
        warningOnly: args.warning_only as boolean | undefined,
        editors: args.editors as string[] | undefined,
      });

    // ========== Advanced ==========
    case 'gs_add_chart':
      return client.addChart({
        spreadsheetId: args.spreadsheet_id as string,
        sheetId: args.sheet_id as number,
        chartType: args.chart_type as string,
        title: args.title as string | undefined,
        dataSheetId: args.data_sheet_id as number,
        dataStartRowIndex: args.data_start_row_index as number,
        dataEndRowIndex: args.data_end_row_index as number,
        dataStartColumnIndex: args.data_start_column_index as number,
        dataEndColumnIndex: args.data_end_column_index as number,
        anchorRowIndex: args.anchor_row_index as number | undefined,
        anchorColumnIndex: args.anchor_column_index as number | undefined,
      });
    case 'gs_batch_update':
      return client.batchUpdate({
        spreadsheetId: args.spreadsheet_id as string,
        requests: args.requests as Record<string, unknown>[],
        includeSpreadsheetInResponse: args.include_spreadsheet_in_response as boolean | undefined,
      });

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

export function createServer(config?: SheetsMcpConfig) {
  const server = new McpServer({
    name: 'google-sheets-mcp',
    version: '1.0.0',
  });

  let client: SheetsClient | null = null;

  for (const tool of TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema as any,
        annotations: tool.annotations,
      },
      async (args: Record<string, unknown>) => {
        const clientId =
          config?.clientId ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_ID as string;
        const clientSecret =
          config?.clientSecret ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_SECRET as string;
        const refreshToken =
          config?.refreshToken ||
          (args as Record<string, unknown>).GOOGLE_REFRESH_TOKEN as string;

        if (!clientId || !clientSecret || !refreshToken) {
          return {
            content: [{ type: 'text' as const, text: 'Error: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are all required.' }],
            isError: true,
          };
        }

        if (!client || config?.clientId !== clientId) {
          client = new SheetsClient({ clientId, clientSecret, refreshToken });
        }

        try {
          const result = await handleToolCall(tool.name, args, client);
          return {
            content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
            isError: false,
          };
        } catch (error) {
          return {
            content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
          };
        }
      }
    );
  }

  // Register prompts
  server.prompt(
    'read-and-analyze',
    'Guide for reading spreadsheet data and analyzing values',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Sheets data assistant.',
            '',
            'Reading data:',
            '1. **Get metadata** — gs_get_spreadsheet to see all sheet names and IDs',
            '2. **Read values** — gs_read_values with A1 notation (e.g. "Sheet1!A1:D100")',
            '3. **Read multiple ranges** — gs_batch_read for efficiency',
            '4. **Read formulas** — Set value_render_option="FORMULA" to see formulas',
            '',
            'A1 notation examples:',
            '- "Sheet1!A1:C10" — specific range',
            '- "Sheet1" — entire sheet',
            '- "A:C" — columns A through C (first sheet)',
            '- "Sheet1!A1:A" — column A, all rows',
            '- "Sheet1!1:5" — rows 1 through 5',
            '',
            'Tips:',
            '- Use gs_get_spreadsheet first to discover sheet names and IDs',
            '- Sheet IDs (numeric) are different from sheet names (text)',
            '- A1 notation uses sheet names; batchUpdate uses sheet IDs',
          ].join('\n'),
        },
      }],
    }),
  );

  server.prompt(
    'write-and-format',
    'Guide for writing data, formatting cells, and managing sheets',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Sheets formatting assistant.',
            '',
            'Writing data:',
            '1. **Write values** — gs_write_values with 2D array [[row1], [row2]]',
            '2. **Append rows** — gs_append_values to add below existing data',
            '3. **Write multiple** — gs_batch_write for multiple ranges at once',
            '4. **Clear values** — gs_clear_values to erase (keeps formatting)',
            '',
            'Formatting (uses 0-based indices):',
            '1. **Text style** — gs_format_cells: bold, italic, fontSize, fontFamily, colors',
            '2. **Alignment** — horizontalAlignment: LEFT/CENTER/RIGHT',
            '3. **Number format** — numberFormatType: NUMBER/PERCENT/CURRENCY/DATE',
            '4. **Merge/unmerge** — gs_merge_cells, gs_unmerge_cells',
            '5. **Auto-fit** — gs_auto_resize for column widths or row heights',
            '',
            'Sheet management:',
            '1. **Add tab** — gs_add_sheet with name and optional color',
            '2. **Delete tab** — gs_delete_sheet (need sheet_id from gs_get_spreadsheet)',
            '3. **Rename** — gs_rename_sheet',
            '4. **Copy/duplicate** — gs_copy_sheet (to another spreadsheet), gs_duplicate_sheet (within same)',
            '',
            'Index mapping: Row 1 = index 0, Column A = index 0, Column B = index 1, etc.',
          ].join('\n'),
        },
      }],
    }),
  );

  // Register resource
  server.resource(
    'server-info',
    'google-sheets://server-info',
    {
      description: 'Connection status and available tools for this Google Sheets MCP server',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [{
        uri: 'google-sheets://server-info',
        mimeType: 'application/json',
        text: JSON.stringify({
          name: 'google-sheets-mcp',
          version: '1.0.0',
          connected: !!config,
          has_oauth: !!(config?.clientId),
          tools_available: TOOLS.length,
          tool_categories: {
            spreadsheet: 2,
            values: 6,
            sheet_management: 5,
            formatting: 4,
            data_operations: 4,
            advanced: 2,
          },
        }, null, 2),
      }],
    }),
  );

  // Override tools/list handler to return raw JSON Schema with property descriptions
  (server as any).server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: TOOLS.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
    })),
  }));

  return server;
}
