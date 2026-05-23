---
sidebar_position: 3
---

# Error Handling & Response Format

## Standard Response Envelope

All API responses use a consistent envelope format:

```json
{
  "statusCode": 200,
  "message": ["Success"],
  "error": "",
  "error_code": "",
  "traceId": "req-abc-123-def-456",
  "data": { }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `statusCode` | `number` | HTTP status code |
| `message` | `string[]` | Response messages (may contain multiple validation messages) |
| `error` | `string` | Error summary if request failed |
| `error_code` | `string` | Machine-readable error code for frontend logic branching |
| `traceId` | `string` | Request trace identifier for debugging |
| `data` | `object` | Response payload (null on error) |

## HTTP Status Codes

### Success Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PATCH, PUT, DELETE |
| `201` | Created | Successful POST (resource created) |

### Client Error Codes

| Code | Meaning | Common Cause |
|------|---------|-------------|
| `400` | Bad Request | Invalid request body, missing required fields, validation errors |
| `401` | Unauthorized | Missing or invalid authentication token |
| `403` | Forbidden | Insufficient permissions for the requested action |
| `404` | Not Found | Resource does not exist |
| `409` | Conflict | Duplicate resource or constraint violation |
| `422` | Unprocessable Entity | Valid JSON but semantically incorrect data |
| `429` | Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `500` | Internal Server Error | Contact support with the `traceId` |
| `502` | Bad Gateway | Retry after a few seconds |
| `503` | Service Unavailable | Service is temporarily down, retry later |

## Error Response Examples

### Validation Error (400)

```json
{
  "statusCode": 400,
  "message": [
    "email must be a valid email address",
    "phone must be a string"
  ],
  "error": "Bad Request",
  "error_code": "VALIDATION_ERROR",
  "traceId": "req-abc-123",
  "data": null
}
```

### Unauthorized (401)

```json
{
  "statusCode": 401,
  "message": ["Unauthorized"],
  "error": "Unauthorized",
  "error_code": "UNAUTHORIZED",
  "traceId": "req-def-456",
  "data": null
}
```

### Not Found (404)

```json
{
  "statusCode": 404,
  "message": ["User not found"],
  "error": "Not Found",
  "error_code": "NOT_FOUND",
  "traceId": "req-ghi-789",
  "data": null
}
```

## Error Handling Best Practices

1. **Always check `statusCode`** — Do not rely solely on HTTP status codes; check the response body.
2. **Parse `message` array** — Validation errors return multiple messages, one per field.
3. **Use `error_code`** — Build frontend logic using machine-readable error codes.
4. **Log `traceId`** — Include in support tickets for faster debugging.
5. **Handle network errors** — Implement retry logic with exponential backoff for 5xx errors.
