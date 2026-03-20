const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

async function parseResponse(response) {
  if (!response.ok) {
    let message = 'Request failed';

    try {
      const payload = await response.json();
      message = payload.detail || payload.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response.json();
}

export async function generateMessages(payload) {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  return parseResponse(response);
}

export async function getHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    cache: 'no-store',
  });

  return parseResponse(response);
}

export async function deleteHistoryItem(id) {
  const response = await fetch(`${API_BASE_URL}/api/history/${id}`, {
    method: 'DELETE',
  });

  return parseResponse(response);
}
