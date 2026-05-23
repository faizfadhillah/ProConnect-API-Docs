---
sidebar_position: 58
---

# Configs

Manage system configuration settings and feature flags.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/configs` | Get all configs |
| <span class="method-badge method-get">GET</span> | `/configs/{id}` | Get a config by ID |
| <span class="method-badge method-get">GET</span> | `/configs/key/{key}` | Get a config by key |
| <span class="method-badge method-get">GET</span> | `/configs/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/configs` | Create a new config |
| <span class="method-badge method-patch">PATCH</span> | `/configs/{id}` | Update a config by ID |
| <span class="method-badge method-delete">DELETE</span> | `/configs/{id}` | Delete a config by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/configs`

**Get all configs**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Returns the list of configs.

**400** — Bad request.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/configs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/configs/{id}`

**Get a config by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the config with the specified ID.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `key` | string | **Yes** | The key of the config |
| `description` | string | **Yes** | The description of the config |
| `value` | object | **Yes** | The value of the config |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "key": "<key>",
  "description": "<description>",
  "value": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/configs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/configs/key/{key}`

**Get a config by key**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `key` | path | string | **Yes** | — |

#### Responses

**200** — Returns the config with the specified key.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `key` | string | **Yes** | The key of the config |
| `description` | string | **Yes** | The description of the config |
| `value` | object | **Yes** | The value of the config |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "key": "<key>",
  "description": "<description>",
  "value": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/configs/key/{key}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/configs/search`

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
curl -X GET "https://api.proconnectcareer.com/configs/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/configs`

**Create a new config**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | **Yes** | — |
| `description` | string | **Yes** | — |
| `value` | jsonb | **Yes** | — |

#### Responses

**201** — The config has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `key` | string | **Yes** | The key of the config |
| `description` | string | **Yes** | The description of the config |
| `value` | object | **Yes** | The value of the config |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "key": "<key>",
  "description": "<description>",
  "value": {}
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/configs" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "string",
    "description": "string",
    "value": {}
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/configs/{id}`

**Update a config by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | string | No | — |
| `description` | string | No | — |
| `value` | jsonb | No | — |

#### Responses

**200** — The config has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `key` | string | **Yes** | The key of the config |
| `description` | string | **Yes** | The description of the config |
| `value` | object | **Yes** | The value of the config |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "key": "<key>",
  "description": "<description>",
  "value": {}
}
```

</details>

**400** — Bad request.

**404** — Config not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/configs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "string",
    "description": "string",
    "value": {}
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/configs/{id}`

**Delete a config by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The config has been successfully deleted.

**404** — Config not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/configs/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

