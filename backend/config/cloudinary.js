import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            return null
        }
        const uploadResult = await cloudinary.uploader
            .upload(filePath, {
                resource_type: "image",
            })

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return uploadResult.secure_url
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        console.error("Error message:", error.message);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null
    }
}

export default uploadOnCloudinary