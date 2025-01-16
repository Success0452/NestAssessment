import { v2 as cloudinary } from 'cloudinary';
import {diskStorage} from "multer";

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_secret,
})

export default cloudinary


export const multerDiskStorage = diskStorage({
    destination: './media',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});