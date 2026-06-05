<div align="center">

# 🎓 Placement Management System

### A full-stack web platform bridging students and recruiters — built for modern campus placement workflows.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## 📌 Project Overview

The **Placement Management System** is a full-stack MERN application designed to streamline the campus recruitment process. It provides a unified platform where **students** can explore job opportunities and apply for roles, while **recruiters** can post openings and manage applicants — all within a secure, role-based environment.

This project demonstrates real-world software engineering practices including RESTful API design, JWT-based authentication, protected routing, and a responsive React frontend.

---

## ✨ Features

### 👩‍🎓 Student
- Register and log in with secure credentials
- Build and manage a personal profile
- Browse available job postings
- Submit applications directly through the platform
- Track application status via personal dashboard

### 🏢 Recruiter
- Register and log in as a recruiter
- Post, edit, and manage job listings
- View all applicants for a specific job
- Manage recruiter profile and company details

### 🔐 System
- Role-based access control (Student / Recruiter)
- JWT Authentication with protected API routes
- Secure password hashing with bcrypt
- Responsive UI across devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router DOM, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Styling** | CSS / Tailwind CSS |
| **Dev Tools** | Nodemon, dotenv, Postman |

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/placement-management-system.git
cd placement-management-system
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory (see [Environment Variables](#-environment-variables) section below).

### 5. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm start
```

The app will be running at `http://localhost:3000` and the API at `http://localhost:5000`.

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/placement-db

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore` by default.

---

## 📁 Project Structure

```
placement-management-system/
│
├── client/                         # React frontend
│   ├── public/
│   └── src/
│       ├── components/             # Reusable UI components
│       ├── pages/                  # Route-level page components
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Jobs.jsx
│       │   └── Profile.jsx
│       ├── context/                # Auth context / global state
│       ├── utils/                  # Axios instance, helpers
│       └── App.jsx
│
├── server/                         # Node.js + Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   └── server.js                   # Entry point
│
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

> Screenshots will be added once the UI is finalized.

| Page | Preview |
|---|---|
| Landing Page | ![Landing](./screenshots/landing.png) |
| Student Dashboard | ![Dashboard](./screenshots/dashboard.png) |
| Job Listings | ![Jobs](./screenshots/jobs.png) |
| Recruiter Portal | ![Recruiter](./screenshots/recruiter.png) |

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user (student/recruiter) |
| POST | `/api/auth/login` | Login and receive JWT token |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Fetch all active job listings |
| POST | `/api/jobs` | Create a new job (recruiter only) |
| GET | `/api/jobs/:id` | Get job details by ID |
| PUT | `/api/jobs/:id` | Update a job posting (recruiter only) |
| DELETE | `/api/jobs/:id` | Delete a job posting (recruiter only) |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Apply for a job (student only) |
| GET | `/api/applications/me` | View my applications (student) |
| GET | `/api/applications/job/:jobId` | View applicants for a job (recruiter) |

---

## 🔮 Future Enhancements

- [ ] **Email Notifications** — Automated emails for application status updates
- [ ] **Resume Upload** — PDF resume upload and storage via Cloudinary
- [ ] **Admin Panel** — Centralized admin dashboard for managing users and listings
- [ ] **Search & Filters** — Advanced job search by location, CTC, role, and skills
- [ ] **Interview Scheduler** — In-app scheduling for technical and HR rounds
- [ ] **Analytics Dashboard** — Placement stats, conversion rates, and trends
- [ ] **OAuth Login** — Google / LinkedIn sign-in integration
- [ ] **Mobile App** — React Native companion app

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows consistent naming conventions and is well-commented.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Your Name**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://your-portfolio.com)

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

*Built with ❤️ using the MERN Stack*

</div>
