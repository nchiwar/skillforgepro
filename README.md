# SkillForge Pro – Online Skill Assessment Portal

SkillForge Pro is a next-generation career guidance and skill validation platform for Nigerian students, job seekers, and professionals. Unlike basic quiz sites, it uses adaptive testing, AI recommendations, and blockchain-verified certificates to deliver accurate career/course fit and instantly shareable proof of skills.

## Features
- Choose your goal: University course, Job role, or Skill validation
- Adaptive assessments (30–50 questions) across Logical, Technical, Aptitude & Personality
- Instant detailed report with radar chart + personalized recommendations
- Blockchain-minted certificates (viewable on Polygonscan)
- JAMB/UTME subject combination matcher for Nigerian students
- Public shareable profile (skillforge.pro/@username)
- Admin panel to manage 50+ career paths & question banks
- Gamification: streaks, leaderboards, badges

## Tech Stack
- Frontend: React 18 + TypeScript + Vite + Framer Motion + Recharts
- Backend: Django 5 + Django REST Framework + PostgreSQL
- Auth: JWT + refresh tokens
- Background tasks: Celery + Redis
- Blockchain: Web3.js + ERC-721 on Sepolia/Polygon
- Deployment: Docker → Vercel (frontend) + Railway (backend)

## Quick Start
```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev