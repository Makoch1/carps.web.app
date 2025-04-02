import dotenv from 'dotenv';
dotenv.config();

export const CLOUDINARY_CONFIG = {
    cloud_name: 'dxgud4wtd',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const MONGODB_URI = process.env.MONGODB_URI;
