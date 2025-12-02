import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/config", userController.getConfig);
userRouter.post("/config", userController.updateConfig);
export default userRouter;
