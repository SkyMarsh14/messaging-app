import prisma from "../db/prisma.js";
import { body } from "express-validator";
import profileUploader from "../lib/profileUploader.js";
import { v2 as cloudinary } from "cloudinary";
const userController = {
  getConfig: async (req, res) => {
    const userConfig = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });
    res.json({ config: userConfig });
  },
  updateConfig: [
    body("username")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 4, max: 30 })
      .withMessage("Username must be between 4 to 30 characters."),
    body("bio")
      .optional()
      .custom((value, { req }) => {
        if (!value && !req.body.bio) {
          throw new Error("At least one of username or bio must be provided.");
        }
        return true;
      })
      .isLength({ max: 500 })
      .withMessage("Maximum characters of bio is 500 length"),
    async (req, res) => {
      const username = req.body?.username;
      const bio = req.body?.bio;
      const data = {};
      if (username) {
        data.username = username;
      }
      if (bio) {
        data.bio = bio;
      }
      const update = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: data,
      });
      res.json(update);
    },
  ],
  uploadProfile: async (req, res) => {
    const { profile } = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      select: {
        profile: true,
      },
    });
    const addedFile = await profileUploader(req);
    const fileData = {
      public_id: addedFile.public_id,
      url: addedFile.url,
      created_at: new Date(),
      mimetype: req.file.mimetype,
      size: req.file.size,
    };
    let newProfile;
    if (profile) {
      newProfile = await prisma.file.update({
        where: {
          id: profile.id,
        },
        data: fileData,
      });
      // Deletes old profile picture
      cloudinary.uploader.destroy(profile.public_id);
      return res.json({ msg: "Profile picture updated", fileData });
    } else {
      newProfile = await prisma.file.create({
        data: fileData,
      });
      // Adds profileFile Id
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          profileFileId: newProfile.id,
        },
      });
    }
    return res.json({ msg: "Profile picture successfully uploaded", fileData });
  },
};
export default userController;
