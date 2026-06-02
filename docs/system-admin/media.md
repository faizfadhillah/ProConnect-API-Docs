---
sidebar_position: 59
---

# Media

Manage media file uploads, storage, and retrieval.

## Authentication

All endpoints in this section require authentication via Bearer token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <your_access_token>
```

## Endpoints Overview

| Method | Path | Summary |
|--------|------|---------|
| <span class="method-badge method-get">GET</span> | `/media/{category}/{mediaId}` | MediaController_downloadMedia |
| <span class="method-badge method-post">POST</span> | `/media` | Upload a media file |

## Endpoint Details

### <span class="method-badge method-get">GET</span> `/media/{category}/{mediaId}`

**MediaController_downloadMedia**

**Authentication:** Required (Bearer Token)

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `category` | path | string | No | Category of the media file |
| `mediaId` | path | string | **Yes** | ID of the media file |

#### Responses

**200** — Success

#### Example Request

```bash
curl -X GET "https://api.proconnectcareer.com/media/{category}/{mediaId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

### <span class="method-badge method-post">POST</span> `/media`

**Upload a media file**

**Authentication:** Required (Bearer Token)

#### Request Body

Content-Type: `multipart/form-data`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | string | No | — |
| `category` | string | No | Category of the media file as subpath or folder |

#### Responses

**201** — Success

#### Example Request

```bash
curl -X POST "https://api.proconnectcareer.com/media" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "file": "string",
    "category": "<category>"
  }'
```

---

