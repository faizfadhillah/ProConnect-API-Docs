---
sidebar_position: 9
---

# User Career History

Manage career history and work experience records for user profiles.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-career-history/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-career-history` | Create a new UserCareerHistory |
| <span class="method-badge method-patch">PATCH</span> | `/user-career-history/{id}` | Update a UserCareerHistory |
| <span class="method-badge method-delete">DELETE</span> | `/user-career-history/{id}` | Delete a UserCareerHistory |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-career-history/search`

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
curl -X GET "https://api.proconnectcareer.com/user-career-history/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-career-history`

**Create a new UserCareerHistory**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `company_name` | string | **Yes** | The name of the company |
| `profession_id` | string | **Yes** | The profession_id of the mst-professions |
| `job_title` | string | **Yes** | The job title |
| `start_date` | string | **Yes** | The start date of the job |
| `end_date` | string | **Yes** | The end date of the job |
| `is_current` | boolean | **Yes** | Whether this is the current job |
| `job_description` | string | **Yes** | The job description |

#### Responses

**201** — The UserCareerHistory has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The identifier of the user |
| `company_name` | string | **Yes** | The name of the company |
| `profession_id` | string | **Yes** | The profession id from mst_profession |
| `job_title` | string | **Yes** | The other job title  |
| `start_date` | string | **Yes** | The start date of the job |
| `end_date` | string | **Yes** | The end date of the job |
| `is_current` | boolean | **Yes** | Whether this is the current job |
| `job_description` | string | **Yes** | The job description |
| `achievement_history` | object | **Yes** | Achievement |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "company_name": "<company_name>",
  "profession_id": "<profession_id>",
  "job_title": "<job_title>",
  "start_date": "<start_date>",
  "end_date": "<end_date>",
  "is_current": true,
  "job_description": "<job_description>",
  "achievement_history": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-career-history" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "company_name": "<company_name>",
    "profession_id": "<profession_id>",
    "job_title": "<job_title>",
    "start_date": "<start_date>",
    "end_date": "<end_date>",
    "is_current": true,
    "job_description": "<job_description>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-career-history/{id}`

**Update a UserCareerHistory**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserCareerHistory has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The identifier of the user |
| `company_name` | string | **Yes** | The name of the company |
| `profession_id` | string | **Yes** | The profession id from mst_profession |
| `job_title` | string | **Yes** | The other job title  |
| `start_date` | string | **Yes** | The start date of the job |
| `end_date` | string | **Yes** | The end date of the job |
| `is_current` | boolean | **Yes** | Whether this is the current job |
| `job_description` | string | **Yes** | The job description |
| `achievement_history` | object | **Yes** | Achievement |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "company_name": "<company_name>",
  "profession_id": "<profession_id>",
  "job_title": "<job_title>",
  "start_date": "<start_date>",
  "end_date": "<end_date>",
  "is_current": true,
  "job_description": "<job_description>",
  "achievement_history": {}
}
```

</details>

**400** — Bad request.

**404** — UserCareerHistory not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-career-history/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-career-history/{id}`

**Delete a UserCareerHistory**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserCareerHistory has been successfully deleted.

**404** — UserCareerHistory not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-career-history/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

