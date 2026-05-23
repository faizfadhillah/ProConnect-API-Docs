---
sidebar_position: 61
---

# Questionnaires

Manage questionnaire templates for assessments and surveys.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/questionnaires/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/questionnaires/searchn` | Search Questionnaires with filters |
| <span class="method-badge method-post">POST</span> | `/questionnaires` | Create a new Questionnaire |
| <span class="method-badge method-patch">PATCH</span> | `/questionnaires/{id}` | Update an existing Questionnaire |
| <span class="method-badge method-delete">DELETE</span> | `/questionnaires/{id}` | Delete a Questionnaire by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/questionnaires/search`

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
curl -X GET "https://api.proconnectcareer.com/questionnaires/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/questionnaires/searchn`

**Search Questionnaires with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `jobStepId` | query | string | No | — |
| `no` | query | number | No | — |
| `type` | query | string | No | — |
| `question` | query | string | No | — |
| `options` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Returns the list of Questionnaires matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/questionnaires/searchn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/questionnaires`

**Create a new Questionnaire**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `job_step_id` | string | **Yes** | The id of the job step |
| `no` | number | **Yes** | The number of the question |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The question text |
| `options` | object | **Yes** | The options for the question in JSON format |
| `is_required` | boolean | **Yes** | Whether the question is required |

#### Responses

**201** — The Questionnaire has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the questionnaire |
| `job_step_id` | string | **Yes** | The ID of the job step this questionnaire belongs to |
| `no` | number | **Yes** | The number of the question in the questionnaire |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The text of the question |
| `options` | object | **Yes** | The options for the question in JSON format |
| `is_required` | boolean | **Yes** | Whether the question is required |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "job_step_id": "<job_step_id>",
  "no": 0,
  "type": "<type>",
  "question": "<question>",
  "options": {},
  "is_required": true
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/questionnaires" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "job_step_id": "<job_step_id>",
    "no": 0,
    "type": "<type>",
    "question": "<question>",
    "options": {},
    "is_required": true
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/questionnaires/{id}`

**Update an existing Questionnaire**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The Questionnaire has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the questionnaire |
| `job_step_id` | string | **Yes** | The ID of the job step this questionnaire belongs to |
| `no` | number | **Yes** | The number of the question in the questionnaire |
| `type` | string | **Yes** | The type of the question |
| `question` | string | **Yes** | The text of the question |
| `options` | object | **Yes** | The options for the question in JSON format |
| `is_required` | boolean | **Yes** | Whether the question is required |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "job_step_id": "<job_step_id>",
  "no": 0,
  "type": "<type>",
  "question": "<question>",
  "options": {},
  "is_required": true
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/questionnaires/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/questionnaires/{id}`

**Delete a Questionnaire by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The Questionnaire has been successfully deleted.

**404** — Questionnaire not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/questionnaires/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

