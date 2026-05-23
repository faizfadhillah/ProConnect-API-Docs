---
sidebar_position: 3
---

# User Certificates

Manage professional certificates and certifications associated with user profiles.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-certificates/{id}` | Get a UserCertificate by ID |
| <span class="method-badge method-get">GET</span> | `/user-certificates/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-certificates` | Create a new UserCertificate |
| <span class="method-badge method-patch">PATCH</span> | `/user-certificates/{id}` | Update a UserCertificate |
| <span class="method-badge method-delete">DELETE</span> | `/user-certificates/{id}` | Delete a UserCertificate |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-certificates/{id}`

**Get a UserCertificate by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the UserCertificate.

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

**404** — UserCertificate not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-certificates/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-certificates/search`

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
curl -X GET "https://api.proconnectcareer.com/user-certificates/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-certificates`

**Create a new UserCertificate**

Create a new user certificate.

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | No | The id of the user who owns the Certificate. If not provided, will be automatically derived from the authentication token. |
| `mst_license_id` | string | No | Optional. The ID of the master license template. If provided, license details will be automatically populated from mst_license. |
| `user_education_id` | string | No | Optional. The ID of the user education that auto-created this certificate. Only populated for auto-created certificates, not manual candidate input. |
| `license_number` | string | No | The license number for this user's certificate (optional). This is the individual user's license number, not from the template. |
| `license_name` | string | No | Optional. The name of the license. Required if mst_license_id is not provided. |
| `issuing_organization` | string | No | Optional. The organization that issued the license. Required if mst_license_id is not provided. |
| `issue_date` | string | No | Optional. The date when the license was issued. Required if mst_license_id is not provided. |
| `certificate_level` | string | No | Optional. Certificate level. If not provided, will be populated from mst_license. |
| `no_expiry` | boolean | **Yes** | Whether the Certificate has no expiry date |
| `expiry_date` | string | No | The expiry date of the Certificate |
| `description` | string | No | Additional description or notes about the Certificate |
| `file_url` | string | **Yes** | The file url of license or Certificate |

#### Responses

**201** — The UserCertificate has been successfully created.

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

**404** — Master license not found.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-certificates" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "mst_license_id": "<mst_license_id>",
    "user_education_id": "<user_education_id>",
    "license_number": "<license_number>",
    "license_name": "<license_name>",
    "issuing_organization": "<issuing_organization>",
    "issue_date": "<issue_date>",
    "certificate_level": "<certificate_level>",
    "no_expiry": true,
    "expiry_date": "<expiry_date>",
    "description": "<description>",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-certificates/{id}`

**Update a UserCertificate**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserCertificate has been successfully updated.

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

**404** — UserCertificate not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-certificates/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-certificates/{id}`

**Delete a UserCertificate**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserCertificate has been successfully deleted.

**404** — UserCertificate not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-certificates/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

