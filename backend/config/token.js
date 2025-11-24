import jwt from "jsonwebtoken"

export const genToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log(`Token error: ${error}`)
        return null
    }
}

export const genToken1 = async (email) => {
    try {
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log(`Token error: ${error}`)
        return null
    }
}