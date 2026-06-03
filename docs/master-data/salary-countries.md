---
sidebar_position: 50
---

# Salary Countries

Manage country-specific salary benchmark data.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-salary-country/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-salary-country` | Create a new MstSalaryCountry |
| <span class="method-badge method-post">POST</span> | `/mst-salary-country/import-xls` | MstSalaryCountryController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-salary-country/{id}` | Update a MstSalaryCountry by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-salary-country/{id}` | Delete a MstSalaryCountry by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-salary-country/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-salary-country/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-salary-country`

**Create a new MstSalaryCountry**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country_name` | string | **Yes** | The name of the salary country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the salary country |

#### Responses

**201** — The MstSalaryCountry has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `country_name` | string | **Yes** | The name of the salary country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the salary country |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "country_name": "<country_name>",
  "currency_code": "<currency_code>",
  "currency_symbol": "<currency_symbol>",
  "is_salary_active": true
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-salary-country" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "country_name": "<country_name>",
    "currency_code": "<currency_code>",
    "currency_symbol": "<currency_symbol>",
    "is_salary_active": true
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-salary-country/import-xls`

**MstSalaryCountryController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-salary-country/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-salary-country/{id}`

**Update a MstSalaryCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The MstSalaryCountry has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `country_name` | string | **Yes** | The name of the salary country |
| `currency_code` | string | **Yes** | The code of the curency |
| `currency_symbol` | string | **Yes** | The symbol of the currency |
| `is_salary_active` | boolean | **Yes** | The status of the salary country |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "country_name": "<country_name>",
  "currency_code": "<currency_code>",
  "currency_symbol": "<currency_symbol>",
  "is_salary_active": true
}
```

</details>

**404** — MstSalaryCountry not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-salary-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-salary-country/{id}`

**Delete a MstSalaryCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstSalaryCountry has been successfully deleted.

**404** — MstSalaryCountry not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-salary-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

