import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "Enter your correct email"]
    },
    password: {
        type: String,
        required: [true, "Enter your correct Password"]
    },
    role : {
        type: String,
        enum : ["User", "Admin"],
        default : "User",
        required : true
    }
});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", userSchema);

export { userModel, adminModel };