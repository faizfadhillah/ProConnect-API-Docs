---
sidebar_position: 18
---

# Job Steps

Manage hiring pipeline steps for job postings. Job steps define the stages candidates go through during the application process.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/job-steps/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/job-steps/searchn` | Search JobSteps with filters |
| <span class="method-badge method-post">POST</span> | `/job-steps` | Create a new JobStep |
| <span class="method-badge method-patch">PATCH</span> | `/job-steps/{id}` | Update a JobStep |
| <span class="method-badge method-delete">DELETE</span> | `/job-steps/{id}` | Delete a JobStep by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/job-steps/search`

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
curl -X GET "https://api.proconnectcareer.com/job-steps/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/job-steps/searchn`

**Search JobSteps with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `jobId` | query | string | No | — |
| `type` | query | string | No | — |
| `stepName` | query | string | No | — |
| `stepOrder` | query | number | No | — |
| `status` | query | `string` enum: `PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED` | No | — |
| `notes` | query | string | No | — |
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
| `attributes` | query | object | No | — |

#### Responses

**200** — Returns the list of JobSteps matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/job-steps/searchn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/job-steps`

**Create a new JobStep**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `job_id` | string | **Yes** | The ID of the job this step belongs to |
| `type` | string | **Yes** | DETAIL_FULLFILLMENT, QUESTIONNAIRE, INTERVIEW |
| `step_name` | string | **Yes** | The name of the job step |
| `step_order` | number | **Yes** | The order of the step in the job |
| `description` | string | **Yes** | The description of the job step |
| `status` | `string` enum: `PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the job step |
| `notes` | string | No | Notes for the job step |
| `attributes` | object | **Yes** | Attributes for the job step in JSON format |

#### Responses

**201** — The JobStep has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the job step |
| `job_id` | string | **Yes** | The ID of the job this step belongs to |
| `type` | string | **Yes** | The type of the job step |
| `step_name` | string | **Yes** | The name of the job step |
| `step_order` | number | **Yes** | The order of the step in the job |
| `description` | string | **Yes** | Description for the job step |
| `status` | `string` enum: `PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the job step |
| `notes` | string | **Yes** | Notes for the job step |
| `attributes` | object | **Yes** | Attributes for the job step in JSON format |
| `questionnaires` | Questionnaire[] | **Yes** | — |
| `applicantJobSteps` | ApplicantJobStep[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "job_id": "<job_id>",
  "type": "<type>",
  "step_name": "<step_name>",
  "step_order": 0,
  "description": "<description>",
  "status": "PENDING",
  "notes": "<notes>",
  "attributes": {},
  "questionnaires": [],
  "applicantJobSteps": []
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/job-steps" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "<job_id>",
    "type": "<type>",
    "step_name": "<step_name>",
    "step_order": 0,
    "description": "<description>",
    "status": "PENDING",
    "notes": "<notes>",
    "attributes": {}
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/job-steps/{id}`

**Update a JobStep**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | string | **Yes** | DETAIL_FULLFILLMENT, QUESTIONNAIRE, INTERVIEW |
| `step_name` | string | **Yes** | The name of the job step |
| `step_order` | number | **Yes** | The order of the step in the job |
| `status` | `string` enum: `PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the job step |
| `attributes` | object | **Yes** | Attributes for the job step in JSON format |

#### Responses

**200** — The JobStep has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the job step |
| `job_id` | string | **Yes** | The ID of the job this step belongs to |
| `type` | string | **Yes** | The type of the job step |
| `step_name` | string | **Yes** | The name of the job step |
| `step_order` | number | **Yes** | The order of the step in the job |
| `description` | string | **Yes** | Description for the job step |
| `status` | `string` enum: `PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED` | **Yes** | The status of the job step |
| `notes` | string | **Yes** | Notes for the job step |
| `attributes` | object | **Yes** | Attributes for the job step in JSON format |
| `questionnaires` | Questionnaire[] | **Yes** | — |
| `applicantJobSteps` | ApplicantJobStep[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "job_id": "<job_id>",
  "type": "<type>",
  "step_name": "<step_name>",
  "step_order": 0,
  "description": "<description>",
  "status": "PENDING",
  "notes": "<notes>",
  "attributes": {},
  "questionnaires": [],
  "applicantJobSteps": []
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/job-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "<type>",
    "step_name": "<step_name>",
    "step_order": 0,
    "status": "PENDING",
    "attributes": {}
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/job-steps/{id}`

**Delete a JobStep by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The JobStep has been successfully deleted.

**404** — JobStep not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/job-steps/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

