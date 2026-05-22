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

Article creation requires:

- `geographic_scope`: `world`, `india`, `state`, `city`
- `topic_category`: `governance`, `judiciary`, `education`, `environment`, `economy`, `infrastructure`, `corruption`, `elections`, `health`, `public_welfare`
- `content_depth`: `pulse_update`, `standard_report`, `investigation`, `evidence_archive`
- `urgency`: `breaking`, `developing`, `ongoing`, `archived`
- `editorial_verification_state`: `preliminary`, `reviewed`, `verified`, `disputed`

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

## Newsroom OS

- `GET /newsroom/pulse`
- `POST /newsroom/pulse`
- `GET /newsroom/investigations`
- `POST /newsroom/investigations`
- `GET /newsroom/investigations/{workspace_id}`
- `GET /newsroom/civic-map`
- `POST /newsroom/civic-map`
- `GET /newsroom/governance-proposals`
- `POST /newsroom/governance-proposals`

Public API monetization can be layered later through `api_keys`, scoped keys, and quota middleware without reshaping the resource model.
