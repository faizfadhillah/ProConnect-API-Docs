---
sidebar_position: 37
---

# Notifications

Manage push notifications via Firebase Cloud Messaging for real-time alerts.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/firebase/list-notification` | FirebaseController_getNotifications |
| <span class="method-badge method-get">GET</span> | `/firebase/notifications/by-sent-at` | Get notifications before sentAt |
| <span class="method-badge method-get">GET</span> | `/firebase/orphan-emails` | Get orphan emails |
| <span class="method-badge method-get">GET</span> | `/firebase/orphan-users` | Get orphan users |
| <span class="method-badge method-post">POST</span> | `/firebase/orphan-users/{id}/create-firebase-user` | Create Firebase user for database orphan user |
| <span class="method-badge method-post">POST</span> | `/firebase/orphan-users/bulk-create-firebase-users` | Bulk create Firebase users for database orphan users |
| <span class="method-badge method-post">POST</span> | `/firebase/read-notification/{id}` | FirebaseController_readNotification |
| <span class="method-badge method-post">POST</span> | `/firebase/save-token` | Save FCM Token |
| <span class="method-badge method-post">POST</span> | `/firebase/send-notification` | FirebaseController_sendNotification |
| <span class="method-badge method-delete">DELETE</span> | `/firebase/notifications/by-sent-at` | Delete notifications before sentAt |
| <span class="method-badge method-delete">DELETE</span> | `/firebase/orphan-user/{uid}` | Delete Firebase orphan user |
| <span class="method-badge method-delete">DELETE</span> | `/firebase/orphan-users/bulk` | Bulk delete Firebase orphan users |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/firebase/list-notification`

**FirebaseController_getNotifications**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/firebase/list-notification" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/firebase/notifications/by-sent-at`

**Get notifications before sentAt**

Mengambil list notification dengan sentAt lebih kecil/sama dengan beforeSentAt.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `beforeSentAt` | query | number | **Yes** | Unix timestamp (milliseconds) |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/firebase/notifications/by-sent-at" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/firebase/orphan-emails`

**Get orphan emails**

Mendapatkan list email yang terdaftar di Firebase Auth tetapi tidak ada di sistem. Berguna untuk mengidentifikasi akun yang nyangkut ketika login.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `maxResults` | query | number | No | Maximum number of Firebase users to check (default: 1000) |

#### Responses

**200** — Successfully retrieved orphan emails

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orphanEmails` | OrphanEmailDto[] | **Yes** | List of orphan emails |
| `totalOrphans` | number | **Yes** | Total number of orphan emails found |
| `totalFirebaseUsers` | number | **Yes** | Total number of users in Firebase Auth |
| `totalSystemUsers` | number | **Yes** | Total number of users in system database |

<details>
<summary>Example Response</summary>

```json
{
  "orphanEmails": [],
  "totalOrphans": 0,
  "totalFirebaseUsers": 0,
  "totalSystemUsers": 0
}
```

</details>

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/firebase/orphan-emails" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/firebase/orphan-users`

**Get orphan users**

Mendapatkan list users yang ada di database tetapi firebase_uid-nya tidak ada di Firebase Auth. Berguna untuk mengidentifikasi akun yang ada di database tapi tidak bisa login.

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Successfully retrieved orphan users

**500** — Internal server error

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/firebase/orphan-users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/firebase/orphan-users/{id}/create-firebase-user`

**Create Firebase user for database orphan user**

Membuat Firebase Auth user baru untuk user yang ada di database tapi firebase_uid-nya tidak ada di Firebase Auth. Akan membuat Firebase user baru dan update firebase_uid di database.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Firebase user created successfully or already exists

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `success` | boolean | **Yes** | Operation success status |
| `message` | string | **Yes** | Operation result message |
| `firebase_uid` | string | No | Firebase UID of created user |

<details>
<summary>Example Response</summary>

```json
{
  "success": true,
  "message": "<message>",
  "firebase_uid": "<firebase_uid>"
}
```

</details>

**404** — User not found

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/firebase/orphan-users/{id}/create-firebase-user" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/firebase/orphan-users/bulk-create-firebase-users`

**Bulk create Firebase users for database orphan users**

Membuat multiple Firebase Auth users sekaligus untuk users yang ada di database tapi firebase_uid-nya tidak ada di Firebase Auth.

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIds` | string[] | **Yes** | Array of user IDs to create Firebase users for |

#### Responses

**200** — Bulk creation completed

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `successCount` | number | **Yes** | Number of successfully created users |
| `failureCount` | number | **Yes** | Number of failed creations |
| `errors` | object[] | **Yes** | List of errors for failed creations |

<details>
<summary>Example Response</summary>

```json
{
  "successCount": 0,
  "failureCount": 0,
  "errors": []
}
```

</details>

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/firebase/orphan-users/bulk-create-firebase-users" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userIds": []
  }'
```

---

### <span class="method-badge method-post">POST</span> `/firebase/read-notification/{id}`

**FirebaseController_readNotification**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/firebase/read-notification/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/firebase/save-token`

**Save FCM Token**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | string | No | The fcm token to the user's email |

#### Responses

**200** — FCM Token saved successfully

**400** — Invalid or expired FCM Token

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/firebase/save-token" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "<token>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/firebase/send-notification`

**FirebaseController_sendNotification**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | **Yes** | — |
| `body` | string | **Yes** | — |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/firebase/send-notification" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "string",
    "body": "string"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/firebase/notifications/by-sent-at`

**Delete notifications before sentAt**

Menghapus semua notification dengan sentAt lebih kecil/sama dengan beforeSentAt.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `beforeSentAt` | query | number | **Yes** | Unix timestamp (milliseconds) |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/firebase/notifications/by-sent-at" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-delete">DELETE</span> `/firebase/orphan-user/{uid}`

**Delete Firebase orphan user**

Menghapus user dari Firebase Auth berdasarkan UID. Berguna untuk membersihkan akun orphan.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uid` | path | string | **Yes** | — |

#### Responses

**200** — User deleted successfully or deletion failed

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `success` | boolean | **Yes** | Operation success status |
| `message` | string | **Yes** | Operation result message |

<details>
<summary>Example Response</summary>

```json
{
  "success": true,
  "message": "<message>"
}
```

</details>

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/firebase/orphan-user/{uid}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-delete">DELETE</span> `/firebase/orphan-users/bulk`

**Bulk delete Firebase orphan users**

Menghapus multiple Firebase users sekaligus berdasarkan array UIDs.

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uids` | string[] | **Yes** | Array of Firebase UIDs to delete |

#### Responses

**200** — Bulk deletion completed

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `successCount` | number | **Yes** | Number of successfully deleted users |
| `failureCount` | number | **Yes** | Number of failed deletions |
| `errors` | object[] | **Yes** | List of errors for failed deletions |

<details>
<summary>Example Response</summary>

```json
{
  "successCount": 0,
  "failureCount": 0,
  "errors": []
}
```

</details>

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/firebase/orphan-users/bulk" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "uids": []
  }'
```

---

