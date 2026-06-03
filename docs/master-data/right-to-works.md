---
sidebar_position: 46
---

# Right to Works

Manage the master list of right-to-work authorization types.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-right-to-works` | Get all MstRightToWorks |
| <span class="method-badge method-get">GET</span> | `/mst-right-to-works/{id}` | Get a MstRightToWork by ID |
| <span class="method-badge method-get">GET</span> | `/mst-right-to-works/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-right-to-works` | Create a new MstRightToWork |
| <span class="method-badge method-post">POST</span> | `/mst-right-to-works/import-xls` | MstRightToWorksController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-right-to-works/{id}` | Update a MstRightToWork by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-right-to-works/{id}` | Delete a MstRightToWork by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-right-to-works`

**Get all MstRightToWorks**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Returns the list of all MstRightToWorks.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-right-to-works" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-right-to-works/{id}`

**Get a MstRightToWork by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the MstRightToWork with the specified ID.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `code` | string | **Yes** | — |
| `name` | string | **Yes** | — |
| `description` | string | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "salary_country_id": "<salary_country_id>",
  "code": "string",
  "name": "string",
  "description": "string"
}
```

</details>

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-right-to-works/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-right-to-works/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-right-to-works`

**Create a new MstRightToWork**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `code` | string | **Yes** | — |
| `name` | string | **Yes** | — |
| `description` | string | **Yes** | — |

#### Responses

**201** — The MstRightToWork has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `code` | string | **Yes** | — |
| `name` | string | **Yes** | — |
| `description` | string | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "salary_country_id": "<salary_country_id>",
  "code": "string",
  "name": "string",
  "description": "string"
}
```

</details>

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-right-to-works" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "salary_country_id": "<salary_country_id>",
    "code": "string",
    "name": "string",
    "description": "string"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-right-to-works/import-xls`

**MstRightToWorksController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-right-to-works/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-right-to-works/{id}`

**Update a MstRightToWork by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `salary_country_id` | string | No | The ID of the SalaryCountry |
| `code` | string | No | — |
| `name` | string | No | — |
| `description` | string | No | — |

#### Responses

**200** — The MstRightToWork has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `code` | string | **Yes** | — |
| `name` | string | **Yes** | — |
| `description` | string | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "salary_country_id": "<salary_country_id>",
  "code": "string",
  "name": "string",
  "description": "string"
}
```

</details>

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "salary_country_id": "<salary_country_id>",
    "code": "string",
    "name": "string",
    "description": "string"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-right-to-works/{id}`

**Delete a MstRightToWork by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstRightToWork has been successfully deleted.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-right-to-works/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

