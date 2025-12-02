import prisma from "../db/prisma";
import { body } from "express-validator";
const userController = {
  getConfig: async (req, res) => {
    const userConfig = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      omit: {
        password: true,
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
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: data,
      });
    },
  ],
};
export default userController;
