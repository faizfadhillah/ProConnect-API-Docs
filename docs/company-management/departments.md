---
sidebar_position: 26
---

# Departments

Manage department records within companies for organizational structure.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-departments` | Get all departments |
| <span class="method-badge method-get">GET</span> | `/mst-departments/{id}` | Get department by ID |
| <span class="method-badge method-get">GET</span> | `/mst-departments/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-departments` | Create new department |
| <span class="method-badge method-put">PUT</span> | `/mst-departments/{id}` | Update department by ID |
| <span class="method-badge method-delete">DELETE</span> | `/mst-departments/{id}` | Delete department by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-departments`

**Get all departments**

Retrieve all departments

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Departments retrieved successfully

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-departments" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-departments/{id}`

**Get department by ID**

Retrieve a department by its ID

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Department retrieved successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>"
}
```

</details>

**404** — Department not found

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-departments/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-departments/search`

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
| `isExcel` | query | string | **Yes** | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of departments matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/mst-departments/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-departments`

**Create new department**

Create a new department with automatic PRIVATE flag and PUBLISHED status

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dept_code` | string | **Yes** | Department code (abbreviation, max 10 characters) |
| `dept_name` | string | **Yes** | Department name (max 255 characters) |
| `flag` | `string` enum: `GLOBAL`, `PRIVATE` | No | Department flag |
| `status` | `string` enum: `PUBLISHED`, `UNPUBLISHED` | No | Department status |
| `companyHqId` | string | No | Company HQ ID to map the department to (optional) |

#### Responses

**201** — Department created successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>"
}
```

</details>

**400** — Bad request - validation errors

**401** — Unauthorized

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-departments" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dept_code": "<dept_code>",
    "dept_name": "<dept_name>",
    "flag": "GLOBAL",
    "status": "PUBLISHED",
    "companyHqId": "<companyHqId>"
  }'
```

---

### <span class="method-badge method-put">PUT</span> `/mst-departments/{id}`

**Update department by ID**

Update a department by its ID

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dept_code` | string | No | Department code (abbreviation, max 10 characters) |
| `dept_name` | string | No | Department name (max 255 characters) |
| `flag` | `string` enum: `GLOBAL`, `PRIVATE` | No | Department flag |
| `status` | `string` enum: `PUBLISHED`, `UNPUBLISHED` | No | Department status |

#### Responses

**200** — Department updated successfully

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>"
}
```

</details>

**404** — Department not found

#### Example Request

```bash
curl -X PUT "https://api.proconnectcareer.com/mst-departments/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dept_code": "<dept_code>",
    "dept_name": "<dept_name>",
    "flag": "GLOBAL",
    "status": "PUBLISHED"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-departments/{id}`

**Delete department by ID**

Delete a department by its ID if not mapped to any company

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Department deleted successfully

**400** — Cannot delete department that is mapped to companies

**404** — Department not found

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-departments/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

