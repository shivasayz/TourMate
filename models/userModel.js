import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"]
    },

    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },

    password: {
        type: password,
        required: [true, "Please provide your password"],
        minlength: 8
    },
    
    conformPassword: {
        type: password,
        required: [true, "Please confirm your password"]
    },

    photo: {
        type: String
    },
})

const User = mongoose.model('User', userSchema);
export default User;