---
sidebar_position: 1
---

# Users

Manage user accounts and profiles on the ProConnect platform. Users represent individual professionals who can create profiles, upload documents, apply for jobs, and connect with companies.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/users` | Get all users |
| <span class="method-badge method-get">GET</span> | `/users/{id}` | Get single user |
| <span class="method-badge method-get">GET</span> | `/users/eligible-to-send-otp` | Check if user is eligible to request OTP (no guard or guard expired) |
| <span class="method-badge method-get">GET</span> | `/users/me` | Get info of user session |
| <span class="method-badge method-get">GET</span> | `/users/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/users` | Create a new user |
| <span class="method-badge method-post">POST</span> | `/users/admin-accounts` | Create new admin account (sys_admin only) |
| <span class="method-badge method-post">POST</span> | `/users/change-password` | Change Password a user |
| <span class="method-badge method-post">POST</span> | `/users/forgot-password` | Forgot Password a user |
| <span class="method-badge method-post">POST</span> | `/users/import-xls` | UsersController_uploadExcel |
| <span class="method-badge method-post">POST</span> | `/users/public-request-otp` | Send OTP to user email |
| <span class="method-badge method-post">POST</span> | `/users/send-otp` | Send OTP to user email or phone |
| <span class="method-badge method-post">POST</span> | `/users/verify-otp` | Verify user OTP (email or phone) |
| <span class="method-badge method-patch">PATCH</span> | `/users/{id}` | Update a user |
| <span class="method-badge method-delete">DELETE</span> | `/users/{id}` | Delete a user |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/users`

**Get all users**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Return all users

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/users/{id}`

**Get single user**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Return single user

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `photo_url` | string | **Yes** | The photo profile URL |
| `full_name` | string | **Yes** | The full name of the user |
| `email` | string | **Yes** | The email address of the user |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | The gender of the user |
| `birth_year` | string | **Yes** | The birth year |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `phone_last_4_digits` | string | **Yes** | The last 4 digits of the user's phone number |
| `personal_summary` | string | **Yes** | The personal summary of the user |
| `availability` | string | **Yes** | The availability of the user |
| `employment_status` | string | **Yes** | The domicilie status of the user |
| `domicile_status` | string | **Yes** | The domicile status of the user |
| `preferred_work_types` | string | **Yes** | The preferred work types of the user |
| `preferred_locations` | object | **Yes** | The preferred locations of the user |
| `salary_expectation` | string | **Yes** | The salary expectation of the user |
| `firebase_uid` | string | **Yes** | The Firebase UID of the user |
| `is_email_verified` | boolean | **Yes** | status email verified |
| `is_phone_verified` | boolean | **Yes** | status phone number verified |
| `is_school_verified` | boolean | **Yes** | status school verified |
| `is_skill_passport_verified` | boolean | **Yes** | status skill passport verified |
| `active_auth_session_id` | string | **Yes** | Current active auth session id |
| `active_auth_session_issued_at` | string | **Yes** | Current active auth session issued-at timestamp |
| `userSubscriptions` | UserSubscription[] | **Yes** | — |
| `userSkills` | UserSkill[] | **Yes** | — |
| `userSkillPassports` | UserSkillPassport[] | **Yes** | — |
| `userSalaryCountries` | UserSalaryCountry[] | **Yes** | — |
| `userRightToWorks` | UserRightToWork[] | **Yes** | — |
| `userProfessions` | UserProfession[] | **Yes** | — |
| `userLanguages` | UserLanguage[] | **Yes** | — |
| `userInterests` | UserInterest[] | **Yes** | — |
| `userFiles` | UserFile[] | **Yes** | — |
| `userEducations` | UserEducation[] | **Yes** | — |
| `userCertificates` | UserCertificate[] | **Yes** | — |
| `userCareerHistories` | UserCareerHistory[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "photo_url": "<photo_url>",
  "full_name": "<full_name>",
  "email": "<email>",
  "gender": "male",
  "birth_year": "<birth_year>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "postal_code": "<postal_code>",
  "phone_last_4_digits": "<phone_last_4_digits>",
  "personal_summary": "<personal_summary>",
  "availability": "<availability>",
  "employment_status": "<employment_status>",
  "domicile_status": "<domicile_status>",
  "preferred_work_types": "<preferred_work_types>",
  "preferred_locations": {},
  "salary_expectation": "<salary_expectation>",
  "firebase_uid": "<firebase_uid>",
  "is_email_verified": true,
  "is_phone_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "active_auth_session_id": "<active_auth_session_id>",
  "active_auth_session_issued_at": "<active_auth_session_issued_at>",
  "userSubscriptions": [],
  "userSkills": [],
  "userSkillPassports": [],
  "userSalaryCountries": [],
  "userRightToWorks": [],
  "userProfessions": [],
  "userLanguages": [],
  "userInterests": [],
  "userFiles": [],
  "userEducations": [],
  "userCertificates": [],
  "userCareerHistories": []
}
```

