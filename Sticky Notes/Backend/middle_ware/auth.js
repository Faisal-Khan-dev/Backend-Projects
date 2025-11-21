import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const auth = (req , res , next) => {
    try {
        
        const token = req?.headers?.authorization?.split(" ")[1]
        console.log("Authorization Header:", req.headers.authorization);
       console.log("token" , token);

        if (token) {

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            req.user = decoded;

            next()
       } else {
           return res.json({
               message: "unauth user!"
           })
       }
       
   } catch (error) {
        res.json({
            message: error.message || "something went wrong!",
            status: false
    })
   }
}

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            profileImage: user.profileImage,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
    );
};

