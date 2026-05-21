# AAZADI Architecture

## System Shape

AAZADI V1 is a modular monolith with two deployable applications:

- Next.js web frontend for public journalism, governance transparency, journalist onboarding, and dashboards.
- FastAPI backend for content, evidence, governance, auth, audit logs, and API access.

The backend uses PostgreSQL as the system of record. Every trust-critical entity is relational, timestamped, and historically preserved.

## Module Boundaries

- `auth`: JWT access tokens, refresh tokens, RBAC, password hashing, 2FA-ready columns.
- `articles`: article lifecycle, publication state, integrity metadata, revisions.
- `evidence`: upload metadata, verification state, source links, storage abstraction.
- `governance`: public governance logs, votes, journalist approval decisions.
- `corrections`: public correction records and article correction status.
- `discussion`: structured comments typed as correction suggestions, evidence challenges, contextual additions, or public discussion.
- `reputation`: append-only reputation events for journalists.
- `audit`: append-only security and data-change logs.
- `api_keys`: future public API monetization and partner access.

## Federation-Ready Decisions

V1 does not implement decentralized protocols. It prepares for them by:

- using globally unique UUID primary keys,
- storing integrity hashes and canonical URLs,
- isolating upload storage behind a storage interface,
- preserving revisions rather than mutating article history,
- exposing stable REST resources,
- keeping governance logs public and append-only.

## Security Baseline

- JWT access tokens with refresh token records.
- Role-based authorization.
- Rate limiting middleware.
- Upload MIME and size validation.
- Audit logs for sensitive actions.
- 2FA-ready user columns.
- API keys stored as hashes with prefix lookup.

## Performance Baseline

- Server-rendered public pages.
- Minimal client-side JavaScript.
- CSS-first design system.
- Optimized image usage through Next.js.
- Medium-density layouts that avoid heavy animation and feed mechanics.
