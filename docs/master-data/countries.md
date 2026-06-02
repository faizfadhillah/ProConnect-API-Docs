---
sidebar_position: 51
---

# Countries

Manage the master list of countries for location references.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-country/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-country` | Create a new MstCountry |
| <span class="method-badge method-post">POST</span> | `/mst-country/import-xls` | MstCountryController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-country/{id}` | Update a MstCountry by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-country/{id}` | Delete a MstCountry by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-country/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-country/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-country`

**Create a new MstCountry**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the country |
| `code` | string | **Yes** | The code of the country |
| `dial_code` | string | **Yes** | The dial code of the country |
| `flag_emoji` | string | **Yes** | The emoji of the country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the country |

#### Responses

**201** — The MstCountry has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `name` | string | **Yes** | The name of the salary country |
| `code` | string | **Yes** | The code of the country |
| `flag_emoji` | string | **Yes** | The emoji of the country |
| `dial_code` | string | **Yes** | The dial code of the salary country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the salary country |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>",
  "code": "<code>",
  "flag_emoji": "<flag_emoji>",
  "dial_code": "<dial_code>",
  "currency_code": "<currency_code>",
  "currency_symbol": "<currency_symbol>",
  "is_salary_active": true
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-country" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>",
    "code": "<code>",
    "dial_code": "<dial_code>",
    "flag_emoji": "<flag_emoji>",
    "currency_code": "<currency_code>",
    "currency_symbol": "<currency_symbol>",
    "is_salary_active": true
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-country/import-xls`

**MstCountryController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-country/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-country/{id}`

**Update a MstCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The MstCountry has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `name` | string | **Yes** | The name of the salary country |
| `code` | string | **Yes** | The code of the country |
| `flag_emoji` | string | **Yes** | The emoji of the country |
| `dial_code` | string | **Yes** | The dial code of the salary country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the salary country |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>",
  "code": "<code>",
  "flag_emoji": "<flag_emoji>",
  "dial_code": "<dial_code>",
  "currency_code": "<currency_code>",
  "currency_symbol": "<currency_symbol>",
  "is_salary_active": true
}
```

</details>

**404** — MstCountry not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-country/{id}`

**Delete a MstCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstCountry has been successfully deleted.

**404** — MstCountry not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

