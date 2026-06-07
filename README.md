<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6d28d9&height=200&section=header&text=TalentPath&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Job%20Portal%20Platform&descAlignY=58&descSize=22&descColor=c4b5fd" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-TalentPath-6d28d9?style=for-the-badge)](https://placement-system-4bjd5hvdk-dineshdharavath03-8276s-projects.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-ad--Dinesh%2Fplacement--system-181717?style=for-the-badge&logo=github)](https://github.com/ad-Dinesh/placement-system)

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat-square)](https://jwt.io)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Author](#-author)

---

## 🧭 About

**TalentPath** is a modern, full-stack Job Portal built with the **MERN Stack**. It bridges the gap between job seekers and companies through a clean, responsive, and feature-rich platform.

Users can register, browse jobs, search & filter listings, apply directly, and track their application status — all secured with JWT-based authentication.

---

## ✨ Features

### 👨‍💻 Job Seekers
- Register & login securely
- Browse all available job listings
- Search and filter jobs by category, location, or keywords
- Apply for jobs with one click
- Track the status of submitted applications

### 🏢 Companies
- View detailed company profiles
- Explore company-wise job openings
- Browse full company listings

### 🔒 Security
- JWT-based authentication
- Cookie-based session management
- Secure password hashing with **bcryptjs**
- Protected routes for authenticated users only

### ⚡ Platform
- Fully responsive UI (mobile + desktop)
- Redux Toolkit for global state management
- RESTful API architecture
- Seamless MongoDB Atlas integration

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Redux Toolkit | State Management |
| React Router DOM | Client-side Routing |
| Tailwind CSS | Styling |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication Tokens |
| bcryptjs | Password Hashing |
| Multer | File/Resume Uploads |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Resource Sharing |

### Deployment
| Service | Usage |
|---|---|
| Vercel | Frontend & Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 📁 Project Structure

```
placement-system/
│
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level pages
│   │   ├── redux/              # Redux slices & store
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper functions
│   │   └── App.jsx
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── controllers/            # Route controllers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── middleware/             # Auth & error middleware
│   ├── utils/                  # Utilities (JWT, etc.)
│   └── index.js
│
├── screenshots/                # App screenshots
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/ad-Dinesh/placement-system.git
cd placement-system
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see [Environment Variables](#-environment-variables)).

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory with the following:

```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
COOKIE_EXPIRE=7
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/home.png)

### 💼 Jobs Page
![Jobs Page](./screenshots/jobs.png)

### 🏢 Companies Page
![Companies Page](./screenshots/companies.png)

### 📋 Applications Page
![Applications Page](./screenshots/applications.png)

---

## 🔗 Live Demo

👉 [https://placement-system-4bjd5hvdk-dineshdharavath03-8276s-projects.vercel.app](https://placement-system-4bjd5hvdk-dineshdharavath03-8276s-projects.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/ad-Dinesh.png" width="120" style="border-radius: 50%"/>

### Dinesh Dharavath

**Full Stack Developer · MERN Stack Enthusiast**

[![GitHub](https://img.shields.io/badge/GitHub-@ad--Dinesh-181717?style=for-the-badge&logo=github)](https://github.com/ad-Dinesh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dinesh-dharavath-b176a2342/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6d28d9&height=100&section=footer" width="100%"/>

⭐ If you found this project helpful, consider giving it a star!

</div>
