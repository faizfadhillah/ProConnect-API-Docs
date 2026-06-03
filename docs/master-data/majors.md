---
sidebar_position: 40
---

# Majors

Manage the master list of academic majors and fields of study.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-majors/{id}` | Get a master major by ID |
| <span class="method-badge method-get">GET</span> | `/mst-majors/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-majors` | Create a new master major |
| <span class="method-badge method-post">POST</span> | `/mst-majors/import-xls` | MstMajorsController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-majors/{id}` | Update a master major |
| <span class="method-badge method-delete">DELETE</span> | `/mst-majors/{id}` | Delete a master major |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-majors/{id}`

**Get a master major by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the master major.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `major_name` | string | **Yes** | The name of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "major_name": "<major_name>"
}
```

</details>

**404** — Master major not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-majors/search`

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

**200** — Returns the list of majors matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/mst-majors/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-majors`

**Create a new master major**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `major_name` | string | **Yes** | The name of the major |

#### Responses

**201** — The master major has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `major_name` | string | **Yes** | The name of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "major_name": "<major_name>"
}
```

</details>

**400** — Bad request.

**409** — Major name already exists.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-majors" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "major_name": "<major_name>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-majors/import-xls`

**MstMajorsController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-majors/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-majors/{id}`

**Update a master major**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `major_name` | string | No | The name of the major |

#### Responses

**200** — The master major has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `major_name` | string | **Yes** | The name of the major |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "major_name": "<major_name>"
}
```

</details>

**404** — Master major not found.

**409** — Major name already exists.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "major_name": "<major_name>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-majors/{id}`

**Delete a master major**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The master major has been successfully deleted.

**404** — Master major not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-majors/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

