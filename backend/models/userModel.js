import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["user", "admin"], 
        default: "user"
    }
},{timestamps: true});

export default mongoose.model("User", userSchema);
