import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    profilePic: String,
});

const User = mongoose.model("User", UserSchema);
export default User;
