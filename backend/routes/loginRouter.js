import { Router } from "express";
import loginController from "../controllers/loginController.js";
const loginRouter = Router();

loginRouter.post("/create", loginController.createUser);
loginRouter.post("/login", loginController.login);
export default loginRouter;
