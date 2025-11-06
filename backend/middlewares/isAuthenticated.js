import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        let jwtSecret = process.env.JWT_SECRET || process.env.SECRET_KEY;
        if (!jwtSecret) {
            jwtSecret = "dev_secret_change_me";
            if (process.env.NODE_ENV === "production") {
                return res.status(500).json({
                    message: "Server misconfigured: missing JWT secret.",
                    success: false
                });
            }
            console.warn("[auth] Using fallback JWT secret for non-production environment. Set JWT_SECRET in .env");
        }
        const decode = await jwt.verify(token, jwtSecret);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;