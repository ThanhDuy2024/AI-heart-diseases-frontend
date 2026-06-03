# AI Heart Disease Prediction System

## Project Overview
Hệ thống dự đoán nguy cơ mắc bệnh tim mạch bằng Trí tuệ Nhân tạo, sử dụng mô hình ML huấn luyện từ bộ dữ liệu Framingham Heart Study.

## Architecture
- **Frontend**: React + Vite + TailwindCSS v3 (thư mục `frontend/`)
- **Backend**: Node.js + Express (thư mục `backend/`, port 4000)
- **AI Service**: FastAPI + scikit-learn (thư mục `models/`, port 8000)
- **Training**: Jupyter Notebook (thư mục `TrainingModel/`)

## Frontend Structure
```
frontend/src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── home/            # Home page sections
│   ├── predict/         # Prediction components
│   ├── history/         # History components
│   └── chatbot/         # Chatbot components
├── pages/               # Page components
├── layouts/             # Layout wrappers
├── context/             # React Context (Auth)
├── services/            # API service modules
└── utils/               # Utilities & constants
```

## Design System
- **Primary Color**: #DC2626 (Red Medical)
- **Secondary Color**: #2563EB (Blue Healthcare)
- **Font**: Inter (Google Fonts)
- **Icons**: Lucide React
- **Style**: Modern Healthcare Dashboard UI

## API Endpoints
### Backend (port 4000)
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get user profile

### AI Service (port 8000)
- `POST /predict` - Heart disease prediction (15 health features)

## Running the Project
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run dev

# AI Service
cd models && uvicorn app:app --reload
```
