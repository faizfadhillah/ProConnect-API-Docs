---
sidebar_position: 29
---

# Public Companies

Access public company profiles without authentication for discovery and SEO.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/public/mst-companies/{id}` | Get public company details by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/public/mst-companies/{id}`

**Get public company details by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Public company details including departments and, for HQ companies, branches.

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
| `status` | CompanyStatus | **Yes** | — |
| `country_id` | string | No | id from mst_salary_country |
| `other_country` | string | No | Other Country |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `use_hq_business_profile` | boolean | **Yes** | Flag is business profile data, inherit from HQ |
| `departments` | MstDepartmentResponseDto[] | **Yes** | List of departments assigned to this company |
| `available_job_count` | number | No | Count of published jobs for this company when showAvailableJobCount=true |
| `branches` | CompanyBranchResponseDto[] | **Yes** | Branches for this company (HQ + branches resolved by company name). Empty for non-HQ companies. |

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
  "available_job_count": 0,
  "branches": []
}
```

</details>

**404** — Company not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/public/mst-companies/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

