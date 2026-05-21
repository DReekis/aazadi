from collections.abc import Callable
from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.user import User

bearer_scheme = HTTPBearer(auto_error=False)


def get_request_ip(request: Request) -> str | None:
  forwarded = request.headers.get("x-forwarded-for")
  if forwarded:
    return forwarded.split(",")[0].strip()
  return request.client.host if request.client else None


def get_current_user(
  credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
  db: Session = Depends(get_db),
) -> User:
  if credentials is None:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

  try:
    payload = decode_token(credentials.credentials)
    if payload.get("type") != "access":
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
    user_id = UUID(payload["sub"])
  except (jwt.PyJWTError, KeyError, ValueError):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from None

  user = db.scalar(select(User).where(User.id == user_id, User.is_active.is_(True)))
  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
  return user


def require_roles(*roles: UserRole) -> Callable[[User], User]:
  def dependency(user: User = Depends(get_current_user)) -> User:
    if user.role not in roles:
      raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
    return user

  return dependency
