---
sidebar_position: 65
---

# Bulk Upload

Bulk upload data records for mass data import operations.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/bulk-upload/users/candidate/batches` | List upload batches with optional status filter |
| <span class="method-badge method-get">GET</span> | `/bulk-upload/users/candidate/batches/{batchId}/rows` | List batch rows with filters including email status |
| <span class="method-badge method-get">GET</span> | `/bulk-upload/users/candidate/batches/{id}` | Get batch processing progress |
| <span class="method-badge method-get">GET</span> | `/bulk-upload/users/candidate/template` | Download Excel template for bulk candidate upload |
| <span class="method-badge method-post">POST</span> | `/bulk-upload/users/candidate/import` | Import candidate users from Excel/CSV file |
| <span class="method-badge method-post">POST</span> | `/bulk-upload/users/candidate/retry-email-all` | Retry all failed emails for bulk upload by type |
| <span class="method-badge method-delete">DELETE</span> | `/bulk-upload/users/candidate/delete-failed` | Delete failed registrations from a batch or by row ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/bulk-upload/users/candidate/batches`

**List upload batches with optional status filter**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `status` | query | string | No | Filter by batch status (completed, processing, failed) |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Batches retrieved successfully

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

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/bulk-upload/users/candidate/batches" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/bulk-upload/users/candidate/batches/{batchId}/rows`

**List batch rows with filters including email status**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `batchId` | path | string | **Yes** | — |
| `email` | query | string | No | Filter by email |
| `phone` | query | string | No | Filter by phone |
| `gender` | query | string | No | Filter by gender |
| `status` | query | `string` enum: `PENDING`, `IN_PROCESS`, `VALID`, `INVALID`, `FAILED`, `DELETED` | No | Filter by row status |
| `type` | query | string | No | Filter by row type |
| `page` | query | number | No | Page number |
| `limit` | query | number | No | Items per page |

#### Responses

**200** — Batch rows retrieved successfully with email status

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

**404** — Batch not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/bulk-upload/users/candidate/batches/{batchId}/rows" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/bulk-upload/users/candidate/batches/{id}`

**Get batch processing progress**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Batch progress retrieved successfully

**400** — Batch not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/bulk-upload/users/candidate/batches/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/bulk-upload/users/candidate/template`

**Download Excel template for bulk candidate upload**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Excel template file downloaded successfully

**400** — Invalid template type

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/bulk-upload/users/candidate/template" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/bulk-upload/users/candidate/import`

**Import candidate users from Excel/CSV file**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — File uploaded successfully and processing started

**400** — Invalid file format or validation errors

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/bulk-upload/users/candidate/import" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/bulk-upload/users/candidate/retry-email-all`

**Retry all failed emails for bulk upload by type**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `string` enum: `user_candidate_bulk_direct_registration` | **Yes** | The type of email to retry |

#### Responses

**200** — Failed emails retried successfully

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/bulk-upload/users/candidate/retry-email-all" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user_candidate_bulk_direct_registration"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/bulk-upload/users/candidate/delete-failed`

**Delete failed registrations from a batch or by row ID**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Failed registrations deleted successfully

**400** — Invalid request or row not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/bulk-upload/users/candidate/delete-failed" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

