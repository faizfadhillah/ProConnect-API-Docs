---
sidebar_position: 55
---

# Informal Certificate Mappings

Manage mappings for informal certificates, workshops, and non-accredited training programs.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-informal-certificate-mappings/{id}` | Get mapping by ID |
| <span class="method-badge method-get">GET</span> | `/mst-informal-certificate-mappings/search` | Search informal certificate mappings |
| <span class="method-badge method-get">GET</span> | `/mst-informal-certificate-mappings/students` | Get students with licenses for license verification dashboard |
| <span class="method-badge method-get">GET</span> | `/mst-informal-certificate-mappings/template/download` | Download Excel template for bulk upload |
| <span class="method-badge method-post">POST</span> | `/mst-informal-certificate-mappings` | Create informal certificate mapping |
| <span class="method-badge method-post">POST</span> | `/mst-informal-certificate-mappings/upload` | Upload informal certificate mappings via Excel |
| <span class="method-badge method-put">PUT</span> | `/mst-informal-certificate-mappings/{id}` | Update mapping (only if UNPROCESSED) |
| <span class="method-badge method-patch">PATCH</span> | `/mst-informal-certificate-mappings/certificates/{id}/approval` | Approve/reject certificate verification (Admin only) |
| <span class="method-badge method-delete">DELETE</span> | `/mst-informal-certificate-mappings/{id}` | Delete mapping (only if UNPROCESSED) |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-informal-certificate-mappings/{id}`

**Get mapping by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Mapping retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `email` | string | **Yes** | User email |
| `phone` | string | **Yes** | User phone number |
| `name` | string | **Yes** | Name for reference/display |
| `photo_url` | string | **Yes** | Photo URL for reference/display |
| `license_id` | string | **Yes** | License ID to be granted |
| `status` | `string` enum: `PROCESSED`, `UNPROCESSED` | **Yes** | Processing status |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "email": "<email>",
  "phone": "<phone>",
  "name": "<name>",
  "photo_url": "<photo_url>",
  "license_id": "<license_id>",
  "status": "PROCESSED"
}
```

</details>

**404** — Mapping not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-informal-certificate-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-informal-certificate-mappings/search`

**Search informal certificate mappings**

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

**200** — Returns list of mappings

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

**400** — Bad request

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-informal-certificate-mappings/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-informal-certificate-mappings/students`

**Get students with licenses for license verification dashboard**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `name` | query | string | No | — |
| `email` | query | string | No | — |
| `phone` | query | string | No | — |
| `license_id` | query | string | No | — |
| `status` | query | `string` enum: `ALL`, `VERIFIED`, `PENDING` | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Returns list of students with licenses and summary statistics

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `summary` | object | **Yes** | Summary statistics |
| `students` | object[] | **Yes** | List of students with licenses |
| `meta` | object | **Yes** | Pagination metadata |

<details>
<summary>Example Response</summary>

```json
{
  "summary": {},
  "students": [],
  "meta": {}
}
```

</details>

**400** — Bad request

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-informal-certificate-mappings/students" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-informal-certificate-mappings/template/download`

**Download Excel template for bulk upload**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Template downloaded successfully

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-informal-certificate-mappings/template/download" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-informal-certificate-mappings`

**Create informal certificate mapping**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | No | User email |
| `phone` | string | No | User phone number |
| `name` | string | **Yes** | Name for reference/display |
| `photo_url` | string | No | Photo URL for reference/display |
| `license_id` | string | **Yes** | License ID to be granted |

#### Responses

**201** — Mapping created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `email` | string | **Yes** | User email |
| `phone` | string | **Yes** | User phone number |
| `name` | string | **Yes** | Name for reference/display |
| `photo_url` | string | **Yes** | Photo URL for reference/display |
| `license_id` | string | **Yes** | License ID to be granted |
| `status` | `string` enum: `PROCESSED`, `UNPROCESSED` | **Yes** | Processing status |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "email": "<email>",
  "phone": "<phone>",
  "name": "<name>",
  "photo_url": "<photo_url>",
  "license_id": "<license_id>",
  "status": "PROCESSED"
}
```

</details>

**400** — Bad request

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-informal-certificate-mappings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "<email>",
    "phone": "<phone>",
    "name": "<name>",
    "photo_url": "<photo_url>",
    "license_id": "<license_id>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-informal-certificate-mappings/upload`

