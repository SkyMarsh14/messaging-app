import { Router } from "express";
import messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.post("/send", messageController.send);
messageRouter.get(
  "/chatRoom/:chatRoomId",
  messageController.getMessageByChatRoom
);
messageRouter.get("/user/:userId", messageController.getMessageByUser);
messageRouter.get("/room", messageController.getRooms);
export default messageRouter;
