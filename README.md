# AAZADI

AAZADI is a serious constitutional civic journalism platform for evidence-first reporting, transparent correction history, journalist governance, and long-term institutional trust.

This repository contains a production-oriented V1 modular monolith:

- `apps/web`: Next.js App Router, TypeScript, TailwindCSS, responsive editorial interface.
- `apps/api`: FastAPI, PostgreSQL, SQLAlchemy, JWT auth, audit-ready REST API.
- `docs`: architecture, API, deployment, and product governance notes.

The current product surface includes:

- Public Pulse: structured civic awareness across India, world, states, cities, and issue categories.
- Civic Map: geographic public-reality browsing by region, district, issue, and verification state.
- The Newsroom: internal constitutional newsroom operating system.
- Evidence Vault, Governance Chamber, Regional Desks, Editorial Review Queue, Reputation Center, and Constitutional Records System.

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev:web
```

The web app runs at `http://localhost:3000`.

For the API:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`, with OpenAPI docs at `http://localhost:8000/docs`.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

## Product Principles

- Evidence over virality.
- Verification over speed.
- Transparency over opacity.
- Accountability over popularity.
- Structured civic discussion, not chaotic social feeds.

## Architecture

AAZADI V1 is intentionally centralized, fast, and practical. The module boundaries, storage abstraction, integrity metadata, and API design leave room for future federation, decentralized storage, and public civic information infrastructure without forcing that complexity into the first release.
