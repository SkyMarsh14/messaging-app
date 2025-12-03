import multer from "multer";
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed to upload for profile picutre.",
        false
      )
    );
  }
};
const profileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, //1byte to 1KB to 1MB to 10MB
  },
  fileFilter: imageFilter,
});

export default profileUpload;
