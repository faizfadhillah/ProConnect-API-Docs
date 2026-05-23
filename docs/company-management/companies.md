---
sidebar_position: 24
---

# Companies

Manage company profiles, settings, and organizational data. Companies can post jobs, manage employees, and build their employer brand.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-companies` | Get all companies |
| <span class="method-badge method-get">GET</span> | `/mst-companies/{id}` | Get a company by ID |
| <span class="method-badge method-get">GET</span> | `/mst-companies/available-branches/{companyId}` | Get available branches for a company HQ |
| <span class="method-badge method-get">GET</span> | `/mst-companies/available-departments/{id}` | Get departments available for the company |
| <span class="method-badge method-get">GET</span> | `/mst-companies/departments/{id}` | Get departments assigned to a company |
| <span class="method-badge method-get">GET</span> | `/mst-companies/member-detail` | Get detailed member information including encrypted data and role history |
| <span class="method-badge method-get">GET</span> | `/mst-companies/members` | Get company members with filtering and pagination |
| <span class="method-badge method-get">GET</span> | `/mst-companies/metrics` | Get company metrics (users, branches, departments) |
| <span class="method-badge method-get">GET</span> | `/mst-companies/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-companies` | Create a new company |
| <span class="method-badge method-post">POST</span> | `/mst-companies/import-xls` | MstCompaniesController_uploadExcel |
| <span class="method-badge method-post">POST</span> | `/mst-companies/transfer-ownership` | Transfer ownership of a company |
| <span class="method-badge method-post">POST</span> | `/mst-companies/upsert-member` | Create or update a company member |
| <span class="method-badge method-patch">PATCH</span> | `/mst-companies/{id}` | Update a company by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-companies/{id}` | Delete a company by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-companies/members` | Delete company member with cascade logic |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-companies`

**Get all companies**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — List of companies with their departments

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/{id}`

**Get a company by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Company details with departments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `logo_url` | string | **Yes** | URL logo perusahaan |
| `brand_name` | string | **Yes** | Nama brand perusahaan |
| `parent_id` | string | **Yes** | ID parent perusahaan |
| `company_name` | string | **Yes** | Nama resmi perusahaan |
| `company_description` | string | **Yes** | Deskripsi perusahaan |
| `branch` | string | **Yes** | Nama cabang perusahaan |
| `phone` | string | **Yes** | Phone resmi perusahaan |
| `email` | string | **Yes** | Email resmi perusahaan |
| `unique_url` | string | **Yes** | URL unik untuk profil perusahaan |
| `website` | string | **Yes** | Website resmi perusahaan |
| `industry_id` | string | **Yes** | Industri perusahaan |
| `industry` | string | **Yes** | Industri perusahaan |
| `organization_size` | string | **Yes** | Ukuran organisasi |
| `organization_type` | string | **Yes** | Tipe organisasi |
| `tagline` | string | **Yes** | Tagline atau slogan perusahaan |
| `photo_url` | string | **Yes** | The photo profile URL |
| `location` | string | **Yes** | Lokasi perusahaan |
| `legal_type` | string | **Yes** | Bentuk badan hukum |
| `number_of_employees` | number | **Yes** | Jumlah karyawan |
| `business_license` | string | **Yes** | Nomor izin usaha |
| `tax_identification_number` | string | **Yes** | Nomor Pokok Wajib Pajak (NPWP) |
| `tax_identification_url` | string | **Yes** | NPWP file url |
| `region_id` | string | **Yes** | ID region |
| `other_region` | string | No | Region lain (opsional) |
| `is_verified` | boolean | **Yes** | Status verifikasi perusahaan |
| `status` | object | **Yes** | — |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | Other Country |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `use_hq_business_profile` | boolean | **Yes** | Flag is business profile data, inherit from HQ |
| `departments` | object[] | **Yes** | List of departments assigned to this company |
| `available_job_count` | number | No | Count of published jobs for this company when showAvailableJobCount=true |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "logo_url": "<logo_url>",
  "brand_name": "<brand_name>",
  "parent_id": "<parent_id>",
  "company_name": "<company_name>",
  "company_description": "<company_description>",
  "branch": "<branch>",
  "phone": "<phone>",
  "email": "<email>",
  "unique_url": "<unique_url>",
  "website": "<website>",
  "industry_id": "<industry_id>",
  "industry": "<industry>",
  "organization_size": "<organization_size>",
  "organization_type": "<organization_type>",
  "tagline": "<tagline>",
  "photo_url": "<photo_url>",
  "location": "<location>",
  "legal_type": "<legal_type>",
  "number_of_employees": 0,
  "business_license": "<business_license>",
  "tax_identification_number": "<tax_identification_number>",
  "tax_identification_url": "<tax_identification_url>",
  "region_id": "<region_id>",
  "other_region": "<other_region>",
  "is_verified": true,
  "status": {},
  "country_id": "<country_id>",
  "other_country": "<other_country>",
  "is_outside_indo": true,
  "use_hq_business_profile": true,
  "departments": [],
  "available_job_count": 0
}
```

