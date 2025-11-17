import prisma from "../db/prisma.js";
import { body, validationResult } from "express-validator";
const usernameValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be between 4 to 30 characters.")
    .custom(async (username) => {
      const user = await prisma.user.username({
        where: {
          username,
        },
      });
      if (user) {
        throw new Error("Username already in use");
      }
      return true;
    }),
];
const passwordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 3, max: 40 })
    .withMessage("Password must be within the length of 3 to 40 characters."),
];
const confirmPasswordValidation = [
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation is required.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];
export { usernameValidation, passwordValidation, confirmPasswordValidation };
