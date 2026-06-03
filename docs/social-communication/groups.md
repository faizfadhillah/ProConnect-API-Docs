---
sidebar_position: 33
---

# Groups

Manage professional groups and communities for networking and discussion.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/groups` | Get all Groups |
| <span class="method-badge method-get">GET</span> | `/groups/{id}` | Get a Group by ID |
| <span class="method-badge method-get">GET</span> | `/groups/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/groups` | Create a new Group |
| <span class="method-badge method-patch">PATCH</span> | `/groups/{id}` | Update a Group by ID |
| <span class="method-badge method-delete">DELETE</span> | `/groups/{id}` | Delete a Group by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/groups`

**Get all Groups**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/groups" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/groups/{id}`

**Get a Group by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/groups/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/groups/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
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
curl -X GET "https://api.proconnectcareer.com/groups/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/groups`

**Create a new Group**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the group |
| `description` | string | **Yes** | The description of the group |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/groups" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>",
    "description": "<description>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/groups/{id}`

**Update a Group by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/groups/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/groups/{id}`

**Delete a Group by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/groups/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

