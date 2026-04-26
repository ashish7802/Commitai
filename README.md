<div align="center">

# 🤖 CommitAI

### AI-powered Git commit message generator — paste your diff, get 3 perfect commits.

![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/commitai?style=for-the-badge&color=6366f1)
![Forks](https://img.shields.io/github/forks/YOUR_USERNAME/commitai?style=for-the-badge&color=6366f1)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-FastAPI-blue?style=for-the-badge&logo=python)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-commitai.vercel.app-6366f1?style=for-the-badge)](https://commitai.vercel.app)

</div>

---

## 🎯 What is CommitAI?

Stop writing bad commit messages like `fix stuff` or `updated files`.

Paste your code diff → CommitAI generates **3 AI-powered commit message suggestions** using Google Gemini — in seconds.

---

## ✨ Features

- ✅ Paste any git diff → get 3 commit suggestions instantly
- ✅ 3 tone modes — **Professional / Fun / Short**
- ✅ One-click copy to clipboard
- ✅ Full commit history dashboard
- ✅ MongoDB-backed persistence
- ✅ Dark theme UI — clean & minimal
- ✅ REST API — fully documented

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 + Tailwind CSS |
| Backend | Python + FastAPI |
| AI | Google Gemini API |
| Database | MongoDB + Mongoose |

---

## 🚀 Quick Start

### Backend
```bash
cd commitai/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your keys
uvicorn main:app --reload
```

### Frontend
```bash
cd commitai/frontend
npm install
npm run dev
```

Open `http://localhost:3000` 🎉

---

## 🔑 Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=commitai
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/generate` | Generate 3 commit messages |
| GET | `/api/history` | Get all past commits |
| DELETE | `/api/history/:id` | Delete a history item |
| GET | `/health` | Backend health check |

---

## 📁 Project Structure
```
commitai/
├── frontend/          # Next.js 14
│   ├── app/
│   │   ├── page.jsx           # Main generator
│   │   └── history/page.jsx   # History dashboard
│   └── components/
│       ├── DiffInput.jsx
│       ├── CommitCard.jsx
│       └── HistoryTable.jsx
└── backend/           # FastAPI
    ├── main.py
    ├── core.py
    ├── routes/
    │   ├── generate.py
    │   └── history.py
    └── models/
        └── commit.py
```

---

## ☁️ Deploy

| Service | Use For |
|---------|---------|
| **Vercel** | Frontend |
| **Railway** | Backend + MongoDB |

---

## 🤝 Contributing

PRs welcome! Star the repo if it helped you ⭐

---

<div align="center">
Made with ❤️ by <strong>Ashish Yadav</strong>
