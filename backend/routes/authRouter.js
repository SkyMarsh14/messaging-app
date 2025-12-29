import { Router } from "express";
import loginController from "../controllers/authController.js";
const loginRouter = Router();

loginRouter.post("/create", loginController.createUser);
loginRouter.post("/login", loginController.login);
loginRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ msg: "User has been successfully logged out." });
  });
});
loginRouter.get("/guest-login", loginController.guestLogin);
export default loginRouter;
