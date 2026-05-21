from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.models.enums import JournalistStatus


class JournalistApplicationCreate(BaseModel):
  full_name: str = Field(min_length=2, max_length=160)
  email: EmailStr
  region: str = Field(min_length=2, max_length=120)
  affiliation: str | None = Field(default=None, max_length=180)
  evidence_practice_statement: str = Field(min_length=40)
  work_samples: list[str] = Field(default_factory=list)
  conflicts_disclosure: str | None = None


class JournalistApplicationRead(BaseModel):
  id: UUID
  full_name: str
  email: EmailStr
  region: str
  status: JournalistStatus
  created_at: datetime

  model_config = {"from_attributes": True}


class JournalistRead(BaseModel):
  id: UUID
  slug: str
  display_name: str
  title: str
  region: str
  bio: str
  beats: list[str]
  status: JournalistStatus
  reliability_score: Decimal
  verified_reports_count: int
  correction_count: int
  governance_participation_score: Decimal

  model_config = {"from_attributes": True}
