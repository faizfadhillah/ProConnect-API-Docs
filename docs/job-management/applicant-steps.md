---
sidebar_position: 20
---

# Applicant Steps

Manage individual applicant progress through hiring pipeline steps.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/applicant-steps` | Get all applicant steps |
| <span class="method-badge method-get">GET</span> | `/applicant-steps/{id}` | Get an applicant step by applicant ID |
| <span class="method-badge method-get">GET</span> | `/applicant-steps/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/applicant-steps` | Create a new applicant step |
| <span class="method-badge method-patch">PATCH</span> | `/applicant-steps/{id}` | Update an applicant step |
| <span class="method-badge method-delete">DELETE</span> | `/applicant-steps/{id}` | Delete an applicant step |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/applicant-steps`

**Get all applicant steps**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicant-steps" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicant-steps/{id}`

**Get an applicant step by applicant ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicant-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicant-steps/search`

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
curl -X GET "https://api.proconnectcareer.com/applicant-steps/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/applicant-steps`

**Create a new applicant step**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicantId` | string | **Yes** | The ID of the applicant |
| `step_name` | string | **Yes** | The name of the step |
| `step_order` | number | **Yes** | The order of the step |
| `status` | `string` enum: `pending`, `in_progress`, `completed`, `rejected`, `on_hold` | **Yes** | The status of the step |
| `notes` | string | No | Additional notes for the step |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/applicant-steps" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "applicantId": "<applicantId>",
    "step_name": "<step_name>",
    "step_order": 0,
    "status": "pending",
    "notes": "<notes>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/applicant-steps/{id}`

**Update an applicant step**

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
curl -X PATCH "https://api.proconnectcareer.com/applicant-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/applicant-steps/{id}`

**Delete an applicant step**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/applicant-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

