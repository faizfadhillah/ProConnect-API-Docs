---
sidebar_position: 7
---

# User Right to Work

Manage right-to-work authorizations and work permits for users across different countries.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-right-to-works` | Get all user right to works |
| <span class="method-badge method-get">GET</span> | `/user-right-to-works/{id}` | Get a user right to work by ID |
| <span class="method-badge method-get">GET</span> | `/user-right-to-works/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-right-to-works` | Create a new user right to work |
| <span class="method-badge method-patch">PATCH</span> | `/user-right-to-works/{id}` | Update a user right to work by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-right-to-works/{id}` | Delete a user right to work by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-right-to-works`

**Get all user right to works**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-right-to-works" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-right-to-works/{id}`

**Get a user right to work by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-right-to-works/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `isExcel` | query | string | No | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of users matching the search criteria.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `items` | object[] | **Yes** | Array of items |
| `meta` | Meta | **Yes** | Pagination metadata |

<details>
<summary>Example Response</summary>

```json
{
  "items": [],
  "meta": {}
}
```

</details>

**400** — Bad request.

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-right-to-works/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-right-to-works`

**Create a new user right to work**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | — |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `right_to_work_id` | string | **Yes** | — |
| `file_url` | string | **Yes** | The file attachment url |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-right-to-works" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "string",
    "salary_country_id": "<salary_country_id>",
    "right_to_work_id": "string",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-right-to-works/{id}`

**Update a user right to work by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | No | — |
| `salary_country_id` | string | No | The ID of the SalaryCountry |
| `right_to_work_id` | string | No | — |
| `file_url` | string | No | The file attachment url |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "string",
    "salary_country_id": "<salary_country_id>",
    "right_to_work_id": "string",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-right-to-works/{id}`

**Delete a user right to work by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

