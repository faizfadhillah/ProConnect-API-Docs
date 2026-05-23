---
sidebar_position: 4
---

# Pagination

List endpoints in the ProConnect API support pagination to efficiently handle large datasets.

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `number` | `1` | Page number (1-based) |
| `limit` | `number` | `10` | Number of items per page (max: 100) |
| `sortBy` | `string` | `created_at` | Field to sort by |
| `sortOrder` | `string` | `DESC` | Sort direction: `ASC` or `DESC` |
| `search` | `string` | — | Search keyword for filtering |

## Example Request

```bash
curl "https://api.proconnectcareer.com/users?page=1&limit=20&sortBy=created_at&sortOrder=DESC" \
  -H "Authorization: Bearer <token>"
```

## Paginated Response Format

List endpoints return data wrapped in a pagination envelope:

```json
{
  "statusCode": 200,
  "message": ["Success"],
  "error": "",
  "error_code": "",
  "traceId": "req-abc-123",
  "data": {
    "items": [
      { "id": "uuid-1", "full_name": "John Doe", "..." : "..." },
      { "id": "uuid-2", "full_name": "Jane Smith", "..." : "..." }
    ],
    "meta": {
      "totalItems": 156,
      "itemCount": 20,
      "itemsPerPage": 20,
      "totalPages": 8,
      "currentPage": 1
    }
  }
}
```

### Pagination Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `totalItems` | `number` | Total number of items across all pages |
| `itemCount` | `number` | Number of items in the current page |
| `itemsPerPage` | `number` | Requested page size |
| `totalPages` | `number` | Total number of pages |
| `currentPage` | `number` | Current page number |

## Filtering

Many list endpoints support additional filtering via query parameters specific to the resource:

```bash
# Filter jobs by status
curl "https://api.proconnectcareer.com/jobs?status=ACTIVE&page=1&limit=10" \
  -H "Authorization: Bearer <token>"

# Search users by name
curl "https://api.proconnectcareer.com/users?search=john&page=1&limit=20" \
  -H "Authorization: Bearer <token>"
```

## Best Practices

1. **Use reasonable page sizes** — Default to 10-25 items. Avoid requesting more than 100.
2. **Cache results** — Paginated data can be cached based on query parameters.
3. **Check `totalPages`** — Stop requesting when `currentPage >= totalPages`.
4. **Use sorting** — Sort by relevant fields to get the most useful results first.
