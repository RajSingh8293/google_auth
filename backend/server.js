import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import "dotenv/config";
import "./config/passport.js";
import connectDB from "./config/db.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS – allow frontend with credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

// Passport middleware (initialize only, NO sessions)
app.use(passport.initialize());
// DO NOT use passport.session() since we're using JWT

// Routes
app.use("/api/auth", authRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Auth routes available at http://localhost:${PORT}/api/auth`);
});

// import express from "express";
// import mongoose from "mongoose";
// import passport from "passport";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/authRoutes.js";
// import "dotenv/config";
// // Load passport config (initializes strategies)
// import "./config/passport.js";
// import connectDB from "./config/db.js";
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// // Passport middleware (for session – but we're using JWT, still needed for OAuth)
// app.use(passport.initialize());

// // CORS – allow frontend with credentials
// // app.use(
// //   cors({
// //     origin: process.env.CLIENT_URL,
// //     credentials: true,
// //   }),
// // );
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//   }),
// );

// // Log all requests for debugging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use("/api/auth", authRouter);

// // Health check route
// app.get("/health", (req, res) => {
//   res.json({ status: "OK", message: "Server is running" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
