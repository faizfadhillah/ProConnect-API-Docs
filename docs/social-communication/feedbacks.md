---
sidebar_position: 36
---

# Feedbacks

Manage feedback submissions and reviews between users and companies.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/feedbacks` | Get all feedbacks |
| <span class="method-badge method-get">GET</span> | `/feedbacks/{id}` | Get a post by ID |
| <span class="method-badge method-get">GET</span> | `/feedbacks/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/feedbacks` | Create a new post |
| <span class="method-badge method-patch">PATCH</span> | `/feedbacks/{id}` | Update a post by ID |
| <span class="method-badge method-delete">DELETE</span> | `/feedbacks/{id}` | Delete a post by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/feedbacks`

**Get all feedbacks**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/feedbacks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/feedbacks/{id}`

**Get a post by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/feedbacks/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/feedbacks/search`

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
curl -X GET "https://api.proconnectcareer.com/feedbacks/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/feedbacks`

**Create a new post**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user who created the post |
| `type` | `string` enum: `REQUEST`, `GENERAL`, `SUGGESTION`, `ISSUE`, `REQUEST_DELETION` | **Yes** | The type of feedbacks |
| `email` | string | **Yes** | The email of public feedbacks |
| `description` | string | **Yes** | The description of feedbacks |
| `attachment_url` | string | **Yes** | The url of attachment's feedback |
| `status` | `string` enum: `OPEN`, `CLOSED` | **Yes** | The status of feedbacks |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/feedbacks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "type": "REQUEST",
    "email": "<email>",
    "description": "<description>",
    "attachment_url": "<attachment_url>",
    "status": "OPEN"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/feedbacks/{id}`

**Update a post by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/feedbacks/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/feedbacks/{id}`

**Delete a post by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/feedbacks/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