</details>

**401** — Unauthorized

**404** — User not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/users/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/users/eligible-to-send-otp`

**Check if user is eligible to request OTP (no guard or guard expired)**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `type` | query | `string` enum: `email`, `sms` | **Yes** | Channel: email or sms |

#### Responses

**200** — Eligibility for sending OTP

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eligible` | boolean | **Yes** | Whether the user is eligible to request OTP (no guard or guard expired) |
| `eligibleAt` | string | **Yes** | When the user becomes eligible again (ISO 8601). Null if already eligible. |

<details>
<summary>Example Response</summary>

```json
{
  "eligible": true,
  "eligibleAt": "<eligibleAt>"
}
```

</details>

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/users/eligible-to-send-otp" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/users/me`

**Get info of user session**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Return user profile with role and permissions

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `photo_url` | string | **Yes** | The photo profile URL |
| `full_name` | string | **Yes** | The full name of the user |
| `email` | string | **Yes** | The email address of the user |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | The gender of the user |
| `birth_year` | string | **Yes** | The birth year |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `phone_last_4_digits` | string | **Yes** | The last 4 digits of the user's phone number |
| `personal_summary` | string | **Yes** | The personal summary of the user |
| `availability` | string | **Yes** | The availability of the user |
| `employment_status` | string | **Yes** | The domicilie status of the user |
| `domicile_status` | string | **Yes** | The domicile status of the user |
| `preferred_work_types` | string | **Yes** | The preferred work types of the user |
| `preferred_locations` | object | **Yes** | The preferred locations of the user |
| `salary_expectation` | string | **Yes** | The salary expectation of the user |
| `firebase_uid` | string | **Yes** | The Firebase UID of the user |
| `is_email_verified` | boolean | **Yes** | status email verified |
| `is_phone_verified` | boolean | **Yes** | status phone number verified |
| `is_school_verified` | boolean | **Yes** | status school verified |
| `is_skill_passport_verified` | boolean | **Yes** | status skill passport verified |
| `active_auth_session_id` | string | **Yes** | Current active auth session id |
| `active_auth_session_issued_at` | string | **Yes** | Current active auth session issued-at timestamp |
| `userSubscriptions` | UserSubscription[] | **Yes** | — |
| `userSkills` | UserSkill[] | **Yes** | — |
| `userSkillPassports` | UserSkillPassport[] | **Yes** | — |
| `userSalaryCountries` | UserSalaryCountry[] | **Yes** | — |
| `userRightToWorks` | UserRightToWork[] | **Yes** | — |
| `userProfessions` | UserProfession[] | **Yes** | — |
| `userLanguages` | UserLanguage[] | **Yes** | — |
| `userInterests` | UserInterest[] | **Yes** | — |
| `userFiles` | UserFile[] | **Yes** | — |
| `userEducations` | UserEducation[] | **Yes** | — |
| `userCertificates` | UserCertificate[] | **Yes** | — |
| `userCareerHistories` | UserCareerHistory[] | **Yes** | — |
| `phone` | string | No | Decrypted full phone number (may be null if not set) |
| `roles` | RoleDto[] | **Yes** | User roles with permissions for the active session; null when no account is selected |
| `wizard_state` | object | **Yes** | Wizard state for active session scope |
| `last_wizard_state` | number | **Yes** | Last wizard state index for active session scope |
| `owner_employer_onboarding_complete` | boolean | **Yes** | Employer + HQ active session only: whether the company owner's employer onboarding is complete (wizard step 99). Always true when you are OWNER_HQ for that HQ. Null when not applicable (e.g. candidate session or draft employer). |
| `accounts` | UserMeAccountDto[] | **Yes** | All scoped accounts owned by this user (includes wizard_state, last_wizard_state, picture_url, company_name, brand_name for display) |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "photo_url": "<photo_url>",
  "full_name": "<full_name>",
  "email": "<email>",
  "gender": "male",
  "birth_year": "<birth_year>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "postal_code": "<postal_code>",
  "phone_last_4_digits": "<phone_last_4_digits>",
  "personal_summary": "<personal_summary>",
  "availability": "<availability>",
  "employment_status": "<employment_status>",
  "domicile_status": "<domicile_status>",
  "preferred_work_types": "<preferred_work_types>",
  "preferred_locations": {},
  "salary_expectation": "<salary_expectation>",
  "firebase_uid": "<firebase_uid>",
  "is_email_verified": true,
  "is_phone_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "active_auth_session_id": "<active_auth_session_id>",
  "active_auth_session_issued_at": "<active_auth_session_issued_at>",
  "userSubscriptions": [],
  "userSkills": [],
  "userSkillPassports": [],
  "userSalaryCountries": [],
  "userRightToWorks": [],
  "userProfessions": [],
  "userLanguages": [],
  "userInterests": [],
  "userFiles": [],
  "userEducations": [],
  "userCertificates": [],
  "userCareerHistories": [],
  "phone": "<phone>",
  "roles": [],
  "wizard_state": {},
  "last_wizard_state": 0,
  "owner_employer_onboarding_complete": true,
  "accounts": []
}
```

</details>

**400** — No active session - select an account first

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/users/me" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/users/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `page` | query | number | No | — |
| `age_start` | query | number | No | — |
| `age_end` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `isExcel` | query | string | **Yes** | — |
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
curl -X GET "https://api.proconnectcareer.com/users/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/users`

