---
sidebar_position: 4
---

# User Educations

Manage education records including schools, degrees, majors, and graduation details for user profiles.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-educations/get-available-majors/{schoolId}` | Get available majors for a school |
| <span class="method-badge method-get">GET</span> | `/user-educations/need-approval` | Get educations by approval state (Admin only) |
| <span class="method-badge method-get">GET</span> | `/user-educations/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/user-educations/students` | Get students with verification status and filters |
| <span class="method-badge method-post">POST</span> | `/user-educations` | Create a new UserEducation |
| <span class="method-badge method-post">POST</span> | `/user-educations/sync-pending-students` | Sync pending student verifications to user educations for current user |
| <span class="method-badge method-patch">PATCH</span> | `/user-educations/{id}` | Update a UserEducation |
| <span class="method-badge method-patch">PATCH</span> | `/user-educations/{id}/approval` | Approve/reject verification (Admin only) |
| <span class="method-badge method-delete">DELETE</span> | `/user-educations/{id}` | Delete a UserEducation by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-educations/get-available-majors/{schoolId}`

**Get available majors for a school**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `schoolId` | path | string | **Yes** | School ID |

#### Responses

**200** — Returns array of available majors for the school

**400** — Bad Request - Invalid schoolId format

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-educations/get-available-majors/{schoolId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-educations/need-approval`

**Get educations by approval state (Admin only)**

Get educations filtered by approval state(s). Filters out educations from soft-deleted users.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page. Use -1 for no limit |
| `approval_state` | query | string[] | No | Filter by approval state(s). Must be an array. Defaults to [WAITING_APPROVAL] if not provided. |
| `school_id` | query | string | No | Filter by school ID |
| `major_id` | query | string | No | Filter by major ID |
| `student_id` | query | string | No | Filter by student ID (case-insensitive partial match) |

#### Responses

**200** — Returns paginated list of educations.

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

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-educations/need-approval" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-educations/search`

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
curl -X GET "https://api.proconnectcareer.com/user-educations/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-educations/students`

**Get students with verification status and filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `school_id` | query | string | No | Filter by school ID |
| `name` | query | string | No | Filter by user name (case-insensitive partial match) |
| `email` | query | string | No | Filter by user email (case-insensitive partial match) |
| `major_id` | query | string | No | Filter by major ID |
| `verification_status` | query | `string` enum: `VERIFIED`, `NEED_VERIFICATION`, `NOT_VERIFIED`, `EDUCATION_NOT_REGISTERED` | No | Filter by verification status |
| `account_status` | query | `string` enum: `JOINED`, `NOT_JOINED` | No | Filter by account status |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Returns paginated list of students with verification status

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

**400** — Bad request - invalid UUID format

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-educations/students" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-educations`

**Create a new UserEducation**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `school_id` | string | **Yes** | The ID of school_id is optional |
| `education_degree` | string | **Yes** | The name of education degree |
| `institution_name` | string | **Yes** | The name of the institution |
| `major` | string | **Yes** | The major of study |
| `major_id` | string | **Yes** | The ID of the major |
| `region_id` | string | No | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `start_date` | string | **Yes** | The start date of education |
| `end_date` | string | **Yes** | The end date of education |
| `is_current` | boolean | **Yes** | Whether this is the current education |
| `file_url` | string | **Yes** | The File Url Of Ijazah |
| `student_id` | string | **Yes** | The student id of the education |
| `certificate_number` | string | **Yes** | The certificate number of the education |
| `curriculum_year` | string | **Yes** | The curriculum year of the education |
| `diploma_level` | string | No | The diploma level |

#### Responses

**201** — The UserEducation has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user |
| `school_id` | string | **Yes** | The ID of school_id is optional |
| `education_degree` | string | **Yes** | The name of education degree |
| `institution_name` | string | **Yes** | The name of the institution |
| `major` | string | **Yes** | The major of study |
| `major_id` | string | **Yes** | The ID of the major |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `start_date` | string | **Yes** | The start date of education |
| `end_date` | string | **Yes** | The end date of education |
| `is_current` | boolean | **Yes** | Whether this is the current education |
| `description` | string | **Yes** | The description |
| `file_url` | string | **Yes** | The file attachment url |
| `student_id` | string | **Yes** | The student id of the education |
| `certificate_number` | string | **Yes** | The certificate number of the education |
| `curriculum_year` | string | **Yes** | The curriculum year of the education |
| `is_verified` | boolean | **Yes** | Status verifikasi education |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the education |
| `approval_by` | string | No | Who approved or rejected this education |
| `diploma_level` | string | No | The diploma level |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "school_id": "<school_id>",
  "education_degree": "<education_degree>",
  "institution_name": "<institution_name>",
  "major": "<major>",
  "major_id": "<major_id>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "start_date": "<start_date>",
  "end_date": "<end_date>",
  "is_current": true,
  "description": "<description>",
  "file_url": "<file_url>",
  "student_id": "<student_id>",
  "certificate_number": "<certificate_number>",
  "curriculum_year": "<curriculum_year>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>",
  "diploma_level": "<diploma_level>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-educations" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "school_id": "<school_id>",
    "education_degree": "<education_degree>",
    "institution_name": "<institution_name>",
    "major": "<major>",
    "major_id": "<major_id>",
    "region_id": "<region_id>",
    "is_outside_indo": true,
    "other_country": "<other_country>",
    "other_region": "<other_region>",
    "start_date": "<start_date>",
    "end_date": "<end_date>",
    "is_current": true,
    "file_url": "<file_url>",
    "student_id": "<student_id>",
    "certificate_number": "<certificate_number>",
    "curriculum_year": "<curriculum_year>",
    "diploma_level": "<diploma_level>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/user-educations/sync-pending-students`

**Sync pending student verifications to user educations for current user**

Syncs pending student data to user educations in database. Handles Case 2 (updates existing) and Case 3 (auto-inserts new). Only updates educations that are not verified. All updates are persisted to database.

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Returns sync result with updated, inserted, and skipped counts

**401** — Unauthorized

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-educations/sync-pending-students" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-educations/{id}`

**Update a UserEducation**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserEducation has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user |
| `school_id` | string | **Yes** | The ID of school_id is optional |
| `education_degree` | string | **Yes** | The name of education degree |
| `institution_name` | string | **Yes** | The name of the institution |
| `major` | string | **Yes** | The major of study |
| `major_id` | string | **Yes** | The ID of the major |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `start_date` | string | **Yes** | The start date of education |
| `end_date` | string | **Yes** | The end date of education |
| `is_current` | boolean | **Yes** | Whether this is the current education |
| `description` | string | **Yes** | The description |
| `file_url` | string | **Yes** | The file attachment url |
| `student_id` | string | **Yes** | The student id of the education |
| `certificate_number` | string | **Yes** | The certificate number of the education |
| `curriculum_year` | string | **Yes** | The curriculum year of the education |
| `is_verified` | boolean | **Yes** | Status verifikasi education |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the education |
| `approval_by` | string | No | Who approved or rejected this education |
| `diploma_level` | string | No | The diploma level |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "school_id": "<school_id>",
  "education_degree": "<education_degree>",
  "institution_name": "<institution_name>",
  "major": "<major>",
  "major_id": "<major_id>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "start_date": "<start_date>",
  "end_date": "<end_date>",
  "is_current": true,
  "description": "<description>",
  "file_url": "<file_url>",
  "student_id": "<student_id>",
  "certificate_number": "<certificate_number>",
  "curriculum_year": "<curriculum_year>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>",
  "diploma_level": "<diploma_level>"
}
```

</details>

**400** — Bad request.

**404** — UserEducation not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-educations/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-educations/{id}/approval`

