from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.rate_limit import InMemoryRateLimitMiddleware

app = FastAPI(
  title=settings.project_name,
  description="Evidence-first constitutional civic journalism API",
  version="0.1.0",
  openapi_url=f"{settings.api_v1_prefix}/openapi.json",
  docs_url="/docs",
  redoc_url="/redoc",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.cors_origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
app.add_middleware(
  InMemoryRateLimitMiddleware,
  requests=settings.rate_limit_requests,
  window_seconds=settings.rate_limit_window_seconds,
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
  return {"status": "ok", "service": settings.project_name}