**Create a new user**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firebase_uid` | string | **Yes** | — |
| `email` | string | **Yes** | — |
| `phone` | string | **Yes** | — |
| `photo_url` | string | **Yes** | — |
| `otp` | string | **Yes** | — |

#### Responses

**201** — User created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `photo_url` | string | **Yes** | The photo profile URL |
| `full_name` | string | **Yes** | The full name of the user |
| `email` | string | **Yes** | The email address of the user |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | The gender of the user |
| `birth_year` | string | **Yes** | The birth year |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `phone_last_4_digits` | string | **Yes** | The last 4 digits of the user's phone number |
| `personal_summary` | string | **Yes** | The personal summary of the user |
| `availability` | string | **Yes** | The availability of the user |
| `employment_status` | string | **Yes** | The domicilie status of the user |
| `domicile_status` | string | **Yes** | The domicile status of the user |
| `preferred_work_types` | string | **Yes** | The preferred work types of the user |
| `preferred_locations` | object | **Yes** | The preferred locations of the user |
| `salary_expectation` | string | **Yes** | The salary expectation of the user |
| `firebase_uid` | string | **Yes** | The Firebase UID of the user |
| `is_email_verified` | boolean | **Yes** | status email verified |
| `is_phone_verified` | boolean | **Yes** | status phone number verified |
| `is_school_verified` | boolean | **Yes** | status school verified |
| `is_skill_passport_verified` | boolean | **Yes** | status skill passport verified |
| `active_auth_session_id` | string | **Yes** | Current active auth session id |
| `active_auth_session_issued_at` | string | **Yes** | Current active auth session issued-at timestamp |
| `userSubscriptions` | UserSubscription[] | **Yes** | — |
| `userSkills` | UserSkill[] | **Yes** | — |
| `userSkillPassports` | UserSkillPassport[] | **Yes** | — |
| `userSalaryCountries` | UserSalaryCountry[] | **Yes** | — |
| `userRightToWorks` | UserRightToWork[] | **Yes** | — |
| `userProfessions` | UserProfession[] | **Yes** | — |
| `userLanguages` | UserLanguage[] | **Yes** | — |
| `userInterests` | UserInterest[] | **Yes** | — |
| `userFiles` | UserFile[] | **Yes** | — |
| `userEducations` | UserEducation[] | **Yes** | — |
| `userCertificates` | UserCertificate[] | **Yes** | — |
| `userCareerHistories` | UserCareerHistory[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "photo_url": "<photo_url>",
  "full_name": "<full_name>",
  "email": "<email>",
  "gender": "male",
  "birth_year": "<birth_year>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "postal_code": "<postal_code>",
  "phone_last_4_digits": "<phone_last_4_digits>",
  "personal_summary": "<personal_summary>",
  "availability": "<availability>",
  "employment_status": "<employment_status>",
  "domicile_status": "<domicile_status>",
  "preferred_work_types": "<preferred_work_types>",
  "preferred_locations": {},
  "salary_expectation": "<salary_expectation>",
  "firebase_uid": "<firebase_uid>",
  "is_email_verified": true,
  "is_phone_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "active_auth_session_id": "<active_auth_session_id>",
  "active_auth_session_issued_at": "<active_auth_session_issued_at>",
  "userSubscriptions": [],
  "userSkills": [],
  "userSkillPassports": [],
  "userSalaryCountries": [],
  "userRightToWorks": [],
  "userProfessions": [],
  "userLanguages": [],
  "userInterests": [],
  "userFiles": [],
  "userEducations": [],
  "userCertificates": [],
  "userCareerHistories": []
}
```

