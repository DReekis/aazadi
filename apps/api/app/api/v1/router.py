from fastapi import APIRouter

from app.api.v1 import articles, auth, comments, corrections, evidence, governance, journalists, newsroom, search

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(articles.router)
api_router.include_router(evidence.router)
api_router.include_router(journalists.router)
api_router.include_router(governance.router)
api_router.include_router(newsroom.router)
api_router.include_router(corrections.router)
api_router.include_router(comments.router)
api_router.include_router(search.router)