</details>

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/available-branches/{companyId}`

**Get available branches for a company HQ**

Returns all branches (including HQ) for a company. Accepts either a company ID or HQ ID - if a branch ID is provided, it automatically resolves to the parent HQ. Used for dropdown options where branch names are displayed but company IDs are used as values.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `companyId` | path | string | **Yes** | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Available branches for the company HQ

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
curl -X GET "https://api.proconnectcareer.com/mst-companies/available-branches/{companyId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/available-departments/{id}`

**Get departments available for the company**

Returns all departments that can be assigned to a company, including both company-specific and global departments. Always searches within the headquarters scope - if a branch ID is provided, it automatically locates the parent HQ. Only returns departments with PUBLISHED status.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Available departments for the company

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
curl -X GET "https://api.proconnectcareer.com/mst-companies/available-departments/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/departments/{id}`

**Get departments assigned to a company**

Retrieves all PUBLISHED departments mapped to a specific company. Useful for displaying department lists in company context.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — List of departments assigned to the company

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
curl -X GET "https://api.proconnectcareer.com/mst-companies/departments/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/member-detail`

**Get detailed member information including encrypted data and role history**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | query | string | **Yes** | — |
| `company_hq_id` | query | string | **Yes** | — |

#### Responses

**200** — Member details retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | — |
| `photo_url` | string | **Yes** | — |
| `full_name` | string | **Yes** | — |
| `email` | string | **Yes** | — |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | — |
| `birth_year` | number | **Yes** | — |
| `region_id` | string | **Yes** | — |
| `is_outside_indo` | boolean | **Yes** | — |
| `other_country` | string | **Yes** | — |
| `other_region` | string | **Yes** | — |
| `postal_code` | string | **Yes** | — |
| `personal_summary` | string | **Yes** | — |
| `availability` | string | **Yes** | — |
| `employment_status` | string | **Yes** | — |
| `domicile_status` | string | **Yes** | — |
| `preferred_work_types` | string | **Yes** | — |
| `preferred_locations` | object | **Yes** | — |
| `salary_expectation` | string | **Yes** | — |
| `firebase_uid` | string | **Yes** | — |
| `is_email_verified` | boolean | **Yes** | — |
| `is_school_verified` | boolean | **Yes** | — |
| `is_skill_passport_verified` | boolean | **Yes** | — |
| `last_wizard_state` | number | **Yes** | — |
| `wizard_state` | object | **Yes** | — |
| `created_at` | string | **Yes** | — |
| `updated_at` | string | **Yes** | — |
| `encrypted_phone` | string | **Yes** | Encrypted phone number |
| `encrypted_date_of_birth` | string | **Yes** | Encrypted date of birth |
| `encrypted_address` | string | **Yes** | Encrypted address |
| `encrypted_nik` | string | **Yes** | Encrypted NIK |
| `assignments` | object[] | **Yes** | Complete role assignment history for the member with detailed relations |

