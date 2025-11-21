import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    age: {
        type : Number
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    profileImage: { type: String, default: "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80" },

    isVerified: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)

const UserModel = mongoose.model("users", userSchema)

export default UserModel;