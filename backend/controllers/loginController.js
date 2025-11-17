import { validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import {
  usernameValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "../lib/validators.js";
const loginController = {
  createUser: [
    usernameValidation,
    passwordValidation,
    confirmPasswordValidation,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.empty()) {
        return res.status(400).json(errors.array());
      }
      const { username, password } = req.body;
      try {
        await prisma.user.create({
          data: {
            username,
            password,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
      return res.json({ msg: "User successfully created." });
    },
  ],
};
export default loginController;
