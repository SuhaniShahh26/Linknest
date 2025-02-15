import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";  // ✅ Import session
import "./passportConfig.js"; // Passport configuration
import authRoutes from "./routes/auth.js";
import connectDB from "./db.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// ✅ Add express-session BEFORE passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key", // 🔒 Secure secret
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to `true` in production (HTTPS)
            httpOnly: true
        }
    })
);

// ✅ Initialize Passport AFTER session middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
connectDB();

// ✅ Start Server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
