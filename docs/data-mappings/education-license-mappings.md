---
sidebar_position: 52
---

# Education-License Mappings

Manage mappings between educational qualifications and professional licenses.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-education-license-mappings/{id}` | Get mapping by ID |
| <span class="method-badge method-get">GET</span> | `/mst-education-license-mappings/grouped` | Get grouped education license mappings with pagination |
| <span class="method-badge method-get">GET</span> | `/mst-education-license-mappings/search` | Search education license mappings |
| <span class="method-badge method-get">GET</span> | `/mst-education-license-mappings/template/download` | Download Excel template for bulk upload |
| <span class="method-badge method-post">POST</span> | `/mst-education-license-mappings` | Create education license mapping |
| <span class="method-badge method-post">POST</span> | `/mst-education-license-mappings/upload` | Upload education license mappings via Excel |
| <span class="method-badge method-put">PUT</span> | `/mst-education-license-mappings/{id}` | Update mapping |
| <span class="method-badge method-delete">DELETE</span> | `/mst-education-license-mappings/{id}` | Delete mapping |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-education-license-mappings/{id}`

**Get mapping by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Mapping retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | **Yes** | Diploma Level (e.g., L1, L2, L3). Null = wildcard (any level). |
| `license_id` | string | **Yes** | License ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "license_id": "<license_id>"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-license-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-license-mappings/grouped`

**Get grouped education license mappings with pagination**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `school_name` | query | string | No | Filter by school name (case-insensitive partial match) |
| `major_name` | query | string | No | Filter by major name (case-insensitive partial match) |
| `school_id` | query | string | No | Filter by school ID (exact match) |
| `major_id` | query | string | No | Filter by major ID (exact match) |
| `degree` | query | string | No | Filter by degree (exact match) |
| `diploma_level` | query | string | No | Filter by diploma level (exact match) |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Returns paginated grouped education license mappings

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

**400** — Bad request - Invalid query parameters

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-license-mappings/grouped" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-license-mappings/search`

**Search education license mappings**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `isExcel` | query | string | No | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns list of mappings

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

**400** — Bad request

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-license-mappings/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-license-mappings/template/download`

**Download Excel template for bulk upload**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Template downloaded successfully

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-license-mappings/template/download" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-education-license-mappings`

**Create education license mapping**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3). Omit or null = wildcard (any level). |
| `license_id` | string | **Yes** | License ID |

#### Responses

**201** — Mapping created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | **Yes** | Diploma Level (e.g., L1, L2, L3). Null = wildcard (any level). |
| `license_id` | string | **Yes** | License ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "license_id": "<license_id>"
}
```

</details>

**400** — Bad request - Duplicate or invalid data

**403** — Forbidden - No permission for this school

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-education-license-mappings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>",
    "license_id": "<license_id>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-education-license-mappings/upload`

**Upload education license mappings via Excel**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — File processed successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `success_count` | number | **Yes** | Number of successfully processed rows |
| `error_count` | number | **Yes** | Number of failed rows |
| `errors` | string[] | **Yes** | List of errors |
| `message` | string | **Yes** | Processing message |

<details>
<summary>Example Response</summary>

```json
{
  "success_count": 0,
  "error_count": 0,
  "errors": [],
  "message": "<message>"
}
```

</details>

**400** — Bad request

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-education-license-mappings/upload" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-put">PUT</span> `/mst-education-license-mappings/{id}`

**Update mapping**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `school_id` | string | No | School ID |
| `major_id` | string | No | Major ID |
| `degree` | string | No | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3). Omit or null = wildcard (any level). |
| `license_id` | string | No | License ID |

#### Responses

**200** — Mapping updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | **Yes** | Diploma Level (e.g., L1, L2, L3). Null = wildcard (any level). |
| `license_id` | string | **Yes** | License ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "license_id": "<license_id>"
}
```

</details>

**403** — Forbidden

**404** — Mapping not found

#### Example Request

```bash
curl -X PUT "https://api.proconnectcareer.com/mst-education-license-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>",
    "license_id": "<license_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-education-license-mappings/{id}`

**Delete mapping**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Mapping deleted successfully

**403** — Forbidden

**404** — Mapping not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-education-license-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

