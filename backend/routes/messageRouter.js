import { Router } from "express";
import messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.post("/send", messageController.send);
messageRouter.get("/chat/:chatRoomId", messageController.getMessages);
export default messageRouter;
