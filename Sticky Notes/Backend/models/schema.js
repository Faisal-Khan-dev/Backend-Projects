import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    age: {
        type : Number
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)

const UserModel = mongoose.model("users", userSchema)

export default UserModel;