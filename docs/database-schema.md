# Database Schema

AAZADI uses PostgreSQL with UUID primary keys and append-friendly audit tables.

## Identity and Access

- `users`: account, role, password hash, 2FA-ready fields, active/verified flags.
- `refresh_tokens`: hashed refresh tokens, fingerprint lookup, expiry and revocation.
- `api_keys`: hashed partner/API keys, scopes, quota, expiry, revocation.
- `audit_logs`: append-only security and data-change trail.

## Journalism

- `journalist_applications`: onboarding workflow, work samples, evidence practice statement, review state.
- `journalist_profiles`: approved journalist trust profile, beats, region, reliability, correction and governance metrics.
- `articles`: current article state, publication metadata, verification status, integrity hash.
- `article_revisions`: immutable article snapshots and diff summaries. No silent edits.
- `evidence`: uploaded or linked evidence, type, verification state, hash, storage URI, uploader and verifier.
- `corrections`: public correction records tied to articles.

## Civic Discussion and Governance

- `comments`: structured discussion entries by civic function.
- `governance_logs`: public institutional decisions, actor, summary, outcome, resource pointer.
- `governance_votes`: governance participation records.
- `reputation_events`: append-only reliability and accountability events.
- `subscriptions`: public support and future membership/subscription records.

## Historical Preservation

Core historical records are not overwritten:

- Article changes create `article_revisions`.
- Corrections create `corrections`.
- Governance actions create `governance_logs`.
- Reputation changes create `reputation_events`.
- Security-sensitive actions create `audit_logs`.

The initial Alembic migration builds the schema from SQLAlchemy metadata so models and migrations share a single V1 source of truth.
