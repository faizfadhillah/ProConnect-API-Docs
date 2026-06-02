---
sidebar_position: 42
---

# Professions

Manage the master list of professions and occupational categories.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-professions/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-professions` | Create a new MstProfession |
| <span class="method-badge method-post">POST</span> | `/mst-professions/import-xls` | MstProfessionsController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-professions/{id}` | Update a MstProfession |
| <span class="method-badge method-delete">DELETE</span> | `/mst-professions/{id}` | Delete a MstProfession by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-professions/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-professions/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-professions`

**Create a new MstProfession**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parent_id` | string | No | The id of the parent profession (optional) |
| `level` | number | **Yes** | The level of the profession |
| `name` | string | **Yes** | The name of the profession |
| `tags` | string | **Yes** | The tag of the profession |

#### Responses

**201** — The MstProfession has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the profession |
| `parent_id` | string | **Yes** | The ID of the parent profession |
| `level` | number | **Yes** | The level of the profession |
| `name` | string | **Yes** | The name of the profession |
| `tags` | string | **Yes** | The tags of the profession |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "parent_id": "<parent_id>",
  "level": 0,
  "name": "<name>",
  "tags": "<tags>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-professions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "parent_id": "<parent_id>",
    "level": 0,
    "name": "<name>",
    "tags": "<tags>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-professions/import-xls`

**MstProfessionsController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-professions/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-professions/{id}`

**Update a MstProfession**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The MstProfession has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the profession |
| `parent_id` | string | **Yes** | The ID of the parent profession |
| `level` | number | **Yes** | The level of the profession |
| `name` | string | **Yes** | The name of the profession |
| `tags` | string | **Yes** | The tags of the profession |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "parent_id": "<parent_id>",
  "level": 0,
  "name": "<name>",
  "tags": "<tags>"
}
```

</details>

**400** — Bad request.

**404** — MstProfession not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-professions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-professions/{id}`

**Delete a MstProfession by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstProfession has been successfully deleted.

**404** — MstProfession not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-professions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

