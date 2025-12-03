import { v2 as cloudinary } from "cloudinary";
import path from "path";
import DataURIParser from "datauri/parser.js";
const parser = new DataURIParser();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const datauri = (req) => {
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content;
};
export default async function cloudinaryUploader(req) {
  const dataUri = datauri(req);
  const res = await cloudinary.uploader.upload(dataUri, {
    folder: "/messaging-app/profile-picture",
  });
  return res;
}