</details>

**400** — Bad Request

**401** — Unauthorized

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firebase_uid": "string",
    "email": "string",
    "phone": "string",
    "photo_url": "string",
    "otp": "string"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/users/admin-accounts`

**Create new admin account (sys_admin only)**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `full_name` | string | **Yes** | — |
| `email` | string | **Yes** | — |
| `password` | string | **Yes** | — |
| `role` | `string` enum: `sys_admin`, `admin_viewer` | **Yes** | — |

#### Responses

**201** — Admin account created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusCode` | number | **Yes** | HTTP status code |
| `message` | string[] | **Yes** | Response messages (can contain multiple validation messages) |
| `error` | string | **Yes** | Error summary if request failed |
| `error_code` | string | **Yes** | Machine-readable error code for FE logic branching |
| `traceId` | string | **Yes** | Optional request trace identifier |
| `data` | CreateAdminAccountResponseDto | **Yes** | Response payload |

<details>
<summary>Example Response</summary>

```json
{
  "statusCode": 0,
  "message": [],
  "error": "<error>",
  "error_code": "<error_code>",
  "traceId": "<traceId>",
  "data": {}
}
```

</details>

**400** — Invalid payload or failed to create account

**403** — Forbidden - only sys_admin can create admin accounts

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/admin-accounts" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "string",
    "email": "string",
    "password": "string",
    "role": "sys_admin"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/users/change-password`

**Change Password a user**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `oldPassword` | string | **Yes** | — |
| `newPassword` | string | **Yes** | — |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/change-password" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "string",
    "newPassword": "string"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/users/forgot-password`

**Forgot Password a user**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | No | The email |

#### Responses

**200** — Password reset link has been sent

**401** — Unauthorized

**404** — User not found

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/forgot-password" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "<email>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/users/import-xls`

**UsersController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/users/public-request-otp`

**Send OTP to user email**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | **Yes** | — |

#### Responses

**200** — OTP sent successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | string | **Yes** | Human-readable status message for the OTP send request |
| `validUntil` | string | **Yes** | UTC timestamp indicating when the OTP will expire |

<details>
<summary>Example Response</summary>

```json
{
  "message": "<message>",
  "validUntil": "<validUntil>"
}
```

</details>

**400** — Invalid email or OTP email failed

**404** — User not found

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/public-request-otp" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "string"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/users/send-otp`

**Send OTP to user email or phone**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `type` | query | `string` enum: `email`, `sms` | No | Channel: email or sms. Default email. |

#### Responses

**200** — OTP sent successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | string | **Yes** | Human-readable status message for the OTP send request |
| `validUntil` | string | **Yes** | UTC timestamp indicating when the OTP will expire |

<details>
<summary>Example Response</summary>

```json
{
  "message": "<message>",
  "validUntil": "<validUntil>"
}
```

</details>

**400** — User has no phone data (when type=sms)

**404** — User not found

**429** — Too many OTP requests (rate limited)

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/send-otp" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/users/verify-otp`

**Verify user OTP (email or phone)**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `otp` | string | No | The OTP code sent to the user's email or phone |
| `type` | `string` enum: `email`, `sms` | No | Channel: email or sms. Default email. |

#### Responses

**200** — OTP verified successfully

**400** — Invalid or expired OTP

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/users/verify-otp" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "otp": "<otp>",
    "type": "email"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/users/{id}`

**Update a user**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firebase_uid` | string | No | — |
| `email` | string | No | The email address of the user |
| `phone` | string | No | — |
| `photo_url` | string | No | The photo profile URL |
| `otp` | string | No | — |
| `full_name` | string | No | The full name of the user |
| `gender` | string | No | The gender of the user |
| `region_id` | string | No | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `personal_summary` | string | No | The personal summary of the user |
| `availability` | string | No | The availability of the user |
| `employment_status` | string | **Yes** | The domicilie status of the user |
| `domicile_status` | string | **Yes** | The domicile status of the user |
| `preferred_work_types` | string | No | The preferred work types of the user |
| `preferred_locations` | object | No | — |

#### Responses

