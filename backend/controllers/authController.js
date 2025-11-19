import { validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import { createUserValidation, loginValidation } from "../lib/validators.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const loginController = {
  createUser: [
    createUserValidation,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        });
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
      const { username, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });
      if (!user) return res.json({ msg: "User doesn't exist" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.json({ msg: "Incorrect credentials" });
      }
      const token = jwt.sign(
        { id: user.id, username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    },
  ],
};
export default loginController;
