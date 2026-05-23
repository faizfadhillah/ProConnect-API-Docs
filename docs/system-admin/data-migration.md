---
sidebar_position: 66
---

# Data Migration

Tools for migrating data between systems and environments.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-post">POST</span> | `/data-migration/migrate-phone-last-4-digits` | Migrate phone last 4 digits for existing users |
| <span class="method-badge method-post">POST</span> | `/data-migration/migrate-user-education-major-ids` | Migrate major_id for user educations |

## Endpoint Details

### <span class="method-badge method-post">POST</span> `/data-migration/migrate-phone-last-4-digits`

**Migrate phone last 4 digits for existing users**

Gets all users, decrypts their phone numbers from encrypted_user_data, and extracts/saves the last 4 digits to users.phone_last_4_digits

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Migration completed successfully

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/data-migration/migrate-phone-last-4-digits" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/data-migration/migrate-user-education-major-ids`

**Migrate major_id for user educations**

Gets all user educations with major_id null but major string not empty, finds or creates majors, and updates major_id

**Authentication:** Required (Bearer Token)

#### Responses

**201** — Migration completed successfully

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/data-migration/migrate-user-education-major-ids" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

