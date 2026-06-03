---
sidebar_position: 27
---

# Industries

Manage industry classifications for company categorization.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-industries/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-industries` | Create a new MstIndustry |
| <span class="method-badge method-post">POST</span> | `/mst-industries/import-xls` | MstIndustriesController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-industries/{id}` | Update a MstIndustry by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-industries/{id}` | Delete a MstIndustry by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-industries/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-industries/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-industries`

**Create a new MstIndustry**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the industry |

#### Responses

**201** — The MstIndustry has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the skill |
| `name` | string | **Yes** | The name of the industry |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-industries" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-industries/import-xls`

**MstIndustriesController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-industries/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-industries/{id}`

**Update a MstIndustry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The MstIndustry has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the skill |
| `name` | string | **Yes** | The name of the industry |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>"
}
```

</details>

**404** — MstIndustry not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-industries/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-industries/{id}`

**Delete a MstIndustry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstIndustry has been successfully deleted.

**404** — MstIndustry not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-industries/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

