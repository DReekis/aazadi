# Deployment

## Recommended V1 Deployment

- PostgreSQL managed database.
- FastAPI container behind a reverse proxy.
- Next.js container deployed close to users.
- Object storage mounted through the storage abstraction when moving beyond local uploads.

## Environment

Use `.env.example` as the contract for required settings. Production must set:

- `JWT_SECRET_KEY` to a long random secret.
- `DATABASE_URL` to the managed PostgreSQL connection string.
- `CORS_ORIGINS` to the production web origin.
- upload MIME and byte limits according to newsroom policy.

## Database

Run:

```bash
cd apps/api
alembic upgrade head
```

## Health Checks

- API: `GET /health`
- Web: Next.js root route.

## Security Notes

- Store refresh tokens and API keys only as hashes.
- Terminate TLS at the platform edge or reverse proxy.
- Use a malware scanning step before marking uploaded evidence as verified.
- Put uploads behind private object storage and issue short-lived access URLs in production.
