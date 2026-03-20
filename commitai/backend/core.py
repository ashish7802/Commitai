import os
from dataclasses import dataclass
from functools import lru_cache
from typing import Optional

import google.generativeai as genai
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.collection import Collection

load_dotenv()


@dataclass
class AppContainer:
    history_collection: Optional[Collection]
    mongo_client: Optional[MongoClient]

    def get_gemini_model(self) -> genai.GenerativeModel:
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise RuntimeError('Missing GEMINI_API_KEY environment variable.')

        genai.configure(api_key=api_key)
        return genai.GenerativeModel('gemini-pro')


@lru_cache
def get_container() -> AppContainer:
    mongo_uri = os.getenv('MONGODB_URI')
    mongo_db_name = os.getenv('MONGODB_DB_NAME', 'commitai')
    mongo_client = None
    history_collection = None

    if mongo_uri:
        mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=3000)
        database = mongo_client[mongo_db_name]
        history_collection = database['commit_history']

    return AppContainer(history_collection=history_collection, mongo_client=mongo_client)
