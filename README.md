# Task Management Web App

A simple task manager with a Flask backend and React + Vite frontend. Includes JWT authentication, per-user tasks, search and filters, and a minimal UX.

**Contents**
- `backend/` — Flask API
- `frontend/` — React + Vite frontend

**Setup (quick)**

Prerequisites:
- Python 3.10+ (venv recommended)
- Node 18+ and npm

1) Backend (development)

Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

macOS / Linux:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

Environment (backend/.env):
- `DATABASE_URL` — database connection string (Postgres or sqlite for dev)
- `JWT_SECRET_KEY` — JWT secret (use 32+ chars in production)

2) Frontend (development)

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` to point to the backend (e.g. `http://127.0.0.1:5000`).

## API Endpoints

- POST `/auth/register` — Register user
  - Body: `{ "username": string, "password": string }`
  - Success: 201

- POST `/auth/login` — Login
  - Body: `{ "username": string, "password": string }`
  - Success: `{ "access_token": "..." }`

- GET `/tasks` (protected)
  - Query params: `status` (pending|completed), `q` (search)
  - Returns tasks for the authenticated user

- POST `/tasks` (protected)
  - Body: `{ "title": string, "description": string, "priority": "low|medium|high" }`

- PUT `/tasks/<id>` (protected)
  - Body: partial task fields, e.g. `{ "status": "completed" }`

- DELETE `/tasks/<id>` (protected)

Protected endpoints require header: `Authorization: Bearer <token>`

## Features

- User register/login with JWT
- Per-user tasks (task rows include `user_id`)
- Task CRUD: create, list, update, delete
- Priority field and UI support
- Search and status filtering
- React frontend with Axios helper that injects JWT
- Tailwind CSS for better styling

## Assumptions & Improvements

- Development uses `db.create_all()`; add Flask-Migrate / Alembic for DB migrations in production.
- Add more relevant fields for task management like deadline, subtasks addition, to-put-effort
- Allow user to edit a task details after creation
