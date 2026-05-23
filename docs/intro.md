---
slug: /
sidebar_position: 0
title: Introduction
---

# ProConnect API Documentation

Welcome to the **ProConnect API** — the backend powering the ProConnect Professional Career Connection Platform.

## What is ProConnect?

ProConnect is a comprehensive career platform that connects job seekers with employers through intelligent skill matching, verified credentials, and streamlined hiring pipelines. The API provides programmatic access to all platform features.

## API Overview

| Property | Value |
|----------|-------|
| **Base URL** | `https://api.proconnectcareer.com` |
| **API Version** | 1.0 |
| **Protocol** | HTTPS (TLS 1.2+) |
| **Format** | JSON |
| **Authentication** | Bearer Token (Firebase Auth) |

## Key Capabilities

### User Management
Create and manage professional profiles with rich data including education, skills, certifications, career history, and work authorization.

### Job Management
Post jobs, define hiring pipeline steps, manage applicants, and leverage AI-powered skill matching.

### Company Management
Build company profiles, manage departments, and handle employer branding.

### Social & Communication
Social feed with posts, professional events, groups, and real-time notifications.

### Master Data
Comprehensive reference data including schools, professions, skills, regions, and more.

### System & Admin
RBAC permissions, configurations, media management, bulk operations, and monitoring.

## Quick Start

### 1. Authenticate

All API requests require a valid Bearer token:

```bash
curl -X POST "https://api.proconnectcareer.com/auth/session/activate" \
  -H "Authorization: Bearer <your_firebase_token>" \
  -H "Content-Type: application/json"
```

### 2. Make Your First Request

Fetch the current user profile:

```bash
curl "https://api.proconnectcareer.com/users/me" \
  -H "Authorization: Bearer <your_access_token>"
```

### 3. Explore the API

Browse the sidebar to explore all available endpoints organized by domain.

## Response Format

All API responses follow a consistent envelope format:

```json
{
  "statusCode": 200,
  "message": ["Success"],
  "error": "",
  "error_code": "",
  "traceId": "abc-123-def",
  "data": { }
}
```

## Need Help?

- **OpenAPI Spec**: [https://api.proconnectcareer.com/api-json](https://api.proconnectcareer.com/api-json)
- **GitHub**: [https://github.com/Ogah-Rugi/ProConnect-CMS](https://github.com/Ogah-Rugi/ProConnect-CMS)
