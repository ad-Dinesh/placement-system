import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();


// Database connection
connectDB();


// Middlewares
app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());


// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));


// Port
const PORT = process.env.PORT || 8000;


// API Routes
app.use("/api/v1/user", userRoute);

app.use("/api/v1/companies", companyRoute);

app.use("/api/v1/jobs", jobRoute);

app.use("/api/v1/applications", applicationRoute);


// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});


// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});