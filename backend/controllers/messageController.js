import prisma from "../db/prisma.js";
const messageController = {
  send: async (req, res) => {
    const { content, chatRoomId } = req.body;
    try {
      const message = await prisma.message.create({
        data: {
          authorId: req.user.id,
          chatRoomId: chatRoomId,
          content,
        },
      });
      return res.json({
        msg: "Message successfully created",
        createdMessage: message,
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
