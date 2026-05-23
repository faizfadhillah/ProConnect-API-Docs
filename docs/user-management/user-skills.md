---
sidebar_position: 8
---

# User Skills

Manage skills associated with user profiles, enabling skill-based job matching.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-skills/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-skills` | Create a new UserSkill |
| <span class="method-badge method-patch">PATCH</span> | `/user-skills/{id}` | Update a UserSkill by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-skills/{id}` | Delete a UserSkill by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-skills/search`

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
| `isExcel` | query | string | **Yes** | — |
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
curl -X GET "https://api.proconnectcareer.com/user-skills/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-skills`

**Create a new UserSkill**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `skill_id` | string | **Yes** | The id of the skill |

#### Responses

**201** — The UserSkill has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user skill |
| `user_id` | string | **Yes** | The ID of the user |
| `skill_id` | string | **Yes** | The ID of the skill |
| `is_verified` | boolean | **Yes** | Status verifikasi skill |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the skill |
| `approval_by` | string | No | Who approved or rejected this skill |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "skill_id": "<skill_id>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-skills" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "skill_id": "<skill_id>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-skills/{id}`

**Update a UserSkill by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserSkill has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user skill |
| `user_id` | string | **Yes** | The ID of the user |
| `skill_id` | string | **Yes** | The ID of the skill |
| `is_verified` | boolean | **Yes** | Status verifikasi skill |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the skill |
| `approval_by` | string | No | Who approved or rejected this skill |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "skill_id": "<skill_id>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>"
}
```

</details>

**400** — Bad request.

**404** — UserSkill not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-skills/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-skills/{id}`

**Delete a UserSkill by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserSkill has been successfully deleted.

**404** — UserSkill not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-skills/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

