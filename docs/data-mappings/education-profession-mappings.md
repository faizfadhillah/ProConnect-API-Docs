---
sidebar_position: 53
---

# Education-Profession Mappings

Manage mappings between educational backgrounds and profession categories.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-education-profession-mappings/{id}` | Get mapping by ID |
| <span class="method-badge method-get">GET</span> | `/mst-education-profession-mappings/grouped` | Get grouped education profession mappings with pagination |
| <span class="method-badge method-get">GET</span> | `/mst-education-profession-mappings/search` | Search education profession mappings |
| <span class="method-badge method-get">GET</span> | `/mst-education-profession-mappings/template/download` | Download Excel template for bulk upload |
| <span class="method-badge method-post">POST</span> | `/mst-education-profession-mappings` | Create education profession mapping |
| <span class="method-badge method-post">POST</span> | `/mst-education-profession-mappings/upload` | Upload education profession mappings via Excel |
| <span class="method-badge method-put">PUT</span> | `/mst-education-profession-mappings/{id}` | Update mapping |
| <span class="method-badge method-delete">DELETE</span> | `/mst-education-profession-mappings/{id}` | Delete mapping |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-education-profession-mappings/{id}`

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
| `profession_id` | string | **Yes** | Profession ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "profession_id": "<profession_id>"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-profession-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-profession-mappings/grouped`

**Get grouped education profession mappings with pagination**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `school_name` | query | string | No | Filter by school name (case-insensitive partial match) |
| `major_name` | query | string | No | Filter by major name (case-insensitive partial match) |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Returns paginated grouped education profession mappings

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
curl -X GET "https://api.proconnectcareer.com/mst-education-profession-mappings/grouped" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-profession-mappings/search`

**Search education profession mappings**

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
curl -X GET "https://api.proconnectcareer.com/mst-education-profession-mappings/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-education-profession-mappings/template/download`

**Download Excel template for bulk upload**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Template downloaded successfully

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-education-profession-mappings/template/download" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-education-profession-mappings`

**Create education profession mapping**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3). Omit or null = wildcard (any level). |
| `profession_id` | string | **Yes** | Profession ID |

#### Responses

**201** — Mapping created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | **Yes** | Diploma Level (e.g., L1, L2, L3). Null = wildcard (any level). |
| `profession_id` | string | **Yes** | Profession ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "profession_id": "<profession_id>"
}
```

</details>

**400** — Bad request - Duplicate or invalid data

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-education-profession-mappings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>",
    "profession_id": "<profession_id>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-education-profession-mappings/upload`

**Upload education profession mappings via Excel**

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
curl -X POST "https://api.proconnectcareer.com/mst-education-profession-mappings/upload" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-put">PUT</span> `/mst-education-profession-mappings/{id}`

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
| `profession_id` | string | No | Profession ID |

#### Responses

**200** — Mapping updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | School ID |
| `major_id` | string | **Yes** | Major ID |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | **Yes** | Diploma Level (e.g., L1, L2, L3). Null = wildcard (any level). |
| `profession_id` | string | **Yes** | Profession ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>",
  "profession_id": "<profession_id>"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X PUT "https://api.proconnectcareer.com/mst-education-profession-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>",
    "profession_id": "<profession_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-education-profession-mappings/{id}`

**Delete mapping**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Mapping deleted successfully

**404** — Mapping not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-education-profession-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

