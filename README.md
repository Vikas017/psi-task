# 🗂️ Task Management System (Full Stack)

A full-stack Task Management application built using:

- Frontend: React (Vite) + Material UI + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Atlas / Local)
- Authentication: JWT-based
- File Upload: Local storage (uploads folder)
- Containerization: Docker + Docker Compose

---

## 🚀 Features

### 👤 Authentication
- User registration & login
- JWT authentication
- Role-based access (Admin / User)

### 🧑‍💼 Roles
- Admin:
  - Create tasks
  - Assign tasks to users
  - Update all fields
  - Delete tasks
  - Upload & manage documents

- User:
  - View assigned tasks
  - Update only task status
  - Cannot delete or edit restricted fields

---

### 📋 Task Management
- Create task
- Update task
- Delete task (admin only)
- Assign task to users
- Status tracking (todo / in-progress / done)
- Priority management
- Due date support

---

### 📎 File Upload
- Upload up to 3 PDF documents per task
- View uploaded documents
- Remove documents (admin only)
- Stored locally in `/uploads`

> ⚠️ Note: Local storage may not persist in cloud deployments. For production, use AWS S3 / Cloudinary.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Material UI
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)

### DevOps
- Docker
- Docker Compose

---

## 📁 Project Structure
psi-task/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── uploads/
│ ├── server.js
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── utils/
│ ├── vite.config.js
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md

## ⚙️ Environment Variables

### Backend `.env`


PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key


---

## ▶️ How to Run Locally

### 1️⃣ Clone repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
2️⃣ Run with Docker (Recommended)
docker-compose up --build
3️⃣ Without Docker
Backend
cd backend
npm install
npm start
Frontend
cd frontend
npm install
npm run dev
🔐 Default Admin Setup

You can manually create an admin user using API or MongoDB.

Option 1: Register API
POST /auth/register

Then manually update role in DB:

{
  "email": "admin@gmail.com",
  "role": "admin"
}
Option 2: Direct MongoDB

Set:

role: "admin"