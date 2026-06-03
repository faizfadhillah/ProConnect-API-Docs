---
sidebar_position: 44
---

# Licenses

Manage the master list of professional licenses and certifications.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/mst-licenses/{id}` | Get a master license by ID |
| <span class="method-badge method-get">GET</span> | `/mst-licenses/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/mst-licenses` | Create a new master license |
| <span class="method-badge method-post">POST</span> | `/mst-licenses/import-xls` | MstLicensesController_uploadExcel |
| <span class="method-badge method-patch">PATCH</span> | `/mst-licenses/{id}` | Update a master license |
| <span class="method-badge method-delete">DELETE</span> | `/mst-licenses/{id}` | Delete a master license |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/mst-licenses/{id}`

**Get a master license by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**200** — Returns the master license.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `license_template_code` | string | No | The template code for the license (identifier/metadata) |
| `license_name` | string | **Yes** | The name of the license |
| `issuing_organization` | string | **Yes** | The organization that issued the license |
| `test_location` | string | No | The location where the test was taken |
| `assessor` | string | No | The name of the assessor |
| `certificate_level` | string | No | The level of the certificate |
| `standard_name` | string | No | The standard name |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_template_code": "<license_template_code>",
  "license_name": "<license_name>",
  "issuing_organization": "<issuing_organization>",
  "test_location": "<test_location>",
  "assessor": "<assessor>",
  "certificate_level": "<certificate_level>",
  "standard_name": "<standard_name>"
}
```

</details>

**404** — Master license not found.

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/mst-licenses/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/mst-licenses/search`

**Search with filters**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | query | string | No | — |
| `expands` | query | string | No | — |
| `page` | query | number | No | — |
| `limit` | query | number | No | — |
| `filters` | query | object | No | Dynamic filters for searching |
| `isExcel` | query | string | **Yes** | — |
| `sortBy` | query | object | No | Dynamic sorting |

#### Responses

**200** — Returns the list of licenses matching the search criteria.

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
curl -X GET "https://api.proconnectcareer.com/mst-licenses/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/mst-licenses`

**Create a new master license**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `license_template_code` | string | No | The template code for the license (identifier/metadata) |
| `license_name` | string | **Yes** | The name of the license |
| `issuing_organization` | string | **Yes** | The organization that issued the license |
| `test_location` | string | No | The location where the test was taken |
| `assessor` | string | No | The name of the assessor |
| `certificate_level` | string | No | The level of the certificate |
| `standard_name` | string | No | The standard name |

#### Responses

**201** — The master license has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `license_template_code` | string | No | The template code for the license (identifier/metadata) |
| `license_name` | string | **Yes** | The name of the license |
| `issuing_organization` | string | **Yes** | The organization that issued the license |
| `test_location` | string | No | The location where the test was taken |
| `assessor` | string | No | The name of the assessor |
| `certificate_level` | string | No | The level of the certificate |
| `standard_name` | string | No | The standard name |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_template_code": "<license_template_code>",
  "license_name": "<license_name>",
  "issuing_organization": "<issuing_organization>",
  "test_location": "<test_location>",
  "assessor": "<assessor>",
  "certificate_level": "<certificate_level>",
  "standard_name": "<standard_name>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-licenses" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "license_template_code": "<license_template_code>",
    "license_name": "<license_name>",
    "issuing_organization": "<issuing_organization>",
    "test_location": "<test_location>",
    "assessor": "<assessor>",
    "certificate_level": "<certificate_level>",
    "standard_name": "<standard_name>"
  }'
```

---

### <span class="method-badge method-post">POST</span> `/mst-licenses/import-xls`

**MstLicensesController_uploadExcel**

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/mst-licenses/import-xls" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-patch">PATCH</span> `/mst-licenses/{id}`

**Update a master license**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `license_template_code` | string | No | The template code for the license (identifier/metadata) |
| `license_name` | string | No | The name of the license |
| `issuing_organization` | string | No | The organization that issued the license |
| `test_location` | string | No | The location where the test was taken |
| `assessor` | string | No | The name of the assessor |
| `certificate_level` | string | No | The level of the certificate |
| `standard_name` | string | No | The standard name |

#### Responses

**200** — The master license has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The ID of the entity |
| `license_template_code` | string | No | The template code for the license (identifier/metadata) |
| `license_name` | string | **Yes** | The name of the license |
| `issuing_organization` | string | **Yes** | The organization that issued the license |
| `test_location` | string | No | The location where the test was taken |
| `assessor` | string | No | The name of the assessor |
| `certificate_level` | string | No | The level of the certificate |
| `standard_name` | string | No | The standard name |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "license_template_code": "<license_template_code>",
  "license_name": "<license_name>",
  "issuing_organization": "<issuing_organization>",
  "test_location": "<test_location>",
  "assessor": "<assessor>",
  "certificate_level": "<certificate_level>",
  "standard_name": "<standard_name>"
}
```

</details>

**404** — Master license not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/mst-licenses/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "license_template_code": "<license_template_code>",
    "license_name": "<license_name>",
    "issuing_organization": "<issuing_organization>",
    "test_location": "<test_location>",
    "assessor": "<assessor>",
    "certificate_level": "<certificate_level>",
    "standard_name": "<standard_name>"
  }'
```

---

### <span class="method-badge method-delete">DELETE</span> `/mst-licenses/{id}`

**Delete a master license**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The master license has been successfully deleted.

**404** — Master license not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/mst-licenses/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

