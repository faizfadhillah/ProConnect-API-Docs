---
sidebar_position: 17
---

# Jobs

Manage job postings including creation, updates, search, and lifecycle management. Jobs are the core entity connecting companies with candidates.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/jobs` | Get all jobs |
| <span class="method-badge method-get">GET</span> | `/jobs/{id}` | Get a job by ID |
| <span class="method-badge method-get">GET</span> | `/jobs/public` | Get public jobs list by company |
| <span class="method-badge method-get">GET</span> | `/jobs/public/all` | Get public jobs across all companies (paginated) |
| <span class="method-badge method-get">GET</span> | `/jobs/public/slug/{slug}` | Get a published job by slug (public, no auth) |
| <span class="method-badge method-get">GET</span> | `/jobs/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/jobs/trigger-auto-close` | Trigger auto-close (superadmin only) |
| <span class="method-badge method-get">GET</span> | `/jobs/trigger-auto-publish` | Trigger auto-publish (superadmin only) |
| <span class="method-badge method-post">POST</span> | `/jobs` | Create a new job |
| <span class="method-badge method-patch">PATCH</span> | `/jobs/{id}` | Update a job by ID |
| <span class="method-badge method-delete">DELETE</span> | `/jobs/{id}` | Delete a job by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/jobs`

**Get all jobs**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/{id}`

**Get a job by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/public`

**Get public jobs list by company**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `company_id` | query | string | **Yes** | — |
| `status` | query | `string` enum: `DRAFT`, `PUBLISH`, `CLOSE` | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Public jobs list.

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/public" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/public/all`

**Get public jobs across all companies (paginated)**

Public endpoint used by the landing-site jobs board. Returns published jobs across all companies with pagination. Default limit 10, max 50.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `status` | query | `string` enum: `DRAFT`, `PUBLISH`, `CLOSE` | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Public jobs list across all companies.

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/public/all" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/public/slug/{slug}`

**Get a published job by slug (public, no auth)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `slug` | path | string | **Yes** | — |

#### Responses

**200** — Public job view.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | Job ID |
| `company_id` | string | **Yes** | Company ID that owns the job |
| `status` | `string` enum: `DRAFT`, `PUBLISH`, `CLOSE` | **Yes** | Job status: DRAFT, PUBLISH, CLOSE |
| `title` | string | **Yes** | Job title |
| `slug` | string | **Yes** | URL-friendly slug (used by GET /jobs/public/slug/:slug) |
| `location` | string | **Yes** | Job location (region full name or other_region + other_country for outside Indonesia) |
| `company_name` | string | **Yes** | Company brand name |
| `company_logo_url` | string | **Yes** | Company logo URL (relative or absolute) |
| `description` | string | **Yes** | Job description |
| `employment_status` | string[] | **Yes** | Employment type(s): full-time, part-time, contract, etc. |
| `domicile_status` | string[] | **Yes** | Work arrangement: on-site, remote, hybrid, etc. |
| `open_date` | string | No | Date when the job is automatically published (optional). Date-only (YYYY-MM-DD) in GMT+7 (WIB). |
| `close_date` | string | No | Date when the job is automatically closed (optional). Date-only (YYYY-MM-DD) in GMT+7 (WIB). |
| `created_at` | string | **Yes** | When the job was created (ISO 8601) |
| `updated_at` | string | **Yes** | When the job was last updated (ISO 8601) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "company_id": "<company_id>",
  "status": "DRAFT",
  "title": "<title>",
  "slug": "<slug>",
  "location": "<location>",
  "company_name": "<company_name>",
  "company_logo_url": "<company_logo_url>",
  "description": "<description>",
  "employment_status": [],
  "domicile_status": [],
  "open_date": "<open_date>",
  "close_date": "<close_date>",
  "created_at": "<created_at>",
  "updated_at": "<updated_at>"
}
```

</details>

**404** — Job not found or not published.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/public/slug/{slug}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/search`

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
| `isApplicantCount` | query | boolean | **Yes** | — |
| `isCalculateSkillMatch` | query | boolean | No | Calculate skill match for each job (PoV Candidate) |
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
curl -X GET "https://api.proconnectcareer.com/jobs/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/trigger-auto-close`

**Trigger auto-close (superadmin only)**

Runs the same logic as the daily cron: close jobs with close_date passed (1-day buffer).

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Auto-close run triggered.

**403** — Forbidden. Superadmin only.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/trigger-auto-close" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/jobs/trigger-auto-publish`

**Trigger auto-publish (superadmin only)**

Runs the same logic as the daily cron: publish jobs with open_date &lt;= today 00:00 GMT+7.

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Auto-publish run triggered.

**403** — Forbidden. Superadmin only.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/jobs/trigger-auto-publish" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/jobs`

**Create a new job**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `company_id` | string | **Yes** | The ID of the company offering the job |
| `title` | string | **Yes** | The title of the job position |
| `description` | string | **Yes** | Detailed description of the job |
| `region_id` | string | **Yes** | The ID of the region where the job is located |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `salary_pay_interval` | string | **Yes** | The salary pay interval |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `min_salary` | number | **Yes** | The min of the SalaryCountry |
| `max_salary` | number | **Yes** | The max of the SalaryCountry |
| `status` | `string` enum: `DRAFT`, `PUBLISH`, `CLOSE` | No | the status of jobs |
| `employment_status` | string[] | **Yes** | The employment status |
| `domicile_status` | string[] | **Yes** | The domicile status |
| `interest_ids` | string[] | **Yes** | The multi interest id includes |
| `skill_ids` | string[] | **Yes** | The multi skill id includes |
| `profession_ids` | string[] | **Yes** | The multi profession id includes |
| `right_to_work_ids` | string[] | **Yes** | The multi right_to_work id includes |
| `language_ids` | string[] | **Yes** | The mastered languages |
| `config` | object | **Yes** | Additional configuration for the job |
| `open_date` | string | No | Date when the job is automatically published (optional). Date-only format (YYYY-MM-DD) in GMT+7 (WIB) timezone, interpreted as 00:00 GMT+7. |
| `close_date` | string | No | Date when the job is automatically closed (optional). Min D+1 (not today). Date-only format (YYYY-MM-DD) in GMT+7 (WIB) timezone, interpreted as 00:00 GMT+7. |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/jobs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "<company_id>",
    "title": "<title>",
    "description": "<description>",
    "region_id": "<region_id>",
    "is_outside_indo": true,
    "other_country": "<other_country>",
    "other_region": "<other_region>",
    "salary_pay_interval": "<salary_pay_interval>",
    "salary_country_id": "<salary_country_id>",
    "min_salary": 0,
    "max_salary": 0,
    "status": "DRAFT",
    "employment_status": [],
    "domicile_status": [],
    "interest_ids": [],
    "skill_ids": [],
    "profession_ids": [],
    "right_to_work_ids": [],
    "language_ids": [],
    "config": {},
    "open_date": "<open_date>",
    "close_date": "<close_date>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/jobs/{id}`

**Update a job by ID**

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
curl -X PATCH "https://api.proconnectcareer.com/jobs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/jobs/{id}`

**Delete a job by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/jobs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

