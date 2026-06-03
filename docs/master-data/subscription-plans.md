---
sidebar_position: 47
---

# Subscription Plans

Manage available subscription plan tiers and pricing.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-subscription` | Get all subscriptions |
| <span class="method-badge method-get">GET</span> | `/mst-subscription/{id}` | Get a subscription by ID |
| <span class="method-badge method-get">GET</span> | `/mst-subscription/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-subscription` | Create a new subscription |
| <span class="method-badge method-post">POST</span> | `/mst-subscription/import-xls` | MstSubscriptionController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-subscription/{id}` | Update a subscription by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-subscription/{id}` | Delete a subscription by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-subscription`

**Get all subscriptions**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-subscription" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-subscription/{id}`

**Get a subscription by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-subscription/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-subscription/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-subscription`

**Create a new subscription**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the subscription |
| `description` | string | **Yes** | The description of the subscription |
| `price` | string | **Yes** | The price of the subscription |
| `duration` | number | **Yes** | The duration of the subscription in days |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-subscription" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>",
    "description": "<description>",
    "price": "<price>",
    "duration": 0
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-subscription/import-xls`

**MstSubscriptionController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-subscription/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-subscription/{id}`

**Update a subscription by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/mst-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-subscription/{id}`

**Delete a subscription by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-subscription/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

