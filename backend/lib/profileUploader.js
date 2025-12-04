import { v2 as cloudinary } from "cloudinary";
import DataURIParser from "datauri/parser.js";
import path from "path";
const parser = new DataURIParser();
const datauri = (req) => {
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content;
};
export default async function profileUploader(req) {
  const dataUri = datauri(req);
  const res = await cloudinary.uploader.upload(dataUri, {
    folder: "/messaging-app/profile-picture",
  });
  return res;
}
