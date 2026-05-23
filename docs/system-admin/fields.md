---
sidebar_position: 60
---

# Fields

Manage dynamic form fields and field configurations.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/fields/{entity}` | FieldsController_getFields |
| <span class="method-badge method-get">GET</span> | `/fields/entities` | FieldsController_getEntities |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/fields/{entity}`

**FieldsController_getFields**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `entity` | path | string | **Yes** | — |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/fields/{entity}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-get">GET</span> `/fields/entities`

**FieldsController_getEntities**

**Authentication:** Required (Bearer Token)

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/fields/entities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

