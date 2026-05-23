---
sidebar_position: 12
---

# User Salary Country

Manage user salary expectations and country-specific salary preferences.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/user-salary-country/search` | Search with filters |
| <span class="method-badge method-post">POST</span> | `/user-salary-country` | Create a new UserSalaryCountry |
| <span class="method-badge method-patch">PATCH</span> | `/user-salary-country/{id}` | Update a UserSalaryCountry by ID |
| <span class="method-badge method-delete">DELETE</span> | `/user-salary-country/{id}` | Delete a UserSalaryCountry by ID |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/user-salary-country/search`

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
curl -X GET "https://api.proconnectcareer.com/user-salary-country/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/user-salary-country`

**Create a new UserSalaryCountry**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `application/json`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_id` | string | **Yes** | The id of the user |
| `salary_country_id` | string | **Yes** | The id of the SalaryCountry |
| `min_salary` | string | **Yes** | The min of the SalaryCountry |
| `max_salary` | string | **Yes** | The max of the SalaryCountry |

#### Responses

**201** — The UserSalaryCountry has been successfully created.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user SalaryCountry |
| `user_id` | string | **Yes** | The ID of the user |
| `salary_pay_interval` | string | **Yes** | The salary pay interval |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `min_salary` | string | **Yes** | The min of the SalaryCountry |
| `max_salary` | string | **Yes** | The max of the SalaryCountry |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "salary_pay_interval": "<salary_pay_interval>",
  "salary_country_id": "<salary_country_id>",
  "min_salary": "<min_salary>",
  "max_salary": "<max_salary>"
}
```

</details>

**400** — Bad request.

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/user-salary-country" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "<user_id>",
    "salary_country_id": "<salary_country_id>",
    "min_salary": "<min_salary>",
    "max_salary": "<max_salary>"
  }'
```

---

### <span class="method-badge method-patch">PATCH</span> `/user-salary-country/{id}`

**Update a UserSalaryCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Request Body

Content-Type: `application/json`


#### Responses

**200** — The UserSalaryCountry has been successfully updated.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **Yes** | The unique identifier of the user SalaryCountry |
| `user_id` | string | **Yes** | The ID of the user |
| `salary_pay_interval` | string | **Yes** | The salary pay interval |
| `salary_country_id` | string | **Yes** | The ID of the SalaryCountry |
| `min_salary` | string | **Yes** | The min of the SalaryCountry |
| `max_salary` | string | **Yes** | The max of the SalaryCountry |

<details>
<summary>Example Response</summary>

```json
{
  "id": "<id>",
  "user_id": "<user_id>",
  "salary_pay_interval": "<salary_pay_interval>",
  "salary_country_id": "<salary_country_id>",
  "min_salary": "<min_salary>",
  "max_salary": "<max_salary>"
}
```

</details>

**400** — Bad request.

**404** — UserSalaryCountry not found.

#### Example Request

```bash
curl -X PATCH "https://api.proconnectcareer.com/user-salary-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### <span class="method-badge method-delete">DELETE</span> `/user-salary-country/{id}`

**Delete a UserSalaryCountry by ID**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `id` | path | string | **Yes** | — |

#### Responses

**204** — The UserSalaryCountry has been successfully deleted.

**404** — UserSalaryCountry not found.

#### Example Request

```bash
curl -X DELETE "https://api.proconnectcareer.com/user-salary-country/{id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

