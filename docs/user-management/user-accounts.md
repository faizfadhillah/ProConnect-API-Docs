---
sidebar_position: 15
---

# User Accounts

Manage user account linking and multi-account configurations.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-patch">PATCH</span> | `/user-role-assignments/user-accounts/active` | Set active session and/or after-login default |

## Endpoint Details

### <span class="method-badge method-patch">PATCH</span> `/user-role-assignments/user-accounts/active`

**Set active session and/or after-login default**

Set which user account is the active session and/or the default after next login. At least one field must be provided. If after-login is omitted and no row has it, auto-sets to the active session row.

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `active_session_account_id` | string | No | User account ID to set as active session. Omit if only updating after-login default. |
| `active_session_after_login_account_id` | string | No | User account ID to set as default active session after next login. Omit to auto-set from active session when none exists. |

#### Responses

**200** — Active session updated successfully

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

**400** — At least one account ID must be provided

**403** — Account does not belong to current user

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-role-assignments/user-accounts/active" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "active_session_account_id": "<active_session_account_id>",
    "active_session_after_login_account_id": "<active_session_after_login_account_id>"
  }'
```

---

