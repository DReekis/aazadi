from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.enums import GovernanceCategory, VoteValue


class GovernanceLogCreate(BaseModel):
  title: str = Field(min_length=6, max_length=260)
  category: GovernanceCategory
  public_summary: str = Field(min_length=20)
  outcome: str = Field(min_length=3, max_length=260)
  resource_type: str | None = None
  resource_id: UUID | None = None


class GovernanceLogRead(BaseModel):
  id: UUID
  title: str
  category: GovernanceCategory
  public_summary: str
  outcome: str
  resource_type: str | None
  resource_id: UUID | None
  created_at: datetime

  model_config = {"from_attributes": True}


class GovernanceVoteCreate(BaseModel):
  vote: VoteValue
  rationale: str | None = Field(default=None, max_length=1000)
