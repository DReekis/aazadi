# API Structure

Base path: `/api/v1`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

## Articles

- `GET /articles`
- `POST /articles`
- `GET /articles/{slug}`
- `PATCH /articles/{article_id}`
- `POST /articles/{article_id}/submit`
- `POST /articles/{article_id}/publish`
- `GET /articles/{article_id}/revisions`

## Evidence

- `POST /evidence`
- `GET /evidence/{evidence_id}`
- `POST /evidence/{evidence_id}/verify`

## Journalists

- `POST /journalists/applications`
- `GET /journalists`
- `GET /journalists/{slug}`
- `POST /journalists/{journalist_id}/approve`

## Governance

- `GET /governance/logs`
- `POST /governance/logs`
- `POST /governance/logs/{log_id}/votes`

## Corrections

- `GET /corrections`
- `POST /corrections`

## Discussion

- `GET /articles/{article_id}/comments`
- `POST /articles/{article_id}/comments`

## Search

- `GET /search?q=...`

Public API monetization can be layered later through `api_keys`, scoped keys, and quota middleware without reshaping the resource model.
