---
sidebar_position: 67
---

# Email Queue Monitoring

Monitor and manage the email sending queue for system notifications.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/internal/email-queue/email-logs` | Get email logs with associated queue job information |
| <span class="method-badge method-get">GET</span> | `/internal/email-queue/jobs` | Get detailed information about all jobs in the email queue |
| <span class="method-badge method-get">GET</span> | `/internal/email-queue/metrics` | Get email queue performance metrics |
| <span class="method-badge method-get">GET</span> | `/internal/email-queue/status` | Get email queue status and statistics |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/internal/email-queue/email-logs`

**Get email logs with associated queue job information**

Returns email logs enriched with queue job status, retry information, and estimated processing times.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `limit` | query | number | No | Maximum number of email logs to return (default: 50) |
| `offset` | query | number | No | Number of email logs to skip (default: 0) |
| `status` | query | string | No | Filter by email status (PENDING, RETRY_NEEDED, FAILED, SUCCESS) |
| `type` | query | string | No | Filter by email type |

#### Responses

**200** — Email logs with queue status retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailLogs` | EmailLogWithQueueDto[] | **Yes** | List of email logs with queue information |
| `total` | number | **Yes** | Total number of email logs |
| `limit` | number | **Yes** | Pagination limit |
| `offset` | number | **Yes** | Pagination offset |

<details>
<summary>Example Response</summary>

```json
{
  "emailLogs": [],
  "total": 0,
  "limit": 0,
  "offset": 0
}
```

</details>

**400** — Invalid query parameters

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/internal/email-queue/email-logs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/internal/email-queue/jobs`

**Get detailed information about all jobs in the email queue**

Returns detailed information about all jobs currently in the queue, including their status, timestamps, and data.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `limit` | query | number | No | Maximum number of jobs to return (default: 50) |
| `offset` | query | number | No | Number of jobs to skip (default: 0) |

#### Responses

**200** — Queue jobs retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobs` | JobDetailsDto[] | **Yes** | List of jobs in the queue |
| `total` | number | **Yes** | Total number of jobs |
| `limit` | number | **Yes** | Pagination limit |
| `offset` | number | **Yes** | Pagination offset |

<details>
<summary>Example Response</summary>

```json
{
  "jobs": [],
  "total": 0,
  "limit": 0,
  "offset": 0
}
```

</details>

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/internal/email-queue/jobs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/internal/email-queue/metrics`

**Get email queue performance metrics**

Returns performance metrics for the email queue including success rates, processing times, and throughput statistics.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `timeRangeHours` | query | number | No | Time range in hours for metrics calculation (default: 24) |

#### Responses

**200** — Queue metrics retrieved successfully

**400** — Invalid query parameters

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/internal/email-queue/metrics" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/internal/email-queue/status`

**Get email queue status and statistics**

Returns comprehensive information about the email queue including job counts, Redis connection status, and performance metrics.

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Queue status retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | string | **Yes** | Queue name |
| `isConnected` | boolean | **Yes** | Redis connection status |
| `statistics` | QueueStatisticsDto | **Yes** | Queue statistics |
| `lastUpdated` | string | **Yes** | Timestamp of last update |

<details>
<summary>Example Response</summary>

```json
{
  "queueName": "<queueName>",
  "isConnected": true,
  "statistics": {},
  "lastUpdated": "<lastUpdated>"
}
```

</details>

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/internal/email-queue/status" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