<details>
<summary>Example Response</summary>

```json
{
  "id": "string",
  "photo_url": "string",
  "full_name": "string",
  "email": "string",
  "gender": "male",
  "birth_year": 0,
  "region_id": "string",
  "is_outside_indo": true,
  "other_country": "string",
  "other_region": "string",
  "postal_code": "string",
  "personal_summary": "string",
  "availability": "string",
  "employment_status": "string",
  "domicile_status": "string",
  "preferred_work_types": "string",
  "preferred_locations": {},
  "salary_expectation": "string",
  "firebase_uid": "string",
  "is_email_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "last_wizard_state": 0,
  "wizard_state": {},
  "created_at": "string",
  "updated_at": "string",
  "encrypted_phone": "<encrypted_phone>",
  "encrypted_date_of_birth": "<encrypted_date_of_birth>",
  "encrypted_address": "<encrypted_address>",
  "encrypted_nik": "<encrypted_nik>",
  "assignments": []
}
```

</details>

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-companies/member-detail" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/members`

**Get company members with filtering and pagination**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `company_id` | query | string | No | — |
| `company_hq_id` | query | string | No | — |
| `company_role` | query | string | No | — |
| `dept_id` | query | string | No | — |
| `full_name` | query | string | No | Filter by user full name (ILIKE) |
| `email` | query | string | No | Filter by user email (ILIKE) |
| `status` | query | `string` enum: `active`, `inactive` | No | Filter by member status: active, inactive |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Company members retrieved successfully

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
curl -X GET "https://api.proconnectcareer.com/mst-companies/members" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/metrics`

**Get company metrics (users, branches, departments)**

Returns total unique users, branches, and departments for the given company or HQ scope.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `company_hq_id` | query | string | **Yes** | Company HQ ID to scope to a specific company HQ |
| `company_id` | query | string | No | Optional company ID to scope to a specific company |

#### Responses

**200** — Company metrics retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `total_users` | number | **Yes** | Total unique users in the scope |
| `total_branches` | number | **Yes** | Total unique branches in the scope |
| `total_departments` | number | **Yes** | Total unique departments in the scope |

<details>
<summary>Example Response</summary>

```json
{
  "total_users": 0,
  "total_branches": 0,
  "total_departments": 0
}
```

</details>

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-companies/metrics" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-companies/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching. company_name uses exact match, company_name_fuzzy uses ILIKE (fuzzy search), other string fields use ILIKE. Cannot use both company_name and company_name_fuzzy at the same time. |
| `isExcel` | query | string | No | — |
| `showAvailableJobCount` | query | boolean | No | — |
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
curl -X GET "https://api.proconnectcareer.com/mst-companies/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-companies`

**Create a new company**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `brand_name` | string | **Yes** | Nama brand perusahaan |
| `parent_id` | string | **Yes** | ID parent perusahaan |
| `branch` | string | **Yes** | Nama cabang perusahaan |
| `company_name` | string | **Yes** | Nama resmi perusahaan |
| `company_description` | string | **Yes** | Deskripsi perusahaan |
| `phone` | string | **Yes** | Phone resmi perusahaan |
| `email` | string | **Yes** | Email resmi perusahaan |
| `photo_url` | string | **Yes** | The photo profile URL |
| `unique_url` | string | **Yes** | URL unik untuk profil perusahaan |
| `website` | string | **Yes** | Website resmi perusahaan |
| `industry_id` | string | **Yes** | UUID Industri perusahaan |
| `industry` | string | **Yes** | Industri perusahaan |
| `organization_size` | string | **Yes** | Ukuran organisasi |
| `organization_type` | string | **Yes** | Tipe organisasi |
| `logo_url` | string | **Yes** | URL logo perusahaan |
| `tagline` | string | **Yes** | Tagline atau slogan perusahaan |
| `location` | string | **Yes** | Lokasi perusahaan |
| `legal_type` | string | **Yes** | Bentuk badan hukum |
| `number_of_employees` | number | **Yes** | Jumlah karyawan |
| `business_license` | string | **Yes** | Nomor izin usaha |
| `tax_identification_number` | string | **Yes** | Nomor Pokok Wajib Pajak (NPWP) |
| `tax_identification_url` | string | **Yes** | Nomor Pokok Wajib Pajak file url |
| `region_id` | string | **Yes** | ID region |
| `other_region` | string | No | Region lain (opsional) |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | country lain (opsional) |
| `is_outside_indo` | boolean | No | is outside indo |
| `use_hq_business_profile` | boolean | No | Flag is same with hq |
| `is_verified` | boolean | **Yes** | Status verifikasi perusahaan |
| `status` | object | **Yes** | — |
| `department_ids` | string[] | No | List of department IDs to assign to this company |

