---
sidebar_position: 6
---

# User Professions

Manage professional designations and occupation records for user profiles.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-professions/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-professions` | Create a new UserProfession |
| <span class="method-badge method-delete">DELETE</span> | `/user-professions/{id}` | Delete a UserProfession by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-professions/search`

**Search with filters**

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
curl -X GET "https://api.proconnectcareer.com/user-professions/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-professions`

**Create a new UserProfession**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `profession_id` | string | **Yes** | The id of the profession |

#### Responses

**201** — The UserProfession has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user profession |
| `user_id` | string | **Yes** | The ID of the user |
| `profession_id` | string | **Yes** | The ID of the profession |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "profession_id": "<profession_id>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-professions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "profession_id": "<profession_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-professions/{id}`

**Delete a UserProfession by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserProfession has been successfully deleted.

**404** — UserProfession not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-professions/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

