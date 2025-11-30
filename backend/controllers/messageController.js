import prisma from "../db/prisma.js";
import getChatRoom from "../lib/getChatRoom.js";
const messageController = {
  send: async (req, res) => {
    const { content, receiverId } = req.body;
    const senderId = req.user.id;
    if (receiverId === senderId) {
      throw new Error("Receiver Id and sedner Id must not be identical");
    }
    try {
      const chatRoom = await getChatRoom([senderId, receiverId]);
      const message = await prisma.message.create({
        data: {
          authorId: senderId,
          content,
          chatRoomId: chatRoom.id,
        },
      });
      return res.json({
        msg: "Message successfully created",
        createdMessage: message,
        chatRoom,
      });
    } catch (err) {
      return res.json({ msg: "Sending message failed", error: err });
    }
  },
  getRooms: async (req, res) => {
    try {
      const chats = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          chatRooms: true,
        },
      });
      res.json({ chats });
    } catch (err) {
      return res.json({ msg: "Error retriving chat room.", error: err });
    }
  },
  getMessages: async (req, res) => {
    try {
      const chatRoomId = req.body.charRoomId;
      const chats = await prisma.chatRoom.findUnique({
        where: {
          id: chatRoomId,
        },
        include: {
          messages: true,
        },
      });
      if (!chats) return res.json({ chats });
    } catch (err) {
      return res.json({ msg: "Error getting chats", error: err });
    }
  },
};
export default messageController;