#### Responses

**201** — Company created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `logo_url` | string | **Yes** | URL logo perusahaan |
| `brand_name` | string | **Yes** | Nama brand perusahaan |
| `parent_id` | string | **Yes** | ID parent perusahaan |
| `company_name` | string | **Yes** | Nama resmi perusahaan |
| `company_description` | string | **Yes** | Deskripsi perusahaan |
| `branch` | string | **Yes** | Nama cabang perusahaan |
| `phone` | string | **Yes** | Phone resmi perusahaan |
| `email` | string | **Yes** | Email resmi perusahaan |
| `unique_url` | string | **Yes** | URL unik untuk profil perusahaan |
| `website` | string | **Yes** | Website resmi perusahaan |
| `industry_id` | string | **Yes** | Industri perusahaan |
| `industry` | string | **Yes** | Industri perusahaan |
| `organization_size` | string | **Yes** | Ukuran organisasi |
| `organization_type` | string | **Yes** | Tipe organisasi |
| `tagline` | string | **Yes** | Tagline atau slogan perusahaan |
| `photo_url` | string | **Yes** | The photo profile URL |
| `location` | string | **Yes** | Lokasi perusahaan |
| `legal_type` | string | **Yes** | Bentuk badan hukum |
| `number_of_employees` | number | **Yes** | Jumlah karyawan |
| `business_license` | string | **Yes** | Nomor izin usaha |
| `tax_identification_number` | string | **Yes** | Nomor Pokok Wajib Pajak (NPWP) |
| `tax_identification_url` | string | **Yes** | NPWP file url |
| `region_id` | string | **Yes** | ID region |
| `other_region` | string | No | Region lain (opsional) |
| `is_verified` | boolean | **Yes** | Status verifikasi perusahaan |
| `status` | object | **Yes** | — |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | Other Country |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `use_hq_business_profile` | boolean | **Yes** | Flag is business profile data, inherit from HQ |
| `departments` | object[] | **Yes** | List of departments assigned to this company |
| `available_job_count` | number | No | Count of published jobs for this company when showAvailableJobCount=true |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "logo_url": "<logo_url>",
  "brand_name": "<brand_name>",
  "parent_id": "<parent_id>",
  "company_name": "<company_name>",
  "company_description": "<company_description>",
  "branch": "<branch>",
  "phone": "<phone>",
  "email": "<email>",
  "unique_url": "<unique_url>",
  "website": "<website>",
  "industry_id": "<industry_id>",
  "industry": "<industry>",
  "organization_size": "<organization_size>",
  "organization_type": "<organization_type>",
  "tagline": "<tagline>",
  "photo_url": "<photo_url>",
  "location": "<location>",
  "legal_type": "<legal_type>",
  "number_of_employees": 0,
  "business_license": "<business_license>",
  "tax_identification_number": "<tax_identification_number>",
  "tax_identification_url": "<tax_identification_url>",
  "region_id": "<region_id>",
  "other_region": "<other_region>",
  "is_verified": true,
  "status": {},
  "country_id": "<country_id>",
  "other_country": "<other_country>",
  "is_outside_indo": true,
  "use_hq_business_profile": true,
  "departments": [],
  "available_job_count": 0
}
```

</details>

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "brand_name": "<brand_name>",
    "parent_id": "<parent_id>",
    "branch": "<branch>",
    "company_name": "<company_name>",
    "company_description": "<company_description>",
    "phone": "<phone>",
    "email": "<email>",
    "photo_url": "<photo_url>",
    "unique_url": "<unique_url>",
    "website": "<website>",
    "industry_id": "<industry_id>",
    "industry": "<industry>",
    "organization_size": "<organization_size>",
    "organization_type": "<organization_type>",
    "logo_url": "<logo_url>",
    "tagline": "<tagline>",
    "location": "<location>",
    "legal_type": "<legal_type>",
    "number_of_employees": 0,
    "business_license": "<business_license>",
    "tax_identification_number": "<tax_identification_number>",
    "tax_identification_url": "<tax_identification_url>",
    "region_id": "<region_id>",
    "other_region": "<other_region>",
    "country_id": "<country_id>",
    "other_country": "<other_country>",
    "is_outside_indo": true,
    "use_hq_business_profile": true,
    "is_verified": true,
    "status": {},
    "department_ids": []
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-companies/import-xls`

