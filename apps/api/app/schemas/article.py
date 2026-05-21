from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.enums import ArticleStatus, VerificationState


class ArticleCreate(BaseModel):
  title: str = Field(min_length=8, max_length=260)
  subtitle: str = Field(min_length=12, max_length=420)
  category: str = Field(min_length=2, max_length=120)
  region: str = Field(min_length=2, max_length=120)
  author_id: UUID
  body_markdown: str = Field(min_length=80)


class ArticleUpdate(BaseModel):
  title: str | None = Field(default=None, min_length=8, max_length=260)
  subtitle: str | None = Field(default=None, min_length=12, max_length=420)
  category: str | None = None
  region: str | None = None
  body_markdown: str | None = Field(default=None, min_length=80)
  diff_summary: str = Field(min_length=12, max_length=1000)


class ArticleRead(BaseModel):
  id: UUID
  slug: str
  title: str
  subtitle: str
  category: str
  region: str
  status: ArticleStatus
  verification_status: VerificationState
  reading_minutes: int
  published_at: datetime | None
  integrity_hash: str | None
  created_at: datetime
  updated_at: datetime

  model_config = {"from_attributes": True}


class ArticleRevisionRead(BaseModel):
  id: UUID
  article_id: UUID
  version: int
  title: str
  subtitle: str
  diff_summary: str
  integrity_hash: str | None
  created_at: datetime

  model_config = {"from_attributes": True}
