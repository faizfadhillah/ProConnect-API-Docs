---
sidebar_position: 62
---

# Questionnaire Answers

Manage submitted questionnaire responses and answer data.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/questionnaire-answers/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/questionnaire-answers/searchn` | Search QuestionnaireAnswers with filters |
| <span class="method-badge method-post">POST</span> | `/questionnaire-answers` | Create a new QuestionnaireAnswer |
| <span class="method-badge method-post">POST</span> | `/questionnaire-answers/bulk` | Create multiple QuestionnaireAnswers in bulk |
| <span class="method-badge method-patch">PATCH</span> | `/questionnaire-answers/{id}` | Update a QuestionnaireAnswer |
| <span class="method-badge method-patch">PATCH</span> | `/questionnaire-answers/bulk` | Update multiple QuestionnaireAnswers in bulk |
| <span class="method-badge method-delete">DELETE</span> | `/questionnaire-answers/{id}` | Delete a QuestionnaireAnswer by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/questionnaire-answers/search`

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
curl -X GET "https://api.proconnectcareer.com/questionnaire-answers/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/questionnaire-answers/searchn`

**Search QuestionnaireAnswers with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `questionnaireId` | query | string | No | — |
| `jobStepId` | query | string | No | — |
| `applicantStepId` | query | string | No | — |
| `no` | query | number | No | — |
| `type` | query | string | No | — |
| `question` | query | string | No | — |
| `options` | query | string | No | — |
| `value` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Returns the list of QuestionnaireAnswers matching the search criteria.

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/questionnaire-answers/searchn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/questionnaire-answers`

**Create a new QuestionnaireAnswer**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `questionnaire_id` | string | **Yes** | The id of the questionnaire |
| `job_step_id` | string | **Yes** | The id of the job step |
| `applicant_job_step_id` | string | **Yes** | The id of the applicant step |
| `job_id` | string | **Yes** | The id of the job |
| `no` | number | **Yes** | The question number |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The question text |
| `options` | object | **Yes** | The options for the question (JSON) |
| `value` | object | **Yes** | The answer value (JSON) |

#### Responses

**201** — The QuestionnaireAnswer has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the questionnaire answer |
| `questionnaire_id` | string | **Yes** | The ID of the questionnaire |
| `job_step_id` | string | **Yes** | The ID of the job step |
| `job_id` | string | **Yes** | The ID of the job |
| `applicant_job_step_id` | string | **Yes** | The ID of the applicant step |
| `applicant_id` | string | **Yes** | The ID of the applicant |
| `no` | number | **Yes** | The question number |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The question text |
| `options` | object | **Yes** | The options for the question (JSON) |
| `is_required` | boolean | **Yes** | Whether the question is required |
| `value` | object | **Yes** | The answer value (JSON) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "questionnaire_id": "<questionnaire_id>",
  "job_step_id": "<job_step_id>",
  "job_id": "<job_id>",
  "applicant_job_step_id": "<applicant_job_step_id>",
  "applicant_id": "<applicant_id>",
  "no": 0,
  "type": "<type>",
  "question": "<question>",
  "options": {},
  "is_required": true,
  "value": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/questionnaire-answers" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questionnaire_id": "<questionnaire_id>",
    "job_step_id": "<job_step_id>",
    "applicant_job_step_id": "<applicant_job_step_id>",
    "job_id": "<job_id>",
    "no": 0,
    "type": "<type>",
    "question": "<question>",
    "options": {},
    "value": {}
  }'
```

---

### <span class="method-badge method-post">POST</span> `/questionnaire-answers/bulk`

**Create multiple QuestionnaireAnswers in bulk**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | object[] | **Yes** | Array of questionnaire answers to create |

#### Responses

**201** — The QuestionnaireAnswers have been successfully created.

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/questionnaire-answers/bulk" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": []
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/questionnaire-answers/{id}`

**Update a QuestionnaireAnswer**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The QuestionnaireAnswer has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the questionnaire answer |
| `questionnaire_id` | string | **Yes** | The ID of the questionnaire |
| `job_step_id` | string | **Yes** | The ID of the job step |
| `job_id` | string | **Yes** | The ID of the job |
| `applicant_job_step_id` | string | **Yes** | The ID of the applicant step |
| `applicant_id` | string | **Yes** | The ID of the applicant |
| `no` | number | **Yes** | The question number |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The question text |
| `options` | object | **Yes** | The options for the question (JSON) |
| `is_required` | boolean | **Yes** | Whether the question is required |
| `value` | object | **Yes** | The answer value (JSON) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "questionnaire_id": "<questionnaire_id>",
  "job_step_id": "<job_step_id>",
  "job_id": "<job_id>",
  "applicant_job_step_id": "<applicant_job_step_id>",
  "applicant_id": "<applicant_id>",
  "no": 0,
  "type": "<type>",
  "question": "<question>",
  "options": {},
  "is_required": true,
  "value": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/questionnaire-answers/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-patch">PATCH</span> `/questionnaire-answers/bulk`

**Update multiple QuestionnaireAnswers in bulk**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | object[] | **Yes** | Array of questionnaire answers to update |

#### Responses

**200** — The QuestionnaireAnswers have been successfully updated.

**400** — Bad request.

**404** — One or more QuestionnaireAnswers not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/questionnaire-answers/bulk" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": []
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/questionnaire-answers/{id}`

**Delete a QuestionnaireAnswer by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The QuestionnaireAnswer has been successfully deleted.

**404** — QuestionnaireAnswer not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/questionnaire-answers/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

