---
sidebar_position: 64
---

# Invoice Items

Manage individual line items within invoices.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/invoices-items` | Get all InvoicesItems |
| <span class="method-badge method-get">GET</span> | `/invoices-items/{invoice_id}` | Get an InvoicesItem by invoice_id |
| <span class="method-badge method-get">GET</span> | `/invoices-items/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/invoices-items` | Create a new InvoicesItem |
| <span class="method-badge method-patch">PATCH</span> | `/invoices-items/{invoice_id}` | Update an InvoicesItem by invoice_id |
| <span class="method-badge method-delete">DELETE</span> | `/invoices-items/{invoice_id}` | Delete an InvoicesItem by invoice_id |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/invoices-items`

**Get all InvoicesItems**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/invoices-items" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/invoices-items/{invoice_id}`

**Get an InvoicesItem by invoice_id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `invoice_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/invoices-items/{invoice_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/invoices-items/search`

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
curl -X GET "https://api.proconnectcareer.com/invoices-items/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/invoices-items`

**Create a new InvoicesItem**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice_id` | string | **Yes** | The ID of the invoice |
| `paket_id` | string | **Yes** | The ID of the paket |
| `price` | number | **Yes** | The price of the item |
| `qty` | number | **Yes** | The quantity of the item |
| `amount` | number | **Yes** | The total amount |
| `status` | `string` enum: `pending`, `paid`, `canceled` | **Yes** | The status of the item |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/invoices-items" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_id": "<invoice_id>",
    "paket_id": "<paket_id>",
    "price": 0,
    "qty": 0,
    "amount": 0,
    "status": "pending"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/invoices-items/{invoice_id}`

**Update an InvoicesItem by invoice_id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `invoice_id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `price` | number | **Yes** | The price of the item |
| `qty` | number | **Yes** | The quantity of the item |
| `amount` | number | **Yes** | The total amount |
| `status` | `string` enum: `pending`, `paid`, `canceled` | **Yes** | The status of the item |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/invoices-items/{invoice_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 0,
    "qty": 0,
    "amount": 0,
    "status": "pending"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/invoices-items/{invoice_id}`

**Delete an InvoicesItem by invoice_id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `invoice_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/invoices-items/{invoice_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

