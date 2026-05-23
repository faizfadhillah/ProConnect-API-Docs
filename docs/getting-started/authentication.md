---
sidebar_position: 1
---

# Authentication

ProConnect API uses **Firebase Authentication** with Bearer tokens for all protected endpoints.

## Overview

All API requests must include a valid access token in the `Authorization` header:

```
Authorization: Bearer <your_access_token>
```

## Getting a Token

### 1. Firebase Authentication

ProConnect uses Firebase Auth as the identity provider. Users authenticate via:

- **Email/Password** — Standard email and password login
- **Phone OTP** — SMS-based one-time password verification
- **Social Login** — Google, Apple, or other OAuth providers

### 2. Obtain Firebase ID Token

After authenticating with Firebase, obtain the ID token:

```javascript
// Firebase Web SDK
const idToken = await firebase.auth().currentUser.getIdToken();
```

### 3. Activate Session

After login, activate your API session:

```bash
curl -X POST "https://api.proconnectcareer.com/auth/session/activate" \
  -H "Authorization: Bearer <firebase_id_token>" \
  -H "Content-Type: application/json"
```

This rotates the session marker and applies any active account preferences.

## Token Usage

Include the token in every API request:

```bash
curl "https://api.proconnectcareer.com/users/me" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json"
```

## Token Refresh

Firebase tokens expire after **1 hour**. Refresh before expiry:

```javascript
// Auto-refresh with Firebase SDK
firebase.auth().onIdTokenChanged(async (user) => {
  if (user) {
    const token = await user.getIdToken();
    // Update your API client with new token
  }
});
```

## Role-Based Access

ProConnect implements RBAC (Role-Based Access Control). Different endpoints require different permission levels:

| Role | Description | Access Level |
|------|-------------|--------------|
| `user` | Standard job seeker | Own profile, job applications |
| `company_admin` | Company administrator | Company management, job postings |
| `admin` | Platform administrator | Full system access |
| `super_admin` | Super administrator | All permissions + system config |

## Error Responses

| Status | Error Code | Description |
|--------|------------|-------------|
| `401` | `UNAUTHORIZED` | Missing or invalid token |
| `403` | `FORBIDDEN` | Insufficient permissions |
| `419` | `SESSION_EXPIRED` | Token has expired, refresh required |

```json
{
  "statusCode": 401,
  "message": ["Unauthorized"],
  "error": "Unauthorized",
  "error_code": "UNAUTHORIZED",
  "traceId": "trace-abc-123",
  "data": null
}
```
