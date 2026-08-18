---
sidebar_position: 38
---

# Schools

Manage the master list of educational institutions for user education records.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-schools/public/all` | Get public schools across all (paginated) |
| <span class="method-badge method-get">GET</span> | `/mst-schools/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-schools` | Create a new school level |
| <span class="method-badge method-post">POST</span> | `/mst-schools/import-xls` | MstSchoolsController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-schools/{id}` | Update an school level |
| <span class="method-badge method-delete">DELETE</span> | `/mst-schools/{id}` | Delete an school level |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-schools/public/all`

**Get public schools across all (paginated)**

Public endpoint used by the landing-site Solution page. Returns schools with pagination. Default limit 10, max 100.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Public schools list across all.

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-schools/public/all" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-schools/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-schools/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-schools`

**Create a new school level**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of school |
| `region_id` | string | **Yes** | ID region |
| `address` | string | No | Address Detail |
| `is_verified` | boolean | **Yes** | is school verified |

#### Responses

**201** — The school level has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `name` | string | **Yes** | The name of school |
| `region_id` | string | **Yes** | ID region |
| `address` | string | **Yes** | Address Detail |
| `is_verified` | boolean | **Yes** | is school verified |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>",
  "region_id": "<region_id>",
  "address": "<address>",
  "is_verified": true
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-schools" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>",
    "region_id": "<region_id>",
    "address": "<address>",
    "is_verified": true
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-schools/import-xls`

**MstSchoolsController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-schools/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-schools/{id}`

**Update an school level**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The school level has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `name` | string | **Yes** | The name of school |
| `region_id` | string | **Yes** | ID region |
| `address` | string | **Yes** | Address Detail |
| `is_verified` | boolean | **Yes** | is school verified |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>",
  "region_id": "<region_id>",
  "address": "<address>",
  "is_verified": true
}
```

</details>

**404** — School level not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-schools/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-schools/{id}`

**Delete an school level**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The school level has been successfully deleted.

**404** — School level not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-schools/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

