---
sidebar_position: 35
---

# Follow Users

Manage user-to-user follow relationships for social networking.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/follow-user-to-user` | Get all FollowUserToUser |
| <span class="method-badge method-get">GET</span> | `/follow-user-to-user/{id}` | Get a FollowUserToUser by ID |
| <span class="method-badge method-get">GET</span> | `/follow-user-to-user/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/follow-user-to-user` | Create a new FollowUserToUser |
| <span class="method-badge method-patch">PATCH</span> | `/follow-user-to-user/{id}` | Update a FollowUserToUser by ID |
| <span class="method-badge method-delete">DELETE</span> | `/follow-user-to-user/{id}` | Delete a FollowUserToUser by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/follow-user-to-user`

**Get all FollowUserToUser**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/follow-user-to-user" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/follow-user-to-user/{id}`

**Get a FollowUserToUser by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/follow-user-to-user/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/follow-user-to-user/search`

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
curl -X GET "https://api.proconnectcareer.com/follow-user-to-user/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/follow-user-to-user`

**Create a new FollowUserToUser**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The ID of the user |
| `following_id` | string | **Yes** | The ID of the following user |
| `status` | `string` enum: `PENDING`, `ACCEPTED`, `DECLINED` | **Yes** | The status of the follow request |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/follow-user-to-user" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "following_id": "<following_id>",
    "status": "PENDING"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/follow-user-to-user/{id}`

**Update a FollowUserToUser by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/follow-user-to-user/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/follow-user-to-user/{id}`

**Delete a FollowUserToUser by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/follow-user-to-user/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

