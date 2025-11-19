import jwt from 'jsonwebtoken'

export const authMiddleWare = (req, res, next) => {
    try {

        const token = req?.headers?.authorization?.split(" ")[1]
        console.log("Authorization Header:", req.headers.authorization);
        console.log("token", token);

        if (token) {

            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
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