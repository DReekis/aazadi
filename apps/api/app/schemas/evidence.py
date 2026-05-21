from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl

from app.models.enums import EvidenceType, VerificationState


class EvidenceCreate(BaseModel):
  article_id: UUID | None = None
  title: str = Field(min_length=4, max_length=240)
  type: EvidenceType
  source_url: HttpUrl | None = None
  transcript_text: str | None = None
  storage_uri: str | None = None
  mime_type: str | None = None
  byte_size: int | None = Field(default=None, ge=0)
  sha256_hash: str | None = None


class EvidenceRead(BaseModel):
  id: UUID
  article_id: UUID | None
  title: str
  type: EvidenceType
  verification_state: VerificationState
  storage_uri: str | None
  source_url: str | None
  mime_type: str | None
  byte_size: int | None
  sha256_hash: str | None
  uploaded_at: datetime
  verified_at: datetime | None

  model_config = {"from_attributes": True}


class EvidenceVerify(BaseModel):
  verification_state: VerificationState
  note: str | None = Field(default=None, max_length=1000)
