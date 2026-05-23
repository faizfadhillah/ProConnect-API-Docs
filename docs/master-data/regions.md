---
sidebar_position: 45
---

# Regions

Manage geographic regions for location-based features and job matching.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-regions` | Get all master regions |
| <span class="method-badge method-get">GET</span> | `/mst-regions/{id}` | Get a master region by ID |
| <span class="method-badge method-get">GET</span> | `/mst-regions/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-regions` | Create a new master region |
| <span class="method-badge method-post">POST</span> | `/mst-regions/import-xls` | MstRegionsController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-regions/{id}` | Update a master region by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-regions/{id}` | Delete a master region by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-regions`

**Get all master regions**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-regions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-regions/{id}`

**Get a master region by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-regions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-regions/search`

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

**400** — Bad request.

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-regions/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-regions`

**Create a new master region**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | Region Id |
| `name` | string | **Yes** | Region Name |
| `type` | string | **Yes** | Region type |
| `parent_id` | string | No | Parent region ID |
| `full_name` | string | **Yes** | Region FUll Name |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-regions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "<id>",
    "name": "<name>",
    "type": "<type>",
    "parent_id": "<parent_id>",
    "full_name": "<full_name>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-regions/import-xls`

**MstRegionsController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-regions/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-regions/{id}`

**Update a master region by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | No | Region Id |
| `name` | string | No | Region Name |
| `type` | string | No | Region type |
| `parent_id` | string | No | Parent region ID |
| `full_name` | string | No | Region FUll Name |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-regions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "<id>",
    "name": "<name>",
    "type": "<type>",
    "parent_id": "<parent_id>",
    "full_name": "<full_name>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-regions/{id}`

**Delete a master region by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-regions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

