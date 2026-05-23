---
sidebar_position: 49
---

# Interests

Manage the master list of interest categories for personalization.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-interests/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-interests` | Create a new MstInterest |
| <span class="method-badge method-post">POST</span> | `/mst-interests/import-xls` | MstInterestsController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-interests/{id}` | Update a MstInterest by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-interests/{id}` | Delete a MstInterest by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-interests/search`

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
curl -X GET "https://api.proconnectcareer.com/mst-interests/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-interests`

**Create a new MstInterest**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the skill |

#### Responses

**201** — The MstInterest has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the skill |
| `name` | string | **Yes** | The name of the interest |

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
curl -X POST "https://api.proconnectcareer.com/mst-interests" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-interests/import-xls`

**MstInterestsController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-interests/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-interests/{id}`

**Update a MstInterest by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The MstInterest has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the skill |
| `name` | string | **Yes** | The name of the interest |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "name": "<name>"
}
```

</details>

**404** — MstInterest not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-interests/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-interests/{id}`

**Delete a MstInterest by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The MstInterest has been successfully deleted.

**404** — MstInterest not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-interests/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

