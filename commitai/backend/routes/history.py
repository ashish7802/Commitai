from typing import List

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from core import AppContainer, get_container
from models.commit import CommitDocument, HistoryResponse

router = APIRouter(prefix='/api/history', tags=['history'])


def serialize_document(document: dict) -> CommitDocument:
    return CommitDocument(
        id=str(document['_id']),
        diff=document['diff'],
        tone=document['tone'],
        message=document['message'],
        summary=document['summary'],
        created_at=document['created_at'],
    )


@router.get('', response_model=HistoryResponse)
async def list_history(container: AppContainer = Depends(get_container)):
    if container.history_collection is None:
        return HistoryResponse(items=[])

    documents: List[CommitDocument] = [
        serialize_document(item)
        for item in container.history_collection.find().sort('created_at', -1)
    ]
    return HistoryResponse(items=documents)


@router.delete('/{item_id}')
async def delete_history_item(item_id: str, container: AppContainer = Depends(get_container)):
    if container.history_collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='History storage is not configured.')

    try:
        object_id = ObjectId(item_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid history item id.') from exc

    result = container.history_collection.delete_one({'_id': object_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='History item not found.')

    return {'message': 'History item deleted successfully.'}
