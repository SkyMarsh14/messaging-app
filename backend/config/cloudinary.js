import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default async function cloudinaryUploader(buffer) {
  const res = await cloudinary.uploader.upload(buffer, {
    folder: "/messaging-app/profile-picture",
  });
  return res;
}
