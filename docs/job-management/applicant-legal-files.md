---
sidebar_position: 21
---

# Applicant Legal Files

Manage legal documents and files submitted by applicants during the hiring process.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/applicant-legal-files` | Get all applicant legal files |
| <span class="method-badge method-get">GET</span> | `/applicant-legal-files/{applicantId}` | Get applicant legal files by applicant ID |
| <span class="method-badge method-get">GET</span> | `/applicant-legal-files/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/applicant-legal-files` | Create a new applicant legal file |
| <span class="method-badge method-patch">PATCH</span> | `/applicant-legal-files/{applicantId}` | Update an applicant legal file |
| <span class="method-badge method-delete">DELETE</span> | `/applicant-legal-files/{applicantId}` | Delete an applicant legal file |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/applicant-legal-files`

**Get all applicant legal files**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicant-legal-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicant-legal-files/{applicantId}`

**Get applicant legal files by applicant ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `applicantId` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/applicant-legal-files/{applicantId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/applicant-legal-files/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `expands` | query | string | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
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
curl -X GET "https://api.proconnectcareer.com/applicant-legal-files/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/applicant-legal-files`

**Create a new applicant legal file**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicant_id` | string | **Yes** | The id of the applicant |
| `file_name` | string | **Yes** | The name of the file |
| `file_type` | `string` enum: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `jpeg`, `png`, `other` | **Yes** | The type of the file (pdf, doc, docx, xls, xlsx, jpg, png, other) |
| `file_url` | string | **Yes** | The URL of the file |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/applicant-legal-files" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "applicant_id": "<applicant_id>",
    "file_name": "<file_name>",
    "file_type": "pdf",
    "file_url": "<file_url>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/applicant-legal-files/{applicantId}`

**Update an applicant legal file**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `applicantId` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/applicant-legal-files/{applicantId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/applicant-legal-files/{applicantId}`

**Delete an applicant legal file**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `applicantId` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/applicant-legal-files/{applicantId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

