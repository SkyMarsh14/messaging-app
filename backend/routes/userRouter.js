import { Router } from "express";
import userController from "../controllers/userController.js";
import profileUpload from "../middleware/profileUpload.js";
const userRouter = Router();
userRouter.get("/config", userController.getConfig);
userRouter.post("/config", userController.updateConfig);
userRouter.post(
  "/profile",
  profileUpload.single("profilePic"),
  userController.uploadProfile
);
userRouter.get("/others", userController.getAllUsers);
userRouter.delete("/profile", userController.profile);
export default userRouter;
