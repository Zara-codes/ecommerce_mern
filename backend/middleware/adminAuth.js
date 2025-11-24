import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Not Authorized Login Again" })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        
        if (verified.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        
        req.adminEmail = verified.email

        next()
    } catch (error) {
        console.log("adminAuth Error")
        return res.status(500).json({ message: `adminAuth error: ${error}` })
    }
}

export default adminAuth