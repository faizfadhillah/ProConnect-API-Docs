---
sidebar_position: 39
---

# School Majors

Manage major/program offerings linked to specific schools.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-school-majors/{id}` | Get a school-major relation by ID |
| <span class="method-badge method-get">GET</span> | `/mst-school-majors/by-major/{majorId}` | Get all schools offering a major |
| <span class="method-badge method-get">GET</span> | `/mst-school-majors/by-school/{schoolId}` | Get all majors for a school |
| <span class="method-badge method-get">GET</span> | `/mst-school-majors/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-school-majors` | Create a new school-major relation |
| <span class="method-badge method-patch">PATCH</span> | `/mst-school-majors/{id}` | Update a school-major relation |
| <span class="method-badge method-delete">DELETE</span> | `/mst-school-majors/{id}` | Delete a school-major relation |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-school-majors/{id}`

**Get a school-major relation by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the school-major relation.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | The ID of the school |
| `major_id` | string | **Yes** | The ID of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>"
}
```

</details>

**404** — School-Major relation not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-school-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-school-majors/by-major/{majorId}`

**Get all schools offering a major**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `majorId` | path | string | **Yes** | — |

#### Responses

**200** — Returns all schools offering the specified major.

**404** — Major not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-school-majors/by-major/{majorId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-school-majors/by-school/{schoolId}`

**Get all majors for a school**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `schoolId` | path | string | **Yes** | — |

#### Responses

**200** — Returns all majors for the specified school.

**404** — School not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-school-majors/by-school/{schoolId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-school-majors/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `expands` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `isExcel` | query | string | **Yes** | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of school-major relations matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/mst-school-majors/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-school-majors`

**Create a new school-major relation**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `school_id` | string | **Yes** | The ID of the school |
| `major_id` | string | **Yes** | The ID of the major |

#### Responses

**201** — The school-major relation has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | The ID of the school |
| `major_id` | string | **Yes** | The ID of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>"
}
```

</details>

**400** — Bad request.

**404** — School or Major not found.

**409** — School-Major relation already exists.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-school-majors" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-school-majors/{id}`

**Update a school-major relation**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `school_id` | string | No | The ID of the school |
| `major_id` | string | No | The ID of the major |

#### Responses

**200** — The school-major relation has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `school_id` | string | **Yes** | The ID of the school |
| `major_id` | string | **Yes** | The ID of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "school_id": "<school_id>",
  "major_id": "<major_id>"
}
```

</details>

**404** — School-Major relation not found.

**409** — School-Major relation already exists.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-school-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "<school_id>",
    "major_id": "<major_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-school-majors/{id}`

**Delete a school-major relation**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The school-major relation has been successfully deleted.

**404** — School-Major relation not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-school-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

