from datetime import UTC, datetime, timedelta
from hashlib import sha256

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_request_ip
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.db.session import get_db
from app.models.auth import RefreshToken
from app.models.user import User
from app.schemas.auth import RefreshRequest, TokenPair, UserCreate, UserLogin, UserRead
from app.services.audit import write_audit_log

router = APIRouter(prefix="/auth", tags=["auth"])


def _fingerprint(raw_token: str) -> str:
  return sha256(raw_token.encode("utf-8")).hexdigest()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, request: Request, db: Session = Depends(get_db)) -> User:
  existing = db.scalar(select(User).where(User.email == payload.email.lower()))
  if existing:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

  user = User(
    email=payload.email.lower(),
    full_name=payload.full_name,
    password_hash=hash_password(payload.password),
  )
  db.add(user)
  db.flush()
  write_audit_log(
    db,
    action="auth.register",
    resource_type="user",
    resource_id=user.id,
    ip_address=get_request_ip(request),
    user_agent=request.headers.get("user-agent"),
  )
  db.commit()
  db.refresh(user)
  return user


@router.post("/login", response_model=TokenPair)
def login(payload: UserLogin, request: Request, db: Session = Depends(get_db)) -> TokenPair:
  user = db.scalar(select(User).where(User.email == payload.email.lower(), User.is_active.is_(True)))
  if not user or not verify_password(payload.password, user.password_hash):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

  raw_refresh, refresh_hash = create_refresh_token()
  refresh = RefreshToken(
    user_id=user.id,
    token_fingerprint=_fingerprint(raw_refresh),
    token_hash=refresh_hash,
    expires_at=datetime.now(UTC) + timedelta(days=settings.refresh_token_expire_days),
    created_by_ip=get_request_ip(request),
    user_agent=request.headers.get("user-agent"),
  )
  user.last_login_at = datetime.now(UTC)
  db.add(refresh)
  write_audit_log(
    db,
    action="auth.login",
    resource_type="user",
    actor_user_id=user.id,
    resource_id=user.id,
    ip_address=get_request_ip(request),
    user_agent=request.headers.get("user-agent"),
  )
  db.commit()
  return TokenPair(access_token=create_access_token(user.id, user.role.value), refresh_token=raw_refresh)


@router.post("/refresh", response_model=TokenPair)
def refresh_token(payload: RefreshRequest, request: Request, db: Session = Depends(get_db)) -> TokenPair:
  fingerprint = _fingerprint(payload.refresh_token)
  token = db.scalar(
    select(RefreshToken).where(
      RefreshToken.token_fingerprint == fingerprint,
      RefreshToken.revoked_at.is_(None),
      RefreshToken.expires_at > datetime.now(UTC),
    )
  )
  if not token or not verify_password(payload.refresh_token, token.token_hash):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

  user = token.user
  if not user or not user.is_active:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive")

  token.revoked_at = datetime.now(UTC)
  raw_refresh, refresh_hash = create_refresh_token()
  new_token = RefreshToken(
    user_id=user.id,
    token_fingerprint=_fingerprint(raw_refresh),
    token_hash=refresh_hash,
    expires_at=datetime.now(UTC) + timedelta(days=settings.refresh_token_expire_days),
    created_by_ip=get_request_ip(request),
    user_agent=request.headers.get("user-agent"),
  )
  db.add(new_token)
  write_audit_log(
    db,
    action="auth.refresh",
    resource_type="refresh_token",
    actor_user_id=user.id,
    resource_id=token.id,
    ip_address=get_request_ip(request),
  )
  db.commit()
  return TokenPair(access_token=create_access_token(user.id, user.role.value), refresh_token=raw_refresh)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
  payload: RefreshRequest,
  user: User = Depends(get_current_user),
  db: Session = Depends(get_db),
) -> None:
  token = db.scalar(select(RefreshToken).where(RefreshToken.token_fingerprint == _fingerprint(payload.refresh_token)))
  if token and token.user_id == user.id:
    token.revoked_at = datetime.now(UTC)
    write_audit_log(db, action="auth.logout", resource_type="refresh_token", actor_user_id=user.id, resource_id=token.id)
    db.commit()


@router.get("/me", response_model=UserRead)
def me(user: User = Depends(get_current_user)) -> User:
  return user
