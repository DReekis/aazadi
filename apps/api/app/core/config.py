from functools import lru_cache
from typing import Annotated

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
  model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

  project_name: str = "AAZADI"
  environment: str = "development"
  api_v1_prefix: str = "/api/v1"
  database_url: str = "postgresql+psycopg://aazadi:aazadi@localhost:5432/aazadi"

  jwt_secret_key: Annotated[str, Field(min_length=24)] = "change-me-with-a-long-random-secret"
  jwt_algorithm: str = "HS256"
  access_token_expire_minutes: int = 20
  refresh_token_expire_days: int = 30

  cors_origins: list[str] = ["http://localhost:3000"]
  rate_limit_requests: int = 120
  rate_limit_window_seconds: int = 60

  upload_storage_backend: str = "local"
  upload_local_root: str = "./uploads"
  allowed_upload_mime_types: list[str] = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "text/plain",
  ]
  max_upload_bytes: int = 10 * 1024 * 1024

  @field_validator("cors_origins", "allowed_upload_mime_types", mode="before")
  @classmethod
  def parse_csv(cls, value: object) -> object:
    if isinstance(value, str):
      return [item.strip() for item in value.split(",") if item.strip()]
    return value


@lru_cache
def get_settings() -> Settings:
  return Settings()


settings = get_settings()
