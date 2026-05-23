---
sidebar_position: 16
---

# User Role Assignments

Manage role assignments for users within the RBAC permission system.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-role-assignments/active` | Get active role assignments for current active session |
| <span class="method-badge method-get">GET</span> | `/user-role-assignments/history` | Retrieve role assignment history for a specific user |
| <span class="method-badge method-post">POST</span> | `/user-role-assignments/cancel-incomplete-onboarding` | Cancel incomplete onboarding by account |
| <span class="method-badge method-post">POST</span> | `/user-role-assignments/users` | Scoped upsert assignments for a user (candidate/employer per HQ) |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-role-assignments/active`

**Get active role assignments for current active session**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Active role assignments found

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-role-assignments/active" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-role-assignments/history`

**Retrieve role assignment history for a specific user**

Fetches detailed role assignment history by user ID

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `userId` | query | string | **Yes** | User ID |
| `company_hq_id` | query | string | No | Company HQ ID for employer scope; omit or null for candidate scope |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |

#### Responses

**200** — Role assignment history retrieved successfully

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
curl -X GET "https://api.proconnectcareer.com/user-role-assignments/history" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-role-assignments/cancel-incomplete-onboarding`

**Cancel incomplete onboarding by account**

Without query: uses the active session row (user_accounts.is_active_session). With user_account_id: uses that row if it belongs to the authenticated user.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_account_id` | query | string | No | Optional user_accounts id; must be owned by the authenticated user. |

#### Responses

**200** — Incomplete onboarding cancelled

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusCode` | number | **Yes** | HTTP status code |
| `message` | string[] | **Yes** | Response messages (can contain multiple validation messages) |
| `error` | string | **Yes** | Error summary if request failed |
| `error_code` | string | **Yes** | Machine-readable error code for FE logic branching |
| `traceId` | string | **Yes** | Optional request trace identifier |
| `data` | object | **Yes** | Response payload |

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

**400** — Active session missing/invalid, unknown account, or onboarding already completed (wizard step 99)

**403** — Account not owned by caller, or no active employer assignment for this HQ

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-role-assignments/cancel-incomplete-onboarding" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-role-assignments/users`

**Scoped upsert assignments for a user (candidate/employer per HQ)**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | User ID |
| `company_hq_id` | string | No | Company HQ ID for employer scope; null for candidate scope |
| `role` | `string` enum: `sys_admin`, `candidate`, `employer`, `admin`, `admin_viewer`, `pic_school` | **Yes** | High-level role for this scope |
| `assignments` | object[] | No | Assignments for this user and scope. For non-employer roles (except PIC_SCHOOL), omitting assignments auto-populates one active assignment from scope role. Send an empty array to delete all assignments in scope. |
| `wizard_state` | object | No | Wizard state for this scope (optional) |
| `last_wizard_state` | number | No | Last wizard step index for this scope (optional) |

#### Responses

**200** — Assignments upserted successfully in the given scope

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusCode` | number | **Yes** | HTTP status code |
| `message` | string[] | **Yes** | Response messages (can contain multiple validation messages) |
| `error` | string | **Yes** | Error summary if request failed |
| `error_code` | string | **Yes** | Machine-readable error code for FE logic branching |
| `traceId` | string | **Yes** | Optional request trace identifier |
| `data` | object | **Yes** | Response payload |

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

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-role-assignments/users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "company_hq_id": "<company_hq_id>",
    "role": "sys_admin",
    "assignments": [],
    "wizard_state": {},
    "last_wizard_state": 0
  }'
```

---

