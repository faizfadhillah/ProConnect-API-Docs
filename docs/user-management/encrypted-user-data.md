---
sidebar_position: 14
---

# Encrypted User Data

Access and manage encrypted sensitive user data such as identity documents and personal identifiers.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/encrypted-user-data` | Get all encrypted user data |
| <span class="method-badge method-get">GET</span> | `/encrypted-user-data/{user_id}` | Get encrypted user data by user id |
| <span class="method-badge method-get">GET</span> | `/encrypted-user-data/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/encrypted-user-data` | Create encrypted user data |
| <span class="method-badge method-patch">PATCH</span> | `/encrypted-user-data/{user_id}` | Update encrypted user data by user id |
| <span class="method-badge method-delete">DELETE</span> | `/encrypted-user-data/{user_id}` | Delete encrypted user data by user id |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/encrypted-user-data`

**Get all encrypted user data**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/encrypted-user-data" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/encrypted-user-data/{user_id}`

**Get encrypted user data by user id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/encrypted-user-data/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/encrypted-user-data/search`

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
| `isExcel` | query | object | No | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of users matching the search criteria.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `items` | object[] | **Yes** | Array of items |
| `meta` | Meta | **Yes** | Pagination metadata |

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
curl -X GET "https://api.proconnectcareer.com/encrypted-user-data/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/encrypted-user-data`

**Create encrypted user data**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `encrypted_date_of_birth` | string | **Yes** | The plain date of birth |
| `encrypted_nik` | string | **Yes** | The plain of NIK |
| `encrypted_phone` | string | **Yes** | The plain text of phone |
| `encrypted_address` | string | **Yes** | The address |
| `country_code` | string | **Yes** | The country code |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/encrypted-user-data" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "encrypted_date_of_birth": "<encrypted_date_of_birth>",
    "encrypted_nik": "<encrypted_nik>",
    "encrypted_phone": "<encrypted_phone>",
    "encrypted_address": "<encrypted_address>",
    "country_code": "<country_code>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/encrypted-user-data/{user_id}`

**Update encrypted user data by user id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — Success

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/encrypted-user-data/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/encrypted-user-data/{user_id}`

**Delete encrypted user data by user id**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `user_id` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/encrypted-user-data/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

