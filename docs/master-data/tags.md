---
sidebar_position: 48
---

# Tags

Manage taxonomy tags for content classification and filtering.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-tags` | Get all MstAspCompetencys |
| <span class="method-badge method-get">GET</span> | `/mst-tags/{id}` | Get an MstAspCompetency by ID |
| <span class="method-badge method-get">GET</span> | `/mst-tags/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-tags` | Create a new MstAspCompetency |
| <span class="method-badge method-post">POST</span> | `/mst-tags/import-xls` | MstAspCompetenciesController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-tags/{id}` | Update an MstAspCompetency by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-tags/{id}` | Delete an MstAspCompetency by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-tags`

**Get all MstAspCompetencys**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-tags" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-tags/{id}`

**Get an MstAspCompetency by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-tags/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-tags/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-tags/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-tags`

**Create a new MstAspCompetency**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `primary_division` | string | **Yes** | The primary division within the hotel services |
| `secondary_division` | string | **Yes** | The secondary division within the hotel services |
| `job_index_number` | string | **Yes** | The job index number |
| `job_titles` | string | **Yes** | The title of the job position |
| `competency_type` | string | **Yes** | The type of competency |
| `competency_standard` | string | **Yes** | The competency standard details |
| `competency_cluster_code` | string | **Yes** | The competency cluster code |
| `skills` | string | **Yes** | The related skills, if applicable |
| `created_by` | string | **Yes** | The ID of the user who created the entry |
| `updated_by` | string | **Yes** | The ID of the user who last updated the entry |
| `version` | number | **Yes** | The version number of the entry |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-tags" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "primary_division": "<primary_division>",
    "secondary_division": "<secondary_division>",
    "job_index_number": "<job_index_number>",
    "job_titles": "<job_titles>",
    "competency_type": "<competency_type>",
    "competency_standard": "<competency_standard>",
    "competency_cluster_code": "<competency_cluster_code>",
    "skills": "<skills>",
    "created_by": "<created_by>",
    "updated_by": "<updated_by>",
    "version": 0
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-tags/import-xls`

**MstAspCompetenciesController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-tags/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-tags/{id}`

**Update an MstAspCompetency by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/mst-tags/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-tags/{id}`

**Delete an MstAspCompetency by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-tags/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

