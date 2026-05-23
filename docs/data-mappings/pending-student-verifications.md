---
sidebar_position: 56
---

# Pending Student Verifications

Manage student verification requests awaiting approval for educational credential validation.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/pending-student-verifications/search` | Search pending student verifications (not-found buffer) |
| <span class="method-badge method-get">GET</span> | `/pending-student-verifications/template` | Download Excel template for pending student verifications |
| <span class="method-badge method-post">POST</span> | `/pending-student-verifications` | Create pending student verification (upload/admin only) |
| <span class="method-badge method-post">POST</span> | `/pending-student-verifications/import` | Import pending student verifications from Excel (student_id, school_name) |
| <span class="method-badge method-patch">PATCH</span> | `/pending-student-verifications/{id}` | Update pending student verification |
| <span class="method-badge method-delete">DELETE</span> | `/pending-student-verifications/{id}` | Delete pending student verification by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/pending-student-verifications/search`

**Search pending student verifications (not-found buffer)**

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

**200** — Returns the list of pending student verifications.

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
curl -X GET "https://api.proconnectcareer.com/pending-student-verifications/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/pending-student-verifications/template`

**Download Excel template for pending student verifications**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Excel template file

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/pending-student-verifications/template" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/pending-student-verifications`

**Create pending student verification (upload/admin only)**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `student_id` | string | **Yes** | Student identifier (unique per school) |
| `school_id` | string | **Yes** | School ID |
| `full_name` | string | No | Full name (optional) |
| `photo_url` | string | No | Photo URL (optional) |
| `email` | string | No | Email (optional) |
| `phone_num` | string | No | Phone number (optional) |
| `major` | string | No | Major (optional) |
| `major_id` | string | No | Major ID (optional) |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3) |

#### Responses

**201** — Success

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `student_id` | string | **Yes** | Student identifier (unique per school) |
| `school_id` | string | **Yes** | School ID (must not be null) |
| `full_name` | string | No | Full name (if provided at upload) |
| `photo_url` | string | No | Photo URL (if provided at upload) |
| `email` | string | No | Email (if provided at upload) |
| `phone_num` | string | No | Phone number (if provided at upload) |
| `major` | string | No | Major (optional) |
| `major_id` | string | No | Major ID (optional) |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "student_id": "<student_id>",
  "school_id": "<school_id>",
  "full_name": "<full_name>",
  "photo_url": "<photo_url>",
  "email": "<email>",
  "phone_num": "<phone_num>",
  "major": "<major>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>"
}
```

</details>

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/pending-student-verifications" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "<student_id>",
    "school_id": "<school_id>",
    "full_name": "<full_name>",
    "photo_url": "<photo_url>",
    "email": "<email>",
    "phone_num": "<phone_num>",
    "major": "<major>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/pending-student-verifications/import`

**Import pending student verifications from Excel (student_id, school_name)**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Import result summary

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/pending-student-verifications/import" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/pending-student-verifications/{id}`

**Update pending student verification**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `student_id` | string | No | Student identifier (unique per school) |
| `school_id` | string | No | School ID |
| `full_name` | string | No | Full name (optional) |
| `photo_url` | string | No | Photo URL (optional) |
| `email` | string | No | Email (optional) |
| `phone_num` | string | No | Phone number (optional) |
| `major` | string | No | Major (optional) |
| `major_id` | string | No | Major ID (optional) |
| `degree` | string | No | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3) |

#### Responses

**200** — Success

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `student_id` | string | **Yes** | Student identifier (unique per school) |
| `school_id` | string | **Yes** | School ID (must not be null) |
| `full_name` | string | No | Full name (if provided at upload) |
| `photo_url` | string | No | Photo URL (if provided at upload) |
| `email` | string | No | Email (if provided at upload) |
| `phone_num` | string | No | Phone number (if provided at upload) |
| `major` | string | No | Major (optional) |
| `major_id` | string | No | Major ID (optional) |
| `degree` | string | **Yes** | Education Degree |
| `diploma_level` | string | No | Diploma Level (e.g., L1, L2, L3) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "student_id": "<student_id>",
  "school_id": "<school_id>",
  "full_name": "<full_name>",
  "photo_url": "<photo_url>",
  "email": "<email>",
  "phone_num": "<phone_num>",
  "major": "<major>",
  "major_id": "<major_id>",
  "degree": "<degree>",
  "diploma_level": "<diploma_level>"
}
```

</details>

**404** — Not found

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/pending-student-verifications/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "<student_id>",
    "school_id": "<school_id>",
    "full_name": "<full_name>",
    "photo_url": "<photo_url>",
    "email": "<email>",
    "phone_num": "<phone_num>",
    "major": "<major>",
    "major_id": "<major_id>",
    "degree": "<degree>",
    "diploma_level": "<diploma_level>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/pending-student-verifications/{id}`

**Delete pending student verification by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/pending-student-verifications/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