**MstCompaniesController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-companies/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-companies/transfer-ownership`

**Transfer ownership of a company**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `new_owner_user_id` | string | **Yes** | New owner user ID |
| `company_hq_id` | string | **Yes** | Company HQ ID |
| `updated_placement` | object | **Yes** | Updated placement for the new owner |

#### Responses

**200** — Ownership transferred successfully

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-companies/transfer-ownership" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "new_owner_user_id": "<new_owner_user_id>",
    "company_hq_id": "<company_hq_id>",
    "updated_placement": {}
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-companies/upsert-member`

**Create or update a company member**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `company_id` | string | No | The ID of the company the user belongs to (Populate with HQ Company ID) |
| `full_name` | string | No | The full name of the user |
| `email` | string | **Yes** | — |
| `phone` | string | **Yes** | — |
| `photo_url` | string | **Yes** | — |
| `region_id` | string | No | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `gender` | `string` enum: `male`, `female`, `non-binary` | No | The gender of the user |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `encrypted_phone` | string | **Yes** | The encrypted phone of the user |
| `encrypted_date_of_birth` | string | **Yes** | The encrypted date of birth of the user |
| `encrypted_address` | string | **Yes** | The encrypted address of the user |
| `encrypted_nik` | string | **Yes** | The encrypted nik of the user |
| `assignments` | object[] | **Yes** | Array of role assignments to upsert (create or update) |

#### Responses

**201** — Member upserted successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | — |
| `photo_url` | string | **Yes** | — |
| `full_name` | string | **Yes** | — |
| `email` | string | **Yes** | — |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | — |
| `birth_year` | number | **Yes** | — |
| `region_id` | string | **Yes** | — |
| `is_outside_indo` | boolean | **Yes** | — |
| `other_country` | string | **Yes** | — |
| `other_region` | string | **Yes** | — |
| `postal_code` | string | **Yes** | — |
| `personal_summary` | string | **Yes** | — |
| `availability` | string | **Yes** | — |
| `employment_status` | string | **Yes** | — |
| `domicile_status` | string | **Yes** | — |
| `preferred_work_types` | string | **Yes** | — |
| `preferred_locations` | object | **Yes** | — |
| `salary_expectation` | string | **Yes** | — |
| `firebase_uid` | string | **Yes** | — |
| `is_email_verified` | boolean | **Yes** | — |
| `is_school_verified` | boolean | **Yes** | — |
| `is_skill_passport_verified` | boolean | **Yes** | — |
| `last_wizard_state` | number | No | — |
| `wizard_state` | object | No | — |
| `created_at` | string | **Yes** | — |
| `updated_at` | string | **Yes** | — |
| `encrypted_date_of_birth` | string | **Yes** | — |
| `encrypted_nik` | string | **Yes** | — |
| `encrypted_phone` | string | **Yes** | — |
| `encrypted_address` | string | **Yes** | — |
| `assignments` | object[] | **Yes** | The role assignments created/updated for the member |

