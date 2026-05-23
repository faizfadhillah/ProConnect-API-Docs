---
sidebar_position: 10
---

# User Skill Passports

Manage user skill passports — verified skill portfolios for professional credentialing.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-skill-passports/{id}` | Get a UserSkillPassport by ID |
| <span class="method-badge method-get">GET</span> | `/user-skill-passports/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-skill-passports` | Create a new UserSkillPassport |
| <span class="method-badge method-patch">PATCH</span> | `/user-skill-passports/{id}` | Update a UserSkillPassport |
| <span class="method-badge method-delete">DELETE</span> | `/user-skill-passports/{id}` | Delete a UserSkillPassport |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-skill-passports/{id}`

**Get a UserSkillPassport by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the UserSkillPassport.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user who owns this SkillPassport |
| `number` | string | **Yes** | The number of the license or SkillPassport |
| `file_url` | string | **Yes** | The file that issued the SkillPassport |
| `status` | `string` enum: `UNVERIFIED`, `PROCESS`, `VERIFIED`, `REJECTED` | No | Status od SkillPassport |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "number": "<number>",
  "file_url": "<file_url>",
  "status": "UNVERIFIED"
}
```

</details>

**404** — UserSkillPassport not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-skill-passports/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-skill-passports/search`

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
curl -X GET "https://api.proconnectcareer.com/user-skill-passports/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-skill-passports`

**Create a new UserSkillPassport**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user who owns the SkillPassport |
| `number` | string | **Yes** | The number of the license or SkillPassport |
| `file_url` | string | **Yes** | The file that issued the SkillPassport |
| `status` | `string` enum: `UNVERIFIED`, `PROCESS`, `VERIFIED`, `REJECTED` | No | Status od SkillPassport |

#### Responses

**201** — The UserSkillPassport has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user who owns this SkillPassport |
| `number` | string | **Yes** | The number of the license or SkillPassport |
| `file_url` | string | **Yes** | The file that issued the SkillPassport |
| `status` | `string` enum: `UNVERIFIED`, `PROCESS`, `VERIFIED`, `REJECTED` | No | Status od SkillPassport |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "number": "<number>",
  "file_url": "<file_url>",
  "status": "UNVERIFIED"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-skill-passports" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "number": "<number>",
    "file_url": "<file_url>",
    "status": "UNVERIFIED"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-skill-passports/{id}`

**Update a UserSkillPassport**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserSkillPassport has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user who owns this SkillPassport |
| `number` | string | **Yes** | The number of the license or SkillPassport |
| `file_url` | string | **Yes** | The file that issued the SkillPassport |
| `status` | `string` enum: `UNVERIFIED`, `PROCESS`, `VERIFIED`, `REJECTED` | No | Status od SkillPassport |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "number": "<number>",
  "file_url": "<file_url>",
  "status": "UNVERIFIED"
}
```

</details>

**400** — Bad request.

**404** — UserSkillPassport not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-skill-passports/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-skill-passports/{id}`

**Delete a UserSkillPassport**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserSkillPassport has been successfully deleted.

**404** — UserSkillPassport not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-skill-passports/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

