---
sidebar_position: 25
---

# Company Files

Manage files and documents associated with company profiles, such as logos, banners, and corporate documents.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/company-files` | Get all CompanyFiles |
| <span class="method-badge method-get">GET</span> | `/company-files/{id}` | Get a CompanyFile by ID |
| <span class="method-badge method-get">GET</span> | `/company-files/company/{company_id}` | Get CompanyFiles by company_id |
| <span class="method-badge method-get">GET</span> | `/company-files/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/company-files` | Create a new CompanyFile |
| <span class="method-badge method-patch">PATCH</span> | `/company-files/{id}` | Update a CompanyFile by ID |
| <span class="method-badge method-delete">DELETE</span> | `/company-files/{id}` | Delete a CompanyFile by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/company-files`

**Get all CompanyFiles**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/company-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/company-files/{id}`

**Get a CompanyFile by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/company-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/company-files/company/{company_id}`

**Get CompanyFiles by company_id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `company_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/company-files/company/{company_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/company-files/search`

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
curl -X GET "https://api.proconnectcareer.com/company-files/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/company-files`

**Create a new CompanyFile**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `company_id` | string | **Yes** | The id of the company |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `jpeg`, `png`, `webp` | **Yes** | The type of the file (pdf, doc, docx, xls, xlsx, jpg, png, other) |
| `file_url` | string | **Yes** | The URL of the file |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/company-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "<company_id>",
    "file_name": "<file_name>",
    "file_type": "pdf",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/company-files/{id}`

**Update a CompanyFile by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/company-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/company-files/{id}`

**Delete a CompanyFile by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/company-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

