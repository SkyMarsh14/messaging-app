import { Router } from "express";
import messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.post("/send", messageController.send);
export default messageRouter;
