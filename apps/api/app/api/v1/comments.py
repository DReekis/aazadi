from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.article import Article
from app.models.comment import Comment
from app.schemas.comment import CommentCreate, CommentRead
from app.services.audit import write_audit_log

router = APIRouter(prefix="/articles/{article_id}/comments", tags=["discussion"])


@router.get("", response_model=list[CommentRead])
def list_comments(article_id: UUID, db: Session = Depends(get_db)) -> list[Comment]:
  return list(
    db.scalars(
      select(Comment)
      .where(Comment.article_id == article_id)
      .order_by(Comment.created_at.desc())
      .limit(100)
    )
  )


@router.post("", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
def create_comment(article_id: UUID, payload: CommentCreate, db: Session = Depends(get_db)) -> Comment:
  if not db.get(Article, article_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
  comment = Comment(
    article_id=article_id,
    author_display_name=payload.author_display_name,
    type=payload.type,
    body=payload.body,
  )
  db.add(comment)
  db.flush()
  write_audit_log(db, action="comment.create", resource_type="comment", resource_id=comment.id)
  db.commit()
  db.refresh(comment)
  return comment