**Approve/reject verification (Admin only)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | Approval state |

#### Responses

**200** — The UserEducation verification status has been updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `user_id` | string | **Yes** | The ID of the user |
| `school_id` | string | **Yes** | The ID of school_id is optional |
| `education_degree` | string | **Yes** | The name of education degree |
| `institution_name` | string | **Yes** | The name of the institution |
| `major` | string | **Yes** | The major of study |
| `major_id` | string | **Yes** | The ID of the major |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `start_date` | string | **Yes** | The start date of education |
| `end_date` | string | **Yes** | The end date of education |
| `is_current` | boolean | **Yes** | Whether this is the current education |
| `description` | string | **Yes** | The description |
| `file_url` | string | **Yes** | The file attachment url |
| `student_id` | string | **Yes** | The student id of the education |
| `certificate_number` | string | **Yes** | The certificate number of the education |
| `curriculum_year` | string | **Yes** | The curriculum year of the education |
| `is_verified` | boolean | **Yes** | Status verifikasi education |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the education |
| `approval_by` | string | No | Who approved or rejected this education |
| `diploma_level` | string | No | The diploma level |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "school_id": "<school_id>",
  "education_degree": "<education_degree>",
  "institution_name": "<institution_name>",
  "major": "<major>",
  "major_id": "<major_id>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "start_date": "<start_date>",
  "end_date": "<end_date>",
  "is_current": true,
  "description": "<description>",
  "file_url": "<file_url>",
  "student_id": "<student_id>",
  "certificate_number": "<certificate_number>",
  "curriculum_year": "<curriculum_year>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>",
  "diploma_level": "<diploma_level>"
}
```

</details>

**400** — Bad request.

**404** — UserEducation not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-educations/{id}/approval" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "approval_state": "WAITING_APPROVAL"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-educations/{id}`

**Delete a UserEducation by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserEducation has been successfully deleted.

**404** — UserEducation not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-educations/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