<details>
<summary>Example Response</summary>

```json
{
  "id": "string",
  "photo_url": "string",
  "full_name": "string",
  "email": "string",
  "gender": "male",
  "birth_year": 0,
  "region_id": "string",
  "is_outside_indo": true,
  "other_country": "string",
  "other_region": "string",
  "postal_code": "string",
  "personal_summary": "string",
  "availability": "string",
  "employment_status": "string",
  "domicile_status": "string",
  "preferred_work_types": "string",
  "preferred_locations": {},
  "salary_expectation": "string",
  "firebase_uid": "string",
  "is_email_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "last_wizard_state": 0,
  "wizard_state": {},
  "created_at": "string",
  "updated_at": "string",
  "encrypted_date_of_birth": "string",
  "encrypted_nik": "string",
  "encrypted_phone": "string",
  "encrypted_address": "string",
  "assignments": []
}
```

</details>

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-companies/upsert-member" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "<company_id>",
    "full_name": "<full_name>",
    "email": "string",
    "phone": "string",
    "photo_url": "string",
    "region_id": "<region_id>",
    "is_outside_indo": true,
    "other_country": "<other_country>",
    "other_region": "<other_region>",
    "gender": "male",
    "postal_code": "<postal_code>",
    "encrypted_phone": "<encrypted_phone>",
    "encrypted_date_of_birth": "<encrypted_date_of_birth>",
    "encrypted_address": "<encrypted_address>",
    "encrypted_nik": "<encrypted_nik>",
    "assignments": []
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-companies/{id}`

**Update a company by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `brand_name` | string | No | Nama brand perusahaan |
| `parent_id` | string | No | ID parent perusahaan |
| `branch` | string | No | Nama cabang perusahaan |
| `company_name` | string | No | Nama resmi perusahaan |
| `company_description` | string | No | Deskripsi perusahaan |
| `phone` | string | No | Phone resmi perusahaan |
| `email` | string | No | Email resmi perusahaan |
| `photo_url` | string | No | The photo profile URL |
| `unique_url` | string | No | URL unik untuk profil perusahaan |
| `website` | string | No | Website resmi perusahaan |
| `industry_id` | string | No | UUID Industri perusahaan |
| `industry` | string | No | Industri perusahaan |
| `organization_size` | string | No | Ukuran organisasi |
| `organization_type` | string | No | Tipe organisasi |
| `logo_url` | string | No | URL logo perusahaan |
| `tagline` | string | No | Tagline atau slogan perusahaan |
| `location` | string | No | Lokasi perusahaan |
| `legal_type` | string | No | Bentuk badan hukum |
| `number_of_employees` | number | No | Jumlah karyawan |
| `business_license` | string | No | Nomor izin usaha |
| `tax_identification_number` | string | No | Nomor Pokok Wajib Pajak (NPWP) |
| `tax_identification_url` | string | No | Nomor Pokok Wajib Pajak file url |
| `region_id` | string | No | ID region |
| `other_region` | string | No | Region lain (opsional) |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | country lain (opsional) |
| `is_outside_indo` | boolean | No | is outside indo |
| `use_hq_business_profile` | boolean | No | Flag is same with hq |
| `is_verified` | boolean | No | Status verifikasi perusahaan |
| `status` | object | No | — |
| `department_ids` | string[] | No | List of department IDs to assign to this company |

#### Responses

**200** — Company updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `logo_url` | string | **Yes** | URL logo perusahaan |
| `brand_name` | string | **Yes** | Nama brand perusahaan |
| `parent_id` | string | **Yes** | ID parent perusahaan |
| `company_name` | string | **Yes** | Nama resmi perusahaan |
| `company_description` | string | **Yes** | Deskripsi perusahaan |
| `branch` | string | **Yes** | Nama cabang perusahaan |
| `phone` | string | **Yes** | Phone resmi perusahaan |
| `email` | string | **Yes** | Email resmi perusahaan |
| `unique_url` | string | **Yes** | URL unik untuk profil perusahaan |
| `website` | string | **Yes** | Website resmi perusahaan |
| `industry_id` | string | **Yes** | Industri perusahaan |
| `industry` | string | **Yes** | Industri perusahaan |
| `organization_size` | string | **Yes** | Ukuran organisasi |
| `organization_type` | string | **Yes** | Tipe organisasi |
| `tagline` | string | **Yes** | Tagline atau slogan perusahaan |
| `photo_url` | string | **Yes** | The photo profile URL |
| `location` | string | **Yes** | Lokasi perusahaan |
| `legal_type` | string | **Yes** | Bentuk badan hukum |
| `number_of_employees` | number | **Yes** | Jumlah karyawan |
| `business_license` | string | **Yes** | Nomor izin usaha |
| `tax_identification_number` | string | **Yes** | Nomor Pokok Wajib Pajak (NPWP) |
| `tax_identification_url` | string | **Yes** | NPWP file url |
| `region_id` | string | **Yes** | ID region |
| `other_region` | string | No | Region lain (opsional) |
| `is_verified` | boolean | **Yes** | Status verifikasi perusahaan |
| `status` | object | **Yes** | — |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | Other Country |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `use_hq_business_profile` | boolean | **Yes** | Flag is business profile data, inherit from HQ |
| `departments` | object[] | **Yes** | List of departments assigned to this company |
| `available_job_count` | number | No | Count of published jobs for this company when showAvailableJobCount=true |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "logo_url": "<logo_url>",
  "brand_name": "<brand_name>",
  "parent_id": "<parent_id>",
  "company_name": "<company_name>",
  "company_description": "<company_description>",
  "branch": "<branch>",
  "phone": "<phone>",
  "email": "<email>",
  "unique_url": "<unique_url>",
  "website": "<website>",
  "industry_id": "<industry_id>",
  "industry": "<industry>",
  "organization_size": "<organization_size>",
  "organization_type": "<organization_type>",
  "tagline": "<tagline>",
  "photo_url": "<photo_url>",
  "location": "<location>",
  "legal_type": "<legal_type>",
  "number_of_employees": 0,
  "business_license": "<business_license>",
  "tax_identification_number": "<tax_identification_number>",
  "tax_identification_url": "<tax_identification_url>",
  "region_id": "<region_id>",
  "other_region": "<other_region>",
  "is_verified": true,
  "status": {},
  "country_id": "<country_id>",
  "other_country": "<other_country>",
  "is_outside_indo": true,
  "use_hq_business_profile": true,
  "departments": [],
  "available_job_count": 0
}
```

