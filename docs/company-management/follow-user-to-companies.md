---
sidebar_position: 28
---

# Follow Companies

Manage user-to-company follow relationships for updates and notifications.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/follow-user-to-companies` | Get all FollowUserToCompanies |
| <span class="method-badge method-get">GET</span> | `/follow-user-to-companies/{id}` | Get a FollowUserToCompanies by ID |
| <span class="method-badge method-get">GET</span> | `/follow-user-to-companies/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/follow-user-to-companies` | Create a new FollowUserToCompanies |
| <span class="method-badge method-patch">PATCH</span> | `/follow-user-to-companies/{id}` | Update a FollowUserToCompanies by ID |
| <span class="method-badge method-delete">DELETE</span> | `/follow-user-to-companies/{id}` | Delete a FollowUserToCompanies by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/follow-user-to-companies`

**Get all FollowUserToCompanies**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/follow-user-to-companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/follow-user-to-companies/{id}`

**Get a FollowUserToCompanies by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/follow-user-to-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/follow-user-to-companies/search`

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
| `meta` | object | **Yes** | Pagination metadata |

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
curl -X GET "https://api.proconnectcareer.com/follow-user-to-companies/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/follow-user-to-companies`

**Create a new FollowUserToCompanies**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The ID of the user |
| `company_id` | string | **Yes** | The ID of the company |
| `status` | `string` enum: `PENDING`, `ACCEPTED`, `DECLINED` | **Yes** | The status of the follow request |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/follow-user-to-companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "company_id": "<company_id>",
    "status": "PENDING"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/follow-user-to-companies/{id}`

**Update a FollowUserToCompanies by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/follow-user-to-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/follow-user-to-companies/{id}`

**Delete a FollowUserToCompanies by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/follow-user-to-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

