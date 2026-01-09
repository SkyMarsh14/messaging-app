import { validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import { createUserValidation, loginValidation } from "../lib/validators.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import seedChatData from "../lib/seedChatData.js";
const loginController = {
  createUser: [
    createUserValidation,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user = await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        });
        await seedChatData(user.id); // Seeds the chat data upon account creation
      } catch (err) {
        throw new Error(err);
      }
      return res.json({
        msg: "User successfully created",
        userCreation: true,
      });
    },
  ],
  login: [
    loginValidation,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
        omit: {
          password: false,
        },
      });

      if (!user) return res.json([{ msg: "User doesn't exist" }]);
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json([{ msg: "Incorrect credentials" }]);
      }
      if (user?.profileFileId) {
        const { url } = await prisma.file.findUnique({
          where: {
            id: user.profileFileId,
          },
          select: {
            url: true,
          },
        });
        user.url = url;
      }
      delete user.password;
      const token = jwt.sign(
        { id: user.id, username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token, user });
    },
  ],
  guestLogin: async (req, res, next) => {
    try {
      // No validation requred for a guest.
      const user = await prisma.user.findUnique({
        where: {
          username: "Guest",
        },
      });
      const { url } = await prisma.file.findUnique({
        where: {
          id: user.profileFileId,
        },
        select: {
          url: true,
        },
      });
      user.url = url;
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token, user });
    } catch (err) {
      next(err);
    }
  },
};
export default loginController;
