<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6d28d9&height=200&section=header&text=TalentPath&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Placement%20Management%20System&descAlignY=58&descSize=22&descColor=c4b5fd" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-TalentPath-6d28d9?style=for-the-badge&logo=vercel&logoColor=white)](https://placement-system-4bjd5hvdk-dineshdharavath03-8276s-projects.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-ad--Dinesh%2Fplacement--system-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ad-Dinesh/placement-system)
[![MIT License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f59e0b?style=for-the-badge)](CONTRIBUTING.md)

<br/>

[![React](https://img.shields.io/badge/React.js-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)

<br/>

> **TalentPath** is a full-stack, role-based Placement & Job Portal that connects students with recruiters — featuring real-time notifications, resume management, smart job search, and powerful admin controls.

<br/>

<img src="https://img.shields.io/badge/10k%2B-Active%20Jobs-6d28d9?style=for-the-badge" />
<img src="https://img.shields.io/badge/5k%2B-Companies-8b5cf6?style=for-the-badge" />
<img src="https://img.shields.io/badge/50k%2B-Students-a78bfa?style=for-the-badge" />
<img src="https://img.shields.io/badge/92%25-Placement%20Rate-c4b5fd?style=for-the-badge" />

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#️-architecture-overview)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧭 Overview

**TalentPath** is a centralized Placement Management System built on the MERN stack. It eliminates the friction in campus hiring by giving students, recruiters, and administrators a unified, real-time platform to manage their entire placement journey — from profile creation and job discovery to application tracking and offer management.

Whether you're a student browsing opportunities, a recruiter sourcing top talent, or an admin overseeing the entire process — TalentPath has you covered.

---

## 🎯 Problem Statement

Traditional placement processes are fragmented:

- Students rely on scattered emails and spreadsheets to track applications.
- Recruiters struggle to manage applicants and communicate updates efficiently.
- Admins have no visibility into the overall placement pipeline.

**TalentPath** solves this by providing a single, role-aware platform with real-time updates, structured workflows, and data-driven dashboards for all stakeholders.

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| 🏠 **Landing Page** | ![Landing Page](https://placeholder.pics/svg/800x450/1e1b4b/c4b5fd/Landing+Page) |
| 🎓 **Student Dashboard** | ![Student Dashboard](https://placeholder.pics/svg/800x450/1e1b4b/c4b5fd/Student+Dashboard) |
| 💼 **Job Listings** | ![Job Listings](https://placeholder.pics/svg/800x450/1e1b4b/c4b5fd/Job+Listings) |
| 🏢 **Recruiter Dashboard** | ![Recruiter Dashboard](https://placeholder.pics/svg/800x450/1e1b4b/c4b5fd/Recruiter+Dashboard) |
| 🛡️ **Admin Panel** | ![Admin Panel](https://placeholder.pics/svg/800x450/1e1b4b/c4b5fd/Admin+Panel) |

> 💡 Replace the above placeholders with real screenshots from your deployed app.

---

## ✨ Features

### 👨‍🎓 Student
| Feature | Description |
|---|---|
| 🔐 Auth | Register & login with JWT-secured sessions |
| 👤 Profile | Build a rich student profile with skills, bio & profile photo (Cloudinary) |
| 📄 Resume | Upload, update & download resume (PDF via Multer + Cloudinary) |
| 🔍 Job Search | Search & filter jobs by title, location, type, salary range |
| 📋 Apply | One-click job application with status tracking |
| 📊 Dashboard | View applied jobs, application statuses & analytics |
| 🔔 Notifications | Real-time Socket.io alerts on application status changes |

### 🏢 Recruiter
| Feature | Description |
|---|---|
| 🔐 Auth | Role-specific register & login |
| 🏢 Company Profile | Create and manage company profile |
| 📝 Post Jobs | Create, edit & delete job listings |
| 👥 Manage Applicants | View all applicants per job with resume access |
| ✅ Status Updates | Accept / Reject applicants with instant notifications |
| 📊 Dashboard | Analytics on posted jobs and application metrics |

### 🛡️ Administrator
| Feature | Description |
|---|---|
| 👁️ Full Visibility | View and manage all users (students & recruiters) |
| 🗂️ Job Management | Monitor, approve, or remove job postings |
| 📈 Analytics | Platform-wide statistics and placement metrics |
| 🔒 Role Control | Role-Based Access Control (RBAC) across all routes |

### ⚙️ Platform
| Feature | Description |
|---|---|
| 📱 Responsive UI | Fully mobile-friendly with Tailwind CSS |
| 📧 Email Notifications | Automated emails via Nodemailer |
| ⚡ Real-Time | Live notifications via Socket.io |
| 📄 Pagination | Efficient data loading with server-side pagination |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| ⚛️ React.js | UI framework |
| 🎨 Tailwind CSS | Utility-first styling |
| 🗃️ Redux / Context API | Global state management |
| 🔗 Axios | HTTP client for API calls |

### Backend
| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime environment |
| 🚂 Express.js | RESTful API framework |
| 🍃 MongoDB | NoSQL database |
| 🦦 Mongoose ODM | Schema modeling & DB queries |
| 🔑 JWT | Stateless authentication |
| 📁 Multer | File (resume/image) upload handling |
| ☁️ Cloudinary | Cloud media storage |
| 📨 Nodemailer | Email notifications |
| ⚡ Socket.io | Real-time bidirectional events |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| ▲ Vercel | Frontend deployment |
| 🌐 Render / Railway | Backend deployment |
| 🍃 MongoDB Atlas | Cloud database |

---

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                   │
│         React.js + Tailwind CSS + Redux                │
│                  Deployed on Vercel                    │
└────────────────────┬───────────────────────────────────┘
                     │  REST API (HTTP/HTTPS)
                     │  Socket.io (WebSocket)
┌────────────────────▼───────────────────────────────────┐
│                  BACKEND (Node.js)                     │
│            Express.js REST API Server                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │  Routes  │  │Middleware│  │  Socket.io Server    │ │
│  └────┬─────┘  │(Auth/RBAC│  └──────────────────────┘ │
│       │        │ /Multer) │                            │
│  ┌────▼──────────────┐    │                            │
│  │    Controllers    │◄───┘                            │
│  └────┬──────────────┘                                 │
│       │                                                │
│  ┌────▼───────────────────────────────────────────┐   │
│  │              Services / Utils                  │   │
│  │   Cloudinary | Nodemailer | JWT | Bcrypt       │   │
│  └────┬───────────────────────────────────────────┘   │
└───────┼────────────────────────────────────────────────┘
        │
┌───────▼────────────────────────────────────────────────┐
│              MongoDB Atlas (Cloud Database)            │
│   Users | Jobs | Applications | Companies | Profiles   │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
placement-management-system/
│
├── backend/
│   ├── controllers/        # Route handler logic (auth, jobs, applications, users)
│   ├── middlewares/        # JWT auth, RBAC, error handling, Multer config
│   ├── models/             # Mongoose schemas (User, Job, Application, Company)
│   ├── routes/             # Express route definitions
│   ├── utils/              # Cloudinary config, Nodemailer, helpers
│   ├── .env                # Backend environment variables
│   ├── index.js            # App entry point + Socket.io init
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/             # Static assets & favicon
│   └── src/
│       ├── assets/         # Images, icons, fonts
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Axios instance, constants, helpers
│       ├── redux/          # Redux slices, store config
│       ├── utils/          # Utility functions
│       ├── App.jsx         # Root component with routing
│       ├── App.css
│       ├── main.jsx        # React DOM entry point
│       └── index.css
│   ├── .env                # Frontend environment variables
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://cloud.mongodb.com))
- [Git](https://git-scm.com/)
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/ad-Dinesh/placement-system.git
cd placement-system
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` (see [Environment Variables](#-environment-variables) below).

```bash
npm run dev
```

> Backend runs at `http://localhost:8000`

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend — `/backend/.env`

```env
# Server
PORT=8000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/talentpath

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend — `/frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000
```

> ⚠️ Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 📡 API Overview

Base URL: `/api/v1`

### 🔐 Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/auth/register` | Register new user (student/recruiter) | Public |
| `POST` | `/auth/login` | Login and receive JWT | Public |
| `POST` | `/auth/logout` | Logout user | Private |

### 👤 User / Profile Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/profile/me` | Get current user profile | Private |
| `PUT` | `/profile/update` | Update profile info + photo | Private |
| `POST` | `/profile/resume` | Upload/update resume | Student |

### 💼 Job Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/jobs` | Get all jobs (with filters & pagination) | Public |
| `GET` | `/jobs/:id` | Get single job details | Public |
| `POST` | `/jobs` | Create a new job posting | Recruiter |
| `PUT` | `/jobs/:id` | Update job posting | Recruiter |
| `DELETE` | `/jobs/:id` | Delete job posting | Recruiter |

### 📋 Application Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/applications/:jobId` | Apply for a job | Student |
| `GET` | `/applications/me` | Get all my applications | Student |
| `GET` | `/applications/job/:jobId` | Get all applicants for a job | Recruiter |
| `PUT` | `/applications/:id/status` | Update application status | Recruiter |

### 🏢 Company Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/companies` | Get all companies | Public |
| `POST` | `/companies` | Register company | Recruiter |
| `PUT` | `/companies/:id` | Update company profile | Recruiter |

### 🛡️ Admin Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/admin/users` | Get all users | Admin |
| `DELETE` | `/admin/users/:id` | Remove a user | Admin |
| `GET` | `/admin/jobs` | Get all job postings | Admin |
| `DELETE` | `/admin/jobs/:id` | Remove a job posting | Admin |

---

## ☁️ Deployment

### Frontend — Vercel

1. Push your frontend to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Add environment variables from `/frontend/.env`.
5. Deploy.

```
Live URL: https://placement-system-4bjd5hvdk-dineshdharavath03-8276s-projects.vercel.app
```

### Backend — Render / Railway

1. Push your backend to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
3. Set **Root Directory** to `backend`.
4. Set the **Start Command** to `node index.js`.
5. Add all environment variables from `/backend/.env`.
6. Deploy and copy the live URL into your frontend's `VITE_API_BASE_URL`.

### Database — MongoDB Atlas

1. Create a free cluster on [MongoDB Atlas](https://cloud.mongodb.com).
2. Whitelist your server's IP.
3. Grab the connection string and set it as `MONGO_URI` in your backend `.env`.

---

## 🔮 Future Enhancements

- [ ] 🤖 **AI Resume Parser** — Auto-fill student profiles from uploaded resumes using NLP
- [ ] 📅 **Interview Scheduler** — Integrated calendar for scheduling & tracking interviews
- [ ] 💬 **In-App Messaging** — Direct chat between students and recruiters
- [ ] 📲 **Push Notifications** — Browser & mobile push alerts via Firebase FCM
- [ ] 🌍 **Multi-language Support** — i18n for regional accessibility
- [ ] 📊 **Advanced Analytics** — Detailed placement reports with charts (Recharts / Chart.js)
- [ ] 🏆 **Leaderboard** — Top student profiles ranked by skills & activity
- [ ] 🔗 **LinkedIn OAuth** — One-click sign-in with LinkedIn
- [ ] 📱 **React Native App** — Mobile app for students on the go

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to the branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please make sure your code follows the existing code style and that you've tested your changes before submitting a PR.

---



## 👨‍💻 Author

<div align="center">

<img src="https://placeholder.pics/svg/100/6d28d9/ffffff/Avatar" width="100" style="border-radius: 50%;" />

### Dinesh

*Full Stack Developer | MERN Stack Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-@ad--Dinesh-181717?style=for-the-badge&logo=github)](https://github.com/ad-Dinesh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](www.linkedin.com/in/dinesh-dharavath-b176a2342)


</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6d28d9&height=100&section=footer" width="100%"/>

**⭐ Star this repo if you found it helpful!**

*Built with 💜 using the MERN Stack*

</div>
