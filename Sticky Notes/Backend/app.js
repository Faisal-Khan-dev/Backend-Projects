import express from 'express'
import cors from 'cors';
import { dbConnect } from './config/db.js';
import notRoute from './routes/noteRoutes.js';
import authRoute from './routes/authRoutes.js' 
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

dbConnect()

app.use("/api", authRoute);
app.use("/api", notRoute);
    

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))