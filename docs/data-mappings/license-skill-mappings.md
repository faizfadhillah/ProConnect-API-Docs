---
sidebar_position: 54
---

# License-Skill Mappings

Manage mappings between professional licenses and associated skills.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-license-skill-mappings/{id}` | Get mapping by ID |
| <span class="method-badge method-get">GET</span> | `/mst-license-skill-mappings/grouped` | Get grouped license skill mappings with pagination |
| <span class="method-badge method-get">GET</span> | `/mst-license-skill-mappings/search` | Search license skill mappings |
| <span class="method-badge method-get">GET</span> | `/mst-license-skill-mappings/template/download` | Download Excel template for bulk upload |
| <span class="method-badge method-post">POST</span> | `/mst-license-skill-mappings` | Create license skill mapping |
| <span class="method-badge method-post">POST</span> | `/mst-license-skill-mappings/upload` | Upload license skill mappings via Excel |
| <span class="method-badge method-put">PUT</span> | `/mst-license-skill-mappings/{id}` | Update mapping |
| <span class="method-badge method-delete">DELETE</span> | `/mst-license-skill-mappings/{id}` | Delete mapping |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-license-skill-mappings/{id}`

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
| `license_id` | string | **Yes** | License ID |
| `skill_id` | string | **Yes** | Skill ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_id": "<license_id>",
  "skill_id": "<skill_id>"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-license-skill-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-license-skill-mappings/grouped`

**Get grouped license skill mappings with pagination**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `license_name` | query | string | No | Filter by license name (case-insensitive partial match) |
| `skill_name` | query | string | No | Filter by skill name (case-insensitive partial match) |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Returns paginated grouped license skill mappings

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

**400** — Bad request - Invalid query parameters

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-license-skill-mappings/grouped" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-license-skill-mappings/search`

**Search license skill mappings**

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

**400** — Bad request

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-license-skill-mappings/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-license-skill-mappings/template/download`

**Download Excel template for bulk upload**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Template downloaded successfully

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-license-skill-mappings/template/download" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-license-skill-mappings`

**Create license skill mapping**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `license_id` | string | **Yes** | License ID |
| `skill_id` | string | **Yes** | Skill ID |

#### Responses

**201** — Mapping created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `license_id` | string | **Yes** | License ID |
| `skill_id` | string | **Yes** | Skill ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_id": "<license_id>",
  "skill_id": "<skill_id>"
}
```

</details>

**400** — Bad request - Duplicate or invalid data

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-license-skill-mappings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "license_id": "<license_id>",
    "skill_id": "<skill_id>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-license-skill-mappings/upload`

**Upload license skill mappings via Excel**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `multipart/form-data`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | string | No | — |

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
curl -X POST "https://api.proconnectcareer.com/mst-license-skill-mappings/upload" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "file": "string"
  }'
```

---

### <span class="method-badge method-put">PUT</span> `/mst-license-skill-mappings/{id}`

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
| `license_id` | string | No | License ID |
| `skill_id` | string | No | Skill ID |

#### Responses

**200** — Mapping updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `license_id` | string | **Yes** | License ID |
| `skill_id` | string | **Yes** | Skill ID |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_id": "<license_id>",
  "skill_id": "<skill_id>"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X PUT "https://api.proconnectcareer.com/mst-license-skill-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "license_id": "<license_id>",
    "skill_id": "<skill_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-license-skill-mappings/{id}`

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
curl -X DELETE "https://api.proconnectcareer.com/mst-license-skill-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

