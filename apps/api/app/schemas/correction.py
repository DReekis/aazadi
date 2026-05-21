from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.enums import CorrectionSeverity, CorrectionStatus


class CorrectionCreate(BaseModel):
  article_id: UUID
  severity: CorrectionSeverity
  summary: str = Field(min_length=12)
  public_note: str | None = None


class CorrectionRead(BaseModel):
  id: UUID
  article_id: UUID
  severity: CorrectionSeverity
  status: CorrectionStatus
  summary: str
  public_note: str | None
  issued_at: datetime
  resolved_at: datetime | None

  model_config = {"from_attributes": True}