**200** — User updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `photo_url` | string | **Yes** | The photo profile URL |
| `full_name` | string | **Yes** | The full name of the user |
| `email` | string | **Yes** | The email address of the user |
| `gender` | `string` enum: `male`, `female`, `non-binary` | **Yes** | The gender of the user |
| `birth_year` | string | **Yes** | The birth year |
| `region_id` | string | **Yes** | The ID of the region the user belongs to |
| `is_outside_indo` | boolean | **Yes** | is outside indo |
| `other_country` | string | **Yes** | The other country out of indonesia |
| `other_region` | string | **Yes** | The other region out of indonesia |
| `postal_code` | string | **Yes** | The postal code of indonesia |
| `phone_last_4_digits` | string | **Yes** | The last 4 digits of the user's phone number |
| `personal_summary` | string | **Yes** | The personal summary of the user |
| `availability` | string | **Yes** | The availability of the user |
| `employment_status` | string | **Yes** | The domicilie status of the user |
| `domicile_status` | string | **Yes** | The domicile status of the user |
| `preferred_work_types` | string | **Yes** | The preferred work types of the user |
| `preferred_locations` | object | **Yes** | The preferred locations of the user |
| `salary_expectation` | string | **Yes** | The salary expectation of the user |
| `firebase_uid` | string | **Yes** | The Firebase UID of the user |
| `is_email_verified` | boolean | **Yes** | status email verified |
| `is_phone_verified` | boolean | **Yes** | status phone number verified |
| `is_school_verified` | boolean | **Yes** | status school verified |
| `is_skill_passport_verified` | boolean | **Yes** | status skill passport verified |
| `active_auth_session_id` | string | **Yes** | Current active auth session id |
| `active_auth_session_issued_at` | string | **Yes** | Current active auth session issued-at timestamp |
| `userSubscriptions` | UserSubscription[] | **Yes** | — |
| `userSkills` | UserSkill[] | **Yes** | — |
| `userSkillPassports` | UserSkillPassport[] | **Yes** | — |
| `userSalaryCountries` | UserSalaryCountry[] | **Yes** | — |
| `userRightToWorks` | UserRightToWork[] | **Yes** | — |
| `userProfessions` | UserProfession[] | **Yes** | — |
| `userLanguages` | UserLanguage[] | **Yes** | — |
| `userInterests` | UserInterest[] | **Yes** | — |
| `userFiles` | UserFile[] | **Yes** | — |
| `userEducations` | UserEducation[] | **Yes** | — |
| `userCertificates` | UserCertificate[] | **Yes** | — |
| `userCareerHistories` | UserCareerHistory[] | **Yes** | — |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "photo_url": "<photo_url>",
  "full_name": "<full_name>",
  "email": "<email>",
  "gender": "male",
  "birth_year": "<birth_year>",
  "region_id": "<region_id>",
  "is_outside_indo": true,
  "other_country": "<other_country>",
  "other_region": "<other_region>",
  "postal_code": "<postal_code>",
  "phone_last_4_digits": "<phone_last_4_digits>",
  "personal_summary": "<personal_summary>",
  "availability": "<availability>",
  "employment_status": "<employment_status>",
  "domicile_status": "<domicile_status>",
  "preferred_work_types": "<preferred_work_types>",
  "preferred_locations": {},
  "salary_expectation": "<salary_expectation>",
  "firebase_uid": "<firebase_uid>",
  "is_email_verified": true,
  "is_phone_verified": true,
  "is_school_verified": true,
  "is_skill_passport_verified": true,
  "active_auth_session_id": "<active_auth_session_id>",
  "active_auth_session_issued_at": "<active_auth_session_issued_at>",
  "userSubscriptions": [],
  "userSkills": [],
  "userSkillPassports": [],
  "userSalaryCountries": [],
  "userRightToWorks": [],
  "userProfessions": [],
  "userLanguages": [],
  "userInterests": [],
  "userFiles": [],
  "userEducations": [],
  "userCertificates": [],
  "userCareerHistories": []
}
```

</details>

**400** — Bad Request

**401** — Unauthorized

**404** — User not found

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/users/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firebase_uid": "string",
    "email": "<email>",
    "phone": "string",
    "photo_url": "<photo_url>",
    "otp": "string",
    "full_name": "<full_name>",
    "gender": "<gender>",
    "region_id": "<region_id>",
    "is_outside_indo": true,
    "other_country": "<other_country>",
    "other_region": "<other_region>",
    "postal_code": "<postal_code>",
    "personal_summary": "<personal_summary>",
    "availability": "<availability>",
    "employment_status": "<employment_status>",
    "domicile_status": "<domicile_status>",
    "preferred_work_types": "<preferred_work_types>",
    "preferred_locations": {}
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/users/{id}`

**Delete a user**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — User deleted successfully

**401** — Unauthorized

**403** — Forbidden - non-sysadmin can only delete self

**404** — User not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/users/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

