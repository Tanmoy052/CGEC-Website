import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ltzeffdz',
  api_key: process.env.CLOUDINARY_API_KEY || '589988189964754',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ZfvEhZWdPW2b8mr8BGqyWZn6JVU',
  secure: true,
});

export default cloudinary;
