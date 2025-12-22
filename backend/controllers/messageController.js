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
    const userId = req.user.id;
    try {
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          chatRoomUsers: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          chatRoomUsers: {
            include: {
              user: true,
            },
            omit: {
              userId: true,
            },
          },
        },
      });
      const chatRoomArray = [];
      chatRooms.forEach((room) => {
        room.chatRoomUsers.forEach((user) => {
          if (user.userId !== userId) {
            chatRoomArray.push(user);
          }
        });
      });
      return res.json(chatRoomArray);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Failed to retrive rooms", error: err });
    }
  },

  getMessages: async (req, res) => {
    try {
      const chatRoomId = req.body.chatRoomId;
      const chats = await prisma.chatRoom.findUnique({
        where: {
          id: chatRoomId,
        },
        include: {
          chatRoomUsers: true,
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
