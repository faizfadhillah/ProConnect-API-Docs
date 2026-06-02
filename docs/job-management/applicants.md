---
sidebar_position: 19
---

# Applicants

Manage job applicants, their applications, and tracking through the hiring pipeline.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/applicants/{id}` | Get applicant detail (includes skill_match) |
| <span class="method-badge method-get">GET</span> | `/applicants/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/applicants` | Create a new applicant |
| <span class="method-badge method-patch">PATCH</span> | `/applicants/{id}` | Update an applicant |
| <span class="method-badge method-patch">PATCH</span> | `/applicants/{jobId}/{userId}` | Update an applicant |
| <span class="method-badge method-delete">DELETE</span> | `/applicants/{id}` | Delete an applicant |
| <span class="method-badge method-delete">DELETE</span> | `/applicants/{jobId}/{userId}` | Delete an applicant |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/applicants/{id}`

**Get applicant detail (includes skill_match)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns applicant detail with skill_match.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `skill_match` | number | **Yes** | Skill match percentage between job and user. Returns -1 if no skills in job (FE should display as '- %') |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "skill_match": 0
}
```

</details>

**401** — Unauthorized

**404** — Applicant not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicants/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicants/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `age_start` | query | number | No | — |
| `age_end` | query | number | No | — |
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
curl -X GET "https://api.proconnectcareer.com/applicants/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/applicants`

**Create a new applicant**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `job_id` | string | **Yes** | The id of the job |
| `user_id` | string | **Yes** | The id of the user |
| `attributes` | object | **Yes** | Additional attributes in JSON format |
| `region_id` | string | **Yes** | The id of the region |
| `status` | `string` enum: `SAVED`, `NEED_REVIEW`, `CONNECT`, `PROCESS`, `SCHEDULE_INTERVIEW`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the application |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/applicants" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "<job_id>",
    "user_id": "<user_id>",
    "attributes": {},
    "region_id": "<region_id>",
    "status": "SAVED"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/applicants/{id}`

**Update an applicant**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `attributes` | object | **Yes** | Additional attributes in JSON format |
| `status` | `string` enum: `SAVED`, `NEED_REVIEW`, `CONNECT`, `PROCESS`, `SCHEDULE_INTERVIEW`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the application |
| `last_applicant_job_step_id` | string | **Yes** | The id of the last applicant job step |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/applicants/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "attributes": {},
    "status": "SAVED",
    "last_applicant_job_step_id": "<last_applicant_job_step_id>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/applicants/{jobId}/{userId}`

**Update an applicant**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `jobId` | path | string | **Yes** | — |
| `userId` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `attributes` | object | **Yes** | Additional attributes in JSON format |
| `status` | `string` enum: `SAVED`, `NEED_REVIEW`, `CONNECT`, `PROCESS`, `SCHEDULE_INTERVIEW`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the application |
| `last_applicant_job_step_id` | string | **Yes** | The id of the last applicant job step |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/applicants/{jobId}/{userId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "attributes": {},
    "status": "SAVED",
    "last_applicant_job_step_id": "<last_applicant_job_step_id>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/applicants/{id}`

**Delete an applicant**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/applicants/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-delete">DELETE</span> `/applicants/{jobId}/{userId}`

**Delete an applicant**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `jobId` | path | string | **Yes** | — |
| `userId` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/applicants/{jobId}/{userId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

