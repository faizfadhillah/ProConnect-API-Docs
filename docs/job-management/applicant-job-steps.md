---
sidebar_position: 22
---

# Applicant Job Steps

Manage the relationship between applicants and job pipeline steps, tracking status through each stage.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/applicant-job-steps/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/applicant-job-steps/searchn` | Search ApplicantJobSteps with filters |
| <span class="method-badge method-post">POST</span> | `/applicant-job-steps` | Create a new ApplicantJobStep |
| <span class="method-badge method-patch">PATCH</span> | `/applicant-job-steps/{id}` | Update an existing ApplicantJobStep |
| <span class="method-badge method-delete">DELETE</span> | `/applicant-job-steps/{id}` | Delete a ApplicantJobStep by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/applicant-job-steps/search`

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
| `options` | query | object | No | — |
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
curl -X GET "https://api.proconnectcareer.com/applicant-job-steps/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicant-job-steps/searchn`

**Search ApplicantJobSteps with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `applicantId` | query | string | No | — |
| `jobStepId` | query | string | No | — |
| `status` | query | `string` enum: `PENDING`, `CURRENT`, `REVISED`, `ACCEPTED`, `SCHEDULED`, `RESCHEDULED`, `FAILED`, `SUBMITTED`, `SKIPPED` | No | — |
| `notes` | query | string | No | — |
| `attributes` | query | string | No | — |
| `createdAtStart` | query | string | No | — |
| `createdAtEnd` | query | string | No | — |
| `createdBy` | query | string | No | — |
| `updatedAtStart` | query | string | No | — |
| `updatedAtEnd` | query | string | No | — |
| `updatedBy` | query | string | No | — |
| `deletedAtStart` | query | string | No | — |
| `deletedAtEnd` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Returns the list of ApplicantJobSteps matching the search criteria.

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicant-job-steps/searchn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/applicant-job-steps`

**Create a new ApplicantJobStep**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicant_id` | string | **Yes** | The id of the applicant |
| `job_step_id` | string | **Yes** | The id of the job step |
| `status` | `string` enum: `PENDING`, `CURRENT`, `REVISED`, `ACCEPTED`, `SCHEDULED`, `RESCHEDULED`, `FAILED`, `SUBMITTED`, `SKIPPED` | **Yes** | The status of the applicant job step |
| `notes` | string | No | Notes for the applicant job step |
| `attributes` | object | No | Attributes for the applicant job step |

#### Responses

**201** — The ApplicantJobStep has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `applicant_id` | string | **Yes** | The ID of the applicant |
| `job_step_id` | string | **Yes** | The ID of the job step |
| `job_id` | string | **Yes** | The ID of the job |
| `user_id` | string | **Yes** | The ID of the user |
| `status` | `string` enum: `PENDING`, `CURRENT`, `REVISED`, `ACCEPTED`, `SCHEDULED`, `RESCHEDULED`, `FAILED`, `SUBMITTED`, `SKIPPED` | **Yes** | The status of the applicant job step |
| `notes` | string | **Yes** | Notes for the applicant job step |
| `attributes` | object | **Yes** | Attributes for the applicant job step |
| `questionnaireAnswers` | QuestionnaireAnswer[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "applicant_id": "<applicant_id>",
  "job_step_id": "<job_step_id>",
  "job_id": "<job_id>",
  "user_id": "<user_id>",
  "status": "PENDING",
  "notes": "<notes>",
  "attributes": {},
  "questionnaireAnswers": []
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/applicant-job-steps" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "applicant_id": "<applicant_id>",
    "job_step_id": "<job_step_id>",
    "status": "PENDING",
    "notes": "<notes>",
    "attributes": {}
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/applicant-job-steps/{id}`

**Update an existing ApplicantJobStep**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | `string` enum: `PENDING`, `CURRENT`, `REVISED`, `ACCEPTED`, `SCHEDULED`, `RESCHEDULED`, `FAILED`, `SUBMITTED`, `SKIPPED` | No | The status of the applicant job step |
| `notes` | string | No | Notes for the applicant job step |
| `attributes` | object | No | Attributes for the applicant job step |

#### Responses

**200** — The ApplicantJobStep has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `applicant_id` | string | **Yes** | The ID of the applicant |
| `job_step_id` | string | **Yes** | The ID of the job step |
| `job_id` | string | **Yes** | The ID of the job |
| `user_id` | string | **Yes** | The ID of the user |
| `status` | `string` enum: `PENDING`, `CURRENT`, `REVISED`, `ACCEPTED`, `SCHEDULED`, `RESCHEDULED`, `FAILED`, `SUBMITTED`, `SKIPPED` | **Yes** | The status of the applicant job step |
| `notes` | string | **Yes** | Notes for the applicant job step |
| `attributes` | object | **Yes** | Attributes for the applicant job step |
| `questionnaireAnswers` | QuestionnaireAnswer[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "applicant_id": "<applicant_id>",
  "job_step_id": "<job_step_id>",
  "job_id": "<job_id>",
  "user_id": "<user_id>",
  "status": "PENDING",
  "notes": "<notes>",
  "attributes": {},
  "questionnaireAnswers": []
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/applicant-job-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PENDING",
    "notes": "<notes>",
    "attributes": {}
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/applicant-job-steps/{id}`

**Delete a ApplicantJobStep by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The ApplicantJobStep has been successfully deleted.

**404** — ApplicantJobStep not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/applicant-job-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

