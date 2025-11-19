
import express from "express";

import { LoginController, SignupController } from "../controller/auth.js";
import { authMiddleWare } from "../midleWare/auth.js";
import { welcomeEmail } from "../controller/email.js";

const route = express.Router();

route.post("/signup", SignupController);

route.post("/login", LoginController);

// private
route.post("/createpost", authMiddleWare, (request, response) => {
    response.json("API HIT: post Created");
});
route.get("/getpost", authMiddleWare, (request, response) => {
    response.json("API HIT: post Created");
});


route.post("/welcome-email", welcomeEmail)


export default route;
