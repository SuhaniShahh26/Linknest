import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./models/User.js"; // MongoDB User model

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        profilePic: profile.photos[0].value
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// ✅ Serialize user into session (stores only user ID)
passport.serializeUser((user, done) => {
    console.log("Serializing user:", user); // Debugging step
    done(null, user._id);
});

// ✅ Deserialize user from session (retrieves full user object)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        console.log("Deserializing user:", user); // Debugging step
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
