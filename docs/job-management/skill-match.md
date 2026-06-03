---
sidebar_position: 23
---

# Skill Match

Match user skills against job requirements to provide compatibility scores and recommendations.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/skill-match/detail` | Get detailed skill match information between job and applicant |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/skill-match/detail`

**Get detailed skill match information between job and applicant**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `job_id` | query | string | **Yes** | Job ID (UUID) |
| `applicant_user_id` | query | string | **Yes** | Applicant User ID (UUID) |

#### Responses

**200** — Returns detailed skill match information

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `job_name` | string | **Yes** | Job name (title) |
| `percentage` | number | **Yes** | Skill match percentage (0-100 or -1 if no skills in job) |
| `is_education_match` | boolean | **Yes** | Flag indicating if match is due to education-profession mapping and job title matches profession name |
| `user` | UserInfoDto | **Yes** | User information |
| `verified_match_skills` | string[] | **Yes** | List of verified skill names that match job requirements |
| `unverified_match_skills` | string[] | **Yes** | List of unverified skill names that match job requirements |
| `unmatched_job_skills` | string[] | **Yes** | List of job skill names that user doesn't have |

<details>
<summary>Example Response</summary>

```json
{
  "job_name": "<job_name>",
  "percentage": 0,
  "is_education_match": true,
  "user": {},
  "verified_match_skills": [],
  "unverified_match_skills": [],
  "unmatched_job_skills": []
}
```

</details>

**400** — Bad request - missing or invalid parameters

**401** — Unauthorized

**404** — Job or user not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/skill-match/detail" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

