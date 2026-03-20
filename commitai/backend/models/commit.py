from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field

ToneType = Literal['Professional', 'Fun', 'Short']


class GenerateRequest(BaseModel):
    diff: str = Field(..., min_length=10, max_length=20000)
    tone: ToneType = 'Professional'


class CommitSuggestion(BaseModel):
    message: str = Field(..., min_length=5, max_length=120)
    summary: str = Field(..., min_length=10, max_length=240)


class CommitDocument(BaseModel):
    id: Optional[str] = None
    diff: str
    tone: ToneType
    message: str
    summary: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class GenerateResponse(BaseModel):
    suggestions: List[CommitSuggestion]


class HistoryResponse(BaseModel):
    items: List[CommitDocument]
