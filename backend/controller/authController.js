import User from "../model/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists..." })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email address" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong Password" })
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword })

        let token = await genToken(user._id)

        res.cookie("userToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ message: "Registration successful" })
    } catch (error) {
        console.log(`Register error: ${error}`)
        return res.status(500).json({ message: `Register error` })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User is not found" })
        }

        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)
    } catch (error) {
        console.log(`Login error: ${error}`)
        return res.status(500).json({ message: `Login error` })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successful" })
    } catch (error) {
        console.log(`Logout error: ${error}`)
        return res.status(500).json({ message: `LOgout error` })
    }
}

export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email
            })
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log(`Google Login error: ${error}`)
        return res.status(500).json({ message: `Google Login error` })
    }
}

export const adminLogin = async (req, res) => {
    try {
        let {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genToken1(email)
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({ message: "Admin logged in successfully" });
        }
        return res.status(400).json({message: "Invalid credentials"})
    } catch (error) {
        console.log(`Admin Login error: ${error}`)
        return res.status(500).json({message: `Admin Login error: ${error}`})
    }
}