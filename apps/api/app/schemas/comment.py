from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.enums import CommentStatus, CommentType


class CommentCreate(BaseModel):
  author_display_name: str = Field(min_length=2, max_length=160)
  type: CommentType
  body: str = Field(min_length=12, max_length=4000)


class CommentRead(BaseModel):
  id: UUID
  article_id: UUID
  author_display_name: str
  type: CommentType
  status: CommentStatus
  body: str
  created_at: datetime
  resolved_at: datetime | None

  model_config = {"from_attributes": True}
