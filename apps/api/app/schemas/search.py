from pydantic import BaseModel

from app.schemas.article import ArticleRead
from app.schemas.governance import GovernanceLogRead
from app.schemas.journalist import JournalistRead


class SearchResponse(BaseModel):
  articles: list[ArticleRead]
  journalists: list[JournalistRead]
  governance: list[GovernanceLogRead]