**Upload informal certificate mappings via Excel**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — File processed successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `success_count` | number | **Yes** | Number of successfully processed rows |
| `error_count` | number | **Yes** | Number of failed rows |
| `errors` | string[] | **Yes** | List of errors |
| `message` | string | **Yes** | Processing message |

<details>
<summary>Example Response</summary>

```json
{
  "success_count": 0,
  "error_count": 0,
  "errors": [],
  "message": "<message>"
}
```

</details>

**400** — Bad request

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-informal-certificate-mappings/upload" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-put">PUT</span> `/mst-informal-certificate-mappings/{id}`

**Update mapping (only if UNPROCESSED)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | No | User email |
| `phone` | string | No | User phone number |
| `name` | string | No | Name for reference/display |
| `photo_url` | string | No | Photo URL for reference/display |
| `license_id` | string | No | License ID to be granted |

#### Responses

**200** — Mapping updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `email` | string | **Yes** | User email |
| `phone` | string | **Yes** | User phone number |
| `name` | string | **Yes** | Name for reference/display |
| `photo_url` | string | **Yes** | Photo URL for reference/display |
| `license_id` | string | **Yes** | License ID to be granted |
| `status` | `string` enum: `PROCESSED`, `UNPROCESSED` | **Yes** | Processing status |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "email": "<email>",
  "phone": "<phone>",
  "name": "<name>",
  "photo_url": "<photo_url>",
  "license_id": "<license_id>",
  "status": "PROCESSED"
}
```

</details>

**400** — Cannot update processed mapping

**404** — Mapping not found

#### Example Request

```bash
curl -X PUT "https://api.proconnectcareer.com/mst-informal-certificate-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "<email>",
    "phone": "<phone>",
    "name": "<name>",
    "photo_url": "<photo_url>",
    "license_id": "<license_id>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-informal-certificate-mappings/certificates/{id}/approval`

**Approve/reject certificate verification (Admin only)**

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

**200** — The certificate verification status has been updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user Certificate |
| `user_id` | string | **Yes** | The ID of the user who owns this Certificate |
| `license_number` | string | No | The number of the license or Certificate |
| `license_name` | string | **Yes** | The name of the license or Certificate |
| `issuing_organization` | string | **Yes** | The organization that issued the Certificate |
| `issue_date` | string | **Yes** | The date when the Certificate was issued |
| `certificate_level` | string | No | The level of the certificate |
| `no_expiry` | boolean | **Yes** | Whether the Certificate has no expiry date |
| `expiry_date` | string | No | The expiry date of the Certificate |
| `description` | string | No | Additional description or notes about the Certificate |
| `file_url` | string | **Yes** | The file url of license or Certificate |
| `is_verified` | boolean | **Yes** | Status verifikasi sertifikat |
| `approval_state` | `string` enum: `WAITING_APPROVAL`, `APPROVED`, `REJECT` | **Yes** | The approval state of the certificate |
| `approval_by` | string | No | Who approved or rejected this certificate |
| `mst_license_id` | string | No | The ID of the master license (optional) |
| `user_education_id` | string | No | The ID of the user education that auto-created this certificate (optional, only populated for auto-created certificates) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "license_number": "<license_number>",
  "license_name": "<license_name>",
  "issuing_organization": "<issuing_organization>",
  "issue_date": "<issue_date>",
  "certificate_level": "<certificate_level>",
  "no_expiry": true,
  "expiry_date": "<expiry_date>",
  "description": "<description>",
  "file_url": "<file_url>",
  "is_verified": true,
  "approval_state": "WAITING_APPROVAL",
  "approval_by": "<approval_by>",
  "mst_license_id": "<mst_license_id>",
  "user_education_id": "<user_education_id>"
}
```

</details>

**400** — Bad request.

**404** — Certificate not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-informal-certificate-mappings/certificates/{id}/approval" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "approval_state": "WAITING_APPROVAL"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-informal-certificate-mappings/{id}`

**Delete mapping (only if UNPROCESSED)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Mapping deleted successfully

**400** — Cannot delete processed mapping

**404** — Mapping not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-informal-certificate-mappings/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

