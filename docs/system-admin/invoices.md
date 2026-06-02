---
sidebar_position: 63
---

# Invoices

Manage invoices for subscription billing and service payments.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/invoices` | Get all Invoices |
| <span class="method-badge method-get">GET</span> | `/invoices/{id}` | Get an Invoice by ID |
| <span class="method-badge method-get">GET</span> | `/invoices/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/invoices/user_id/{user_id}` | Get Invoices by user ID |
| <span class="method-badge method-post">POST</span> | `/invoices` | Create a new Invoice |
| <span class="method-badge method-patch">PATCH</span> | `/invoices/{id}` | Update an Invoice by ID |
| <span class="method-badge method-delete">DELETE</span> | `/invoices/{id}` | Delete an Invoice by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/invoices`

**Get all Invoices**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/invoices" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/invoices/{id}`

**Get an Invoice by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/invoices/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/invoices/search`

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
curl -X GET "https://api.proconnectcareer.com/invoices/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/invoices/user_id/{user_id}`

**Get Invoices by user ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/invoices/user_id/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/invoices`

**Create a new Invoice**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | string | **Yes** | The ID of the user associated with the invoice |
| `invoiceNumber` | string | **Yes** | The invoice number |
| `paymentMethod` | string | **Yes** | The payment method used |
| `amount` | number | **Yes** | The amount of the invoice |
| `status` | `string` enum: `paid`, `pending`, `overdue` | **Yes** | The status of the invoice (paid, pending, overdue) |
| `subscriptionId` | string | **Yes** | The subscription ID associated with the invoice |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/invoices" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "<userId>",
    "invoiceNumber": "<invoiceNumber>",
    "paymentMethod": "<paymentMethod>",
    "amount": 0,
    "status": "paid",
    "subscriptionId": "<subscriptionId>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/invoices/{id}`

**Update an Invoice by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/invoices/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/invoices/{id}`

**Delete an Invoice by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/invoices/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

