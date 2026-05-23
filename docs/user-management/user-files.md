---
sidebar_position: 2
---

# User Files

Manage files and documents uploaded by users including resumes, portfolios, and other attachments.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-files` | Get all UserFiles |
| <span class="method-badge method-get">GET</span> | `/user-files/{id}` | Get a UserFile by ID |
| <span class="method-badge method-get">GET</span> | `/user-files/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/user-files/user_id/{user_id}` | Get a UserFile by user_id |
| <span class="method-badge method-post">POST</span> | `/user-files` | Create a new UserFile |
| <span class="method-badge method-patch">PATCH</span> | `/user-files/{id}` | Update a UserFile by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-files/{id}` | Delete a UserFile by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-files`

**Get all UserFiles**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Returns the list of all UserFiles.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-files/{id}`

**Get a UserFile by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the UserFile with the specified ID.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user file |
| `user_id` | string | **Yes** | The ID of the user who owns this file |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `png`, `jpeg`, `webp` | **Yes** | The type of the file |
| `file_url` | string | **Yes** | The URL where the file is stored |
| `uploaded_at` | string | **Yes** | The date and time when the file was uploaded |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "file_name": "<file_name>",
  "file_type": "pdf",
  "file_url": "<file_url>",
  "uploaded_at": "<uploaded_at>"
}
```

</details>

**404** — UserFile not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-files/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `isExcel` | query | string | No | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of users matching the search criteria.

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

**400** — Bad request.

**401** — Unauthorized

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-files/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/user-files/user_id/{user_id}`

**Get a UserFile by user_id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the UserFile(s) associated with the specified user_id.

**404** — No UserFile found for the specified user_id.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/user-files/user_id/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-files`

**Create a new UserFile**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user who uploaded the file |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `png`, `jpeg`, `webp` | **Yes** | The type of the file (pdf, doc, docx, xls, xlsx, jpg, png, other) |
| `file_url` | string | **Yes** | The URL of the file |

#### Responses

**201** — The UserFile has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user file |
| `user_id` | string | **Yes** | The ID of the user who owns this file |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `png`, `jpeg`, `webp` | **Yes** | The type of the file |
| `file_url` | string | **Yes** | The URL where the file is stored |
| `uploaded_at` | string | **Yes** | The date and time when the file was uploaded |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "file_name": "<file_name>",
  "file_type": "pdf",
  "file_url": "<file_url>",
  "uploaded_at": "<uploaded_at>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "file_name": "<file_name>",
    "file_type": "pdf",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-files/{id}`

**Update a UserFile by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserFile has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user file |
| `user_id` | string | **Yes** | The ID of the user who owns this file |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `png`, `jpeg`, `webp` | **Yes** | The type of the file |
| `file_url` | string | **Yes** | The URL where the file is stored |
| `uploaded_at` | string | **Yes** | The date and time when the file was uploaded |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "file_name": "<file_name>",
  "file_type": "pdf",
  "file_url": "<file_url>",
  "uploaded_at": "<uploaded_at>"
}
```

</details>

**400** — Bad request.

**404** — UserFile not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-files/{id}`

**Delete a UserFile by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserFile has been successfully deleted.

**404** — UserFile not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-files/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

