import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    (req, res) => {
        const user = req.user;

        // Generate JWT
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Send token to frontend as a cookie
        res.cookie("token", token, { httpOnly: true }).redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
);

// Get User Info from JWT
router.get("/user", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json(verified);
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logged out successfully" });
});

export default router;
