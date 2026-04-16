# 🗂️ Task Management System (Full Stack)

A full-stack Task Management application built with modern technologies.

---

## 🌐 Live URLs

* **Frontend:** https://psi-task.onrender.com
* **Backend API:** https://psi-task-backend.onrender.com/api

---

## 🚀 Features

### Authentication

* User registration & login
* JWT-based authentication
* Role-based access control (Admin / User)

### Roles

**Admin**

* Create tasks
* Assign tasks to users
* Update all task fields
* Delete tasks
* Upload & manage documents

**User**

* View assigned tasks
* Update only task status
* Cannot modify restricted fields

---

### Task Management

* Create, update, delete tasks
* Assign tasks to users
* Status tracking (todo / in-progress / done)
* Priority management
* Due date support
* Filtering & sorting

---

### File Upload

* Upload up to 3 PDF documents per task
* View uploaded documents
* Remove documents (admin only)

> Note: Files are stored locally. In cloud environments, persistence may not be guaranteed.

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Material UI
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* Multer (file upload)

### DevOps

* Docker
* Docker Compose

---

## 📁 Project Structure

```
psi-task/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

```
VITE_API_URL=https://psi-task-backend.onrender.com/api
```

---

## ▶️ Run Locally

### Using Docker

```
docker-compose up --build
```

---

### Without Docker

**Backend**

```
cd backend
npm install
npm start
```

**Frontend**

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Admin Setup

### Option 1: Register via API

```
POST /auth/register
```

Then update role in database:

```
role: "admin"
```

---

### Option 2: Direct MongoDB

Set user role manually:

```
role: "admin"
```

---

## ⚠️ Notes

* MongoDB Atlas is used for production database
* Local uploads are used for file storage (not persistent in cloud)
* Environment variables must be configured in deployment platform

---

## 📌 Summary

* Full-stack task management system
* Role-based access control
* File upload support
* Dockerized setup
* Deployed on Render

---
