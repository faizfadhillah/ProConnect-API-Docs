---
sidebar_position: 57
---

# RBAC / Permissions

Manage role-based access control, permissions, and authorization rules.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/rbac/all-menus` | RbacController_getMenuItems |
| <span class="method-badge method-get">GET</span> | `/rbac/all-routes` | List of unassigned routes |
| <span class="method-badge method-get">GET</span> | `/rbac/search` | Search with filters |
| <span class="method-badge method-get">GET</span> | `/rbac/test-route` | Test RBAC route matching |
| <span class="method-badge method-post">POST</span> | `/rbac` | Create a new RBAC entry |
| <span class="method-badge method-post">POST</span> | `/rbac/assign-routes` | Assign routes to a role |
| <span class="method-badge method-post">POST</span> | `/rbac/revoke-routes` | Revoke routes from a role |
| <span class="method-badge method-post">POST</span> | `/rbac/seed` | Seed RBAC data |
| <span class="method-badge method-patch">PATCH</span> | `/rbac/{id}` | Update an RBAC entry |
| <span class="method-badge method-delete">DELETE</span> | `/rbac/{id}` | Delete an RBAC entry |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/rbac/all-menus`

**RbacController_getMenuItems**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/rbac/all-menus" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/rbac/all-routes`

**List of unassigned routes**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `role` | query | string | **Yes** | — |

#### Responses

**201** — Returns the list of unassigned routes

**400** — Bad request.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/rbac/all-routes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/rbac/search`

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
curl -X GET "https://api.proconnectcareer.com/rbac/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/rbac/test-route`

**Test RBAC route matching**

Public endpoint to test if a specific path and method would be allowed for a user. Useful for debugging RBAC configurations.

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `userId` | query | string | **Yes** | User ID to test permissions for |
| `path` | query | string | **Yes** | Request path to test (e.g., '/jobs/123', '/mst-companies/:id') |
| `method` | query | string | **Yes** | HTTP method to test (e.g., 'GET', 'POST', 'PATCH', 'DELETE') |

#### Responses

**200** — Returns route matching test results

**400** — Bad request - missing required parameters

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/rbac/test-route" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/rbac`

**Create a new RBAC entry**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | **Yes** | The name of the role |
| `role_permission` | string | **Yes** | The name of the role |
| `type` | `string` enum: `role`, `permission`, `route`, `sub_role` | **Yes** | The type of the role |
| `method` | `string` enum: `ALL`, `GET`, `POST`, `PATCH`, `DELETE` | **Yes** | The method of the role |
| `meta` | string | **Yes** | The permissions associated with the role |
| `description` | string | **Yes** | The description of the role |

#### Responses

**201** — The RBAC entry has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `type` | `string` enum: `role`, `permission`, `route`, `sub_role` | **Yes** | The of type the role/routes |
| `name` | string | **Yes** | The name of the role |
| `parent_role` | string | **Yes** | The parent role of the RBAC entry |
| `method` | `string` enum: `ALL`, `GET`, `POST`, `PATCH`, `DELETE` | **Yes** | The method of the routes |
| `description` | string | **Yes** | The description of the role |
| `meta` | object | **Yes** | The permissions associated with the role |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "type": "role",
  "name": "<name>",
  "parent_role": "<parent_role>",
  "method": "ALL",
  "description": "<description>",
  "meta": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/rbac" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<name>",
    "role_permission": "<role_permission>",
    "type": "role",
    "method": "ALL",
    "meta": "<meta>",
    "description": "<description>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/rbac/assign-routes`

**Assign routes to a role**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rolePermission` | string | **Yes** | Role to which the route is assigned |
| `routes` | string[] | **Yes** | Route name(s) to be assigned |

#### Responses

**201** — Routes assigned successfully.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/rbac/assign-routes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rolePermission": "<rolePermission>",
    "routes": []
  }'
```

---

### <span class="method-badge method-post">POST</span> `/rbac/revoke-routes`

**Revoke routes from a role**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rolePermission` | string | **Yes** | Role from which the route is revoked |
| `routes` | string[] | **Yes** | Route name(s) to be revoked |

#### Responses

**201** — Routes revoked successfully.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/rbac/revoke-routes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rolePermission": "<rolePermission>",
    "routes": []
  }'
```

---

### <span class="method-badge method-post">POST</span> `/rbac/seed`

**Seed RBAC data**

Executes RBAC seeding logic similar to migration. Checks for existing entries before inserting.

**Authentication:** Required (Bearer Token)

#### Responses

**201** — RBAC seeding completed successfully.

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/rbac/seed" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/rbac/{id}`

**Update an RBAC entry**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The RBAC entry has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `type` | `string` enum: `role`, `permission`, `route`, `sub_role` | **Yes** | The of type the role/routes |
| `name` | string | **Yes** | The name of the role |
| `parent_role` | string | **Yes** | The parent role of the RBAC entry |
| `method` | `string` enum: `ALL`, `GET`, `POST`, `PATCH`, `DELETE` | **Yes** | The method of the routes |
| `description` | string | **Yes** | The description of the role |
| `meta` | object | **Yes** | The permissions associated with the role |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "type": "role",
  "name": "<name>",
  "parent_role": "<parent_role>",
  "method": "ALL",
  "description": "<description>",
  "meta": {}
}
```

</details>

**404** — RBAC entry not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/rbac/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/rbac/{id}`

**Delete an RBAC entry**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The RBAC entry has been successfully deleted.

**404** — RBAC entry not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/rbac/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

