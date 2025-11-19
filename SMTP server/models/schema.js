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
    }
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel;