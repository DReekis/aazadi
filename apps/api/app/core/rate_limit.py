from collections import defaultdict, deque
from time import monotonic
from typing import Deque

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint


class InMemoryRateLimitMiddleware(BaseHTTPMiddleware):
  """Simple process-local rate limiting for V1 and development deployments.

  Production multi-instance deployments should replace this with Redis-backed limits.
  """

  def __init__(self, app, requests: int, window_seconds: int) -> None:
    super().__init__(app)
    self.requests = requests
    self.window_seconds = window_seconds
    self._hits: dict[str, Deque[float]] = defaultdict(deque)

  async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
    client = request.client.host if request.client else "unknown"
    now = monotonic()
    hits = self._hits[client]

    while hits and now - hits[0] > self.window_seconds:
      hits.popleft()

    if len(hits) >= self.requests:
      return Response("Rate limit exceeded", status_code=429)

    hits.append(now)
    return await call_next(request)
