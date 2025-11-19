# Smart Task Manager — Local Development Guide

This guide explains how to run both the **Node.js backend** and **React frontend** locally in development mode.

---

## 📁 Project Structure
```
root/
├── backend/ # Node.js + Express API
└── client/  # React frontend
```

### 1. Clone the Repository

```bash
git clone https://github.com/fahimjason/smart-task-manager.git
cd smart-task-manager
```
### 2. Install Dependencies & Run Locally
**Backend:**

Rename `backend/config/config.env.env` to `backend/config/config.env` and update the values/settings to your own

```bash
cd backend
npm install
npm run dev

# The backend will run on: http://localhost:5000
```
Backend API Documentation: https://documenter.getpostman.com/view/17345473/2sB3WyHvr7

---

**Frontend:**

Rename `task-manager-frontend/.env.example` to `task-manager-frontend/.env` and update the values/settings to your own
```bash
cd ../task-manager-frontend
npm install
npm start 

# The frontend will run on: http://localhost:3000
```
Visit live Frontend: https://smart-task-manager-fahimjason.netlify.app

![Login page](/task-manager-frontend/public/login.png)

![Dashboard](/task-manager-frontend/public/dashboard.png)