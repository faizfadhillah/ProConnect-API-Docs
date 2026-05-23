---
sidebar_position: 2
---

# Base URL & Request Format

## Base URL

All API requests should be made to:

```
https://api.proconnectcareer.com
```

## Request Format

### Content Type

All request bodies must be sent as JSON:

```
Content-Type: application/json
```

### Standard Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer <token>` — Firebase Auth token |
| `Content-Type` | Yes (for POST/PUT/PATCH) | `application/json` |
| `Accept` | Optional | `application/json` |

### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/users/me" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```

## URL Structure

Endpoints follow RESTful conventions:

```
https://api.proconnectcareer.com/{resource}
https://api.proconnectcareer.com/{resource}/{id}
https://api.proconnectcareer.com/{resource}/{id}/{sub-resource}
```

### Examples

| Pattern | Example | Description |
|---------|---------|-------------|
| List resources | `GET /users` | Get all users |
| Get single | `GET /users/:id` | Get user by ID |
| Create | `POST /users` | Create new user |
| Update | `PATCH /users/:id` | Update user fields |
| Delete | `DELETE /users/:id` | Delete a user |
| Sub-resource | `GET /users/:id/skills` | Get user's skills |

## HTTP Methods

| Method | Usage |
|--------|-------|
| <span class="method-badge method-get">GET</span> | Retrieve resources |
| <span class="method-badge method-post">POST</span> | Create new resources |
| <span class="method-badge method-put">PUT</span> | Replace a resource entirely |
| <span class="method-badge method-patch">PATCH</span> | Partial update of a resource |
| <span class="method-badge method-delete">DELETE</span> | Remove a resource |

## Rate Limiting

The API applies rate limiting to protect service availability. If you exceed the limit, you will receive a `429 Too Many Requests` response.

| Tier | Limit |
|------|-------|
| Standard | 100 requests/minute |
| Authenticated | 300 requests/minute |
| Admin | 1000 requests/minute |
