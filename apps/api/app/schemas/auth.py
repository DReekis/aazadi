from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.models.enums import UserRole


class UserCreate(BaseModel):
  email: EmailStr
  full_name: str = Field(min_length=2, max_length=160)
  password: str = Field(min_length=12, max_length=128)


class UserLogin(BaseModel):
  email: EmailStr
  password: str


class UserRead(BaseModel):
  id: UUID
  email: EmailStr
  full_name: str
  role: UserRole
  is_active: bool
  is_verified: bool
  two_factor_enabled: bool
  created_at: datetime

  model_config = {"from_attributes": True}


class TokenPair(BaseModel):
  access_token: str
  refresh_token: str
  token_type: str = "bearer"


class RefreshRequest(BaseModel):
  refresh_token: str
