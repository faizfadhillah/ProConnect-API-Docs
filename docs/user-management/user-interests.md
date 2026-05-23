---
sidebar_position: 13
---

# User Interests

Manage user interest tags for content and job recommendations.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-interests/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-interests` | Create a new UserInterest |
| <span class="method-badge method-patch">PATCH</span> | `/user-interests/{id}` | Update a UserInterest by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-interests/{id}` | Delete a UserInterest by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-interests/search`

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
curl -X GET "https://api.proconnectcareer.com/user-interests/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-interests`

**Create a new UserInterest**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `interest_id` | string | **Yes** | The id of the Interest |

#### Responses

**201** — The UserInterest has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user Interest |
| `user_id` | string | **Yes** | The ID of the user |
| `interest_id` | string | **Yes** | The ID of the Interest |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "interest_id": "<interest_id>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-interests" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "interest_id": "<interest_id>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-interests/{id}`

**Update a UserInterest by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserInterest has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user Interest |
| `user_id` | string | **Yes** | The ID of the user |
| `interest_id` | string | **Yes** | The ID of the Interest |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "interest_id": "<interest_id>"
}
```

</details>

**400** — Bad request.

**404** — UserInterest not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-interests/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-interests/{id}`

**Delete a UserInterest by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserInterest has been successfully deleted.

**404** — UserInterest not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-interests/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

