import bcrypt from "bcrypt";
import UserModel from '../models/schema.js';
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";


export const signupController = async (req, res) => {
    try {

        console.log("res", req.body);

        const { name, age, email, password } = req.body

        if (!email || !password) {
            return res.json({
                message: "Required fields are missing!",
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "Email already exist!",
                staus: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const userObj = {
            ...req.body,
            password: hashPassword
        }
        await UserModel.create(userObj)

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS,
            },
        });

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("otp", otp);
        const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification - Lestro</title>
    <style>
      /* Fallback CSS for clients that support style tags */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 15px !important;
        }
        .otp-box {
          font-size: 26px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
    <div class="email-container" style="max-width:600px;margin:30px auto;background-color:#ffffff;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1);overflow:hidden;">
      
      <!-- Header -->
      <div style="text-align:center;padding:25px border-5 border-black 0;background-color:#ffffff;border-bottom:1px solid #eee;">
        <img src="https://res.cloudinary.com/dhzmvdzjs/image/upload/v1762165214/logo-removebg-preview_co7d3l.png" alt="Lestro" style="max-width:160px;height:auto;" />
      </div>

      <!-- Greeting -->
      <div style="padding:25px 30px;">
        <h2 style="color:#333333;margin-top:0;">Hi ${name},</h2>
        <p style="color:#555555;font-size:16px;line-height:1.6;margin-bottom:25px;">
          Thank you for joining <strong>Lestro</strong>! We're excited to have you on board.  
          Please use the One-Time Password (OTP) below to verify your email address:
        </p>

        <!-- OTP Box -->
        <div style="text-align:center;margin:25px 0;">
          <div class="otp-box" style="display:inline-block;background-color:#f0f7ff;color:#1e88e5;font-size:32px;font-weight:bold;letter-spacing:5px;padding:15px 35px;border-radius:8px;border:1px solid #d0e3ff;">
            ${otp}
          </div>
        </div>

        <p style="color:#777777;font-size:14px;line-height:1.6;">
          This code will expire in <strong>5 minutes</strong>. If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:20px 10px;background-color:#fafafa;border-top:1px solid #eee;">
        <p style="font-size:12px;color:#999999;margin:0;">
          &copy; ${new Date().getFullYear()} <strong>Lestro</strong>. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            html: htmlTemplate
        })

        res.json({
            message: "user sucessfuly sign-up",
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message || "something went wrong!",
            status: false
        })
    }

}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.json({
                message: "Required fields are missing",
                status: false
            })
        }

        const user = await UserModel.findOne({ email })
        
        if (!user) {
            return res.json({
                message: "Invalid email or password!",
                status: false
            })
        }

        const comparePassword = bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.json({
                message: "Invalid email or password!",
                status: false
            })
        }

       

      const token = jwt.sign({
        "id": user._id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "profileImage": user.profileImage,
        "gender" : user.gender,
        }, "Batch-14" , {expiresIn: "24h"})
        console.log("token", token);

        res.json({
            message: "user sucessfuly Log-in",
            status: true,
            token: token
        })
  
        } catch (error) {
            res.json({
                message: error.message || "something went wrong!",
                status: false
            })
        }
}