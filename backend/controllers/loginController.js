import { validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import { createUserValidation, loginValidation } from "../lib/validators.js";
import passport from "passport";
const loginController = {
  createUser: [
    createUserValidation,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
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
      return res.json({
        msg: "User successfully created.",
        userCreation: true,
      });
    },
  ],
  login: [
    loginValidation,
    (req, res) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return res.status(500).json({ msg: "Server error" });
        }
        if (!user) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
        req.logIn(user, (err) => {
          if (err) return res.status(500).json({ msg: "Login failed" });
          const { id, username } = user;
          return res.json({
            msg: "User successfully logged in",
            user: { id, username },
          });
        });
      })(req, res);
    },
  ],
};
export default loginController;
