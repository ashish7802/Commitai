import json
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from google.generativeai import GenerativeModel
from pydantic import ValidationError

from models.commit import CommitDocument, CommitSuggestion, GenerateRequest, GenerateResponse
from core import AppContainer, get_container

router = APIRouter(prefix='/api', tags=['generate'])

PROMPT_TEMPLATE = """
You are CommitAI, an assistant that writes high-quality git commit messages.
Analyze the provided code diff and return exactly three commit suggestions.
The selected tone is: {tone}.

Requirements:
- Each message must be concise, imperative, and git-friendly.
- Prefer conventional-commit style when it fits naturally.
- Avoid markdown fences or extra commentary.
- Return strict JSON with this shape:
{{
  "suggestions": [
    {{"message": "...", "summary": "..."}},
    {{"message": "...", "summary": "..."}},
    {{"message": "...", "summary": "..."}}
  ]
}}

Diff:
{diff}
""".strip()


async def generate_with_gemini(diff: str, tone: str, model: GenerativeModel) -> List[CommitSuggestion]:
    response = await model.generate_content_async(PROMPT_TEMPLATE.format(diff=diff, tone=tone))
    text = (response.text or '').strip()
    if not text:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail='Gemini returned an empty response.')

    normalized = text.removeprefix('```json').removeprefix('```').removesuffix('```').strip()

    try:
        payload = json.loads(normalized)
        suggestions = [CommitSuggestion.model_validate(item) for item in payload['suggestions']]
    except (json.JSONDecodeError, KeyError, ValidationError) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail='Gemini returned an unexpected response format.',
        ) from exc

    if len(suggestions) != 3:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail='Gemini must return exactly three commit suggestions.',
        )

    return suggestions


@router.post('/generate', response_model=GenerateResponse)
async def generate_commit_messages(payload: GenerateRequest, container: AppContainer = Depends(get_container)):
    try:
        suggestions = await generate_with_gemini(payload.diff, payload.tone, container.get_gemini_model())
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail='Failed to generate commit suggestions.') from exc

    documents = [
        CommitDocument(
            diff=payload.diff,
            tone=payload.tone,
            message=suggestion.message,
            summary=suggestion.summary,
        )
        for suggestion in suggestions
    ]

    if container.history_collection is not None:
        serialized = [doc.model_dump(exclude={'id'}) for doc in documents]
        result = container.history_collection.insert_many(serialized)
        for inserted_id, document in zip(result.inserted_ids, documents):
            document.id = str(inserted_id)

    return GenerateResponse(suggestions=suggestions)