</details>

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "brand_name": "<brand_name>",
    "parent_id": "<parent_id>",
    "branch": "<branch>",
    "company_name": "<company_name>",
    "company_description": "<company_description>",
    "phone": "<phone>",
    "email": "<email>",
    "photo_url": "<photo_url>",
    "unique_url": "<unique_url>",
    "website": "<website>",
    "industry_id": "<industry_id>",
    "industry": "<industry>",
    "organization_size": "<organization_size>",
    "organization_type": "<organization_type>",
    "logo_url": "<logo_url>",
    "tagline": "<tagline>",
    "location": "<location>",
    "legal_type": "<legal_type>",
    "number_of_employees": 0,
    "business_license": "<business_license>",
    "tax_identification_number": "<tax_identification_number>",
    "tax_identification_url": "<tax_identification_url>",
    "region_id": "<region_id>",
    "other_region": "<other_region>",
    "country_id": "<country_id>",
    "other_country": "<other_country>",
    "is_outside_indo": true,
    "use_hq_business_profile": true,
    "is_verified": true,
    "status": {},
    "department_ids": []
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-companies/{id}`

**Delete a company by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-companies/members`

**Delete company member with cascade logic**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | query | string | **Yes** | — |
| `company_id` | query | string | No | — |
| `company_hq_id` | query | string | No | — |

#### Responses

**200** — Member deleted successfully with cascade logic

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-companies/members" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

