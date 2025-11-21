import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "Quotation System" },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
        Readable.from(buffer).pipe(stream);
    });
};

export { cloudinary, uploadToCloudinary };
