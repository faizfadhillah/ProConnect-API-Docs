---
sidebar_position: 11
---

# User Subscription

Manage user subscription plans, billing, and premium feature access.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-subscription` | Get all UserSubscriptions |
| <span class="method-badge method-get">GET</span> | `/user-subscription/{id}` | Get a UserSubscription by ID |
| <span class="method-badge method-get">GET</span> | `/user-subscription/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-subscription` | Create a new UserSubscription |
| <span class="method-badge method-patch">PATCH</span> | `/user-subscription/{id}` | Update a UserSubscription by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-subscription/{id}` | Delete a UserSubscription by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-subscription`

**Get all UserSubscriptions**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-subscription" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-subscription/{id}`

**Get a UserSubscription by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-subscription/search`

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
| `isExcel` | query | string | **Yes** | — |
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
curl -X GET "https://api.proconnectcareer.com/user-subscription/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-subscription`

**Create a new UserSubscription**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The ID of the user |
| `subscription_id` | string | **Yes** | The ID of the subscription |
| `start_date` | string | **Yes** | The start date of the subscription |
| `end_date` | string | **Yes** | The end date of the subscription |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-subscription" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "subscription_id": "<subscription_id>",
    "start_date": "<start_date>",
    "end_date": "<end_date>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-subscription/{id}`

**Update a UserSubscription by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/user-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-subscription/{id}`

**Delete a UserSubscription by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

