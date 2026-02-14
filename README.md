# @node2flow/google-sheets-mcp

[![smithery badge](https://smithery.ai/badge/node2flow/google-sheets)](https://smithery.ai/server/node2flow/google-sheets)
[![npm version](https://img.shields.io/npm/v/@node2flow/google-sheets-mcp.svg)](https://www.npmjs.com/package/@node2flow/google-sheets-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for **Google Sheets** — read, write, format, and manage spreadsheets through 23 tools via the Model Context Protocol.

## Quick Start

### Claude Desktop / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "@node2flow/google-sheets-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-refresh-token"
      }
    }
  }
}
```

### HTTP Mode

```bash
GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=xxx GOOGLE_REFRESH_TOKEN=xxx npx @node2flow/google-sheets-mcp --http
```

MCP endpoint: `http://localhost:3000/mcp`

### Cloudflare Worker

Available at: `https://google-sheets-mcp-community.node2flow.net/mcp`

```
POST https://google-sheets-mcp-community.node2flow.net/mcp?GOOGLE_CLIENT_ID=xxx&GOOGLE_CLIENT_SECRET=xxx&GOOGLE_REFRESH_TOKEN=xxx
```

---

## Tools (23)

### Spreadsheet (2)

| Tool | Description |
|------|-------------|
| `gs_create_spreadsheet` | Create a new spreadsheet with title and optional sheets |
| `gs_get_spreadsheet` | Get metadata — sheet names, IDs, properties |

### Values (6)

| Tool | Description |
|------|-------------|
| `gs_read_values` | Read cell values from an A1 range |
| `gs_batch_read` | Read multiple ranges at once |
| `gs_write_values` | Write values to a range (2D array) |
| `gs_append_values` | Append rows after existing data |
| `gs_clear_values` | Clear values in a range (keeps formatting) |
| `gs_batch_write` | Write to multiple ranges at once |

### Sheet Management (5)

| Tool | Description |
|------|-------------|
| `gs_add_sheet` | Add a new sheet/tab |
| `gs_delete_sheet` | Delete a sheet/tab (irreversible) |
| `gs_rename_sheet` | Rename a sheet/tab |
| `gs_copy_sheet` | Copy sheet to another spreadsheet |
| `gs_duplicate_sheet` | Duplicate sheet within same spreadsheet |

### Formatting (4)

| Tool | Description |
|------|-------------|
| `gs_format_cells` | Bold, italic, colors, font, alignment, number format |
| `gs_merge_cells` | Merge cells in a range |
| `gs_unmerge_cells` | Unmerge cells |
| `gs_auto_resize` | Auto-fit column widths or row heights |

### Data Operations (4)

| Tool | Description |
|------|-------------|
| `gs_sort_range` | Sort range by column |
| `gs_find_replace` | Find and replace text (supports regex) |
| `gs_set_basic_filter` | Set or clear auto-filter on a sheet |
| `gs_add_protected_range` | Protect a range from editing |

### Advanced (2)

| Tool | Description |
|------|-------------|
| `gs_add_chart` | Add a chart (bar, line, column, scatter, etc.) |
| `gs_batch_update` | Raw batchUpdate for any operation |

---

## A1 Notation

Ranges use A1 notation for the Values tools:

```
Sheet1!A1:C10    — specific range in Sheet1
Sheet1           — entire sheet
A:C              — columns A through C (first sheet)
Sheet1!A1:A      — column A, all rows
Sheet1!1:5       — rows 1 through 5
```

## Index Notation

Formatting and batchUpdate tools use 0-based indices:

```
Row 1    → index 0      Column A → index 0
Row 2    → index 1      Column B → index 1
Row 10   → index 9      Column Z → index 25
```

Ranges are **inclusive start, exclusive end**:
- `startRowIndex: 0, endRowIndex: 5` = rows 1-5
- `startColumnIndex: 0, endColumnIndex: 3` = columns A-C

---

## Configuration

| Parameter | Required | Description |
|-----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | OAuth 2.0 Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth 2.0 Client Secret |
| `GOOGLE_REFRESH_TOKEN` | Yes | Refresh token (obtained via OAuth consent flow) |

### Getting Your Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Google Sheets API**
3. Create **OAuth 2.0 Client ID** (Desktop app type)
4. Use the [OAuth Playground](https://developers.google.com/oauthplayground/) or your app to get a refresh token with scope `https://www.googleapis.com/auth/spreadsheets`

### OAuth Scopes

| Scope | Access |
|-------|--------|
| `spreadsheets` | Full read/write access |
| `spreadsheets.readonly` | Read-only access |

---

## License

MIT License - see [LICENSE](LICENSE)

Copyright (c) 2026 [Node2Flow](https://node2flow.net)

## Links

- [npm Package](https://www.npmjs.com/package/@node2flow/google-sheets-mcp)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [Node2Flow](https://node2flow.net)
