from datetime import UTC, datetime, timedelta
from secrets import token_urlsafe
from uuid import UUID

import jwt
from pwdlib import PasswordHash

from app.core.config import settings

password_hasher = PasswordHash.recommended()


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return password_hasher.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
  return password_hasher.hash(password)


def create_access_token(subject: UUID, role: str) -> str:
  expires_at = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)
  payload = {"sub": str(subject), "role": role, "exp": expires_at, "type": "access"}
  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_refresh_token() -> tuple[str, str]:
  raw_token = token_urlsafe(48)
  return raw_token, hash_password(raw_token)


def decode_token(token: str) -> dict:
  return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])


def hash_api_key(raw_key: str) -> str:
  return hash_password(raw_key)


def verify_api_key(raw_key: str, key_hash: str) -> bool:
  return verify_password(raw_key, key_hash)
