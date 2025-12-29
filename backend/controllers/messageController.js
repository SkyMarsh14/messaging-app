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
  getMessageByUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const chatRoom = await getChatRoom([req.user.id, userId]);
      const chats = await prisma.message.findMany({
        where: {
          chatRoomId: chatRoom.id,
        },
      });
      return res.json(chats);
    } catch (err) {
      next(err);
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
      for (const room of chatRooms) {
        for (const roomUser of room.chatRoomUsers) {
          if (roomUser.user.id !== userId) {
            if (roomUser.user?.profileFileId) {
              const file = await prisma.file.findUnique({
                where: {
                  id: roomUser.user.profileFileId,
                },
                select: {
                  url: true,
                },
              });
              roomUser.user.url = file.url;
            }
            chatRoomArray.push(roomUser);
          }
        }
      }
      return res.json(chatRoomArray);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Failed to retrive rooms", error: err });
    }
  },
  getMessageByChatRoom: async (req, res) => {
    try {
      const chats = await prisma.chatRoom.findUnique({
        where: {
          id: Number(req.params.chatRoomId),
        },
        include: {
          chatRoomUsers: true,
          messages: true,
        },
      });
      if (!chats) return res.json({ chats });
      return res.json(chats);
    } catch (err) {
      return res.json({ msg: "Error getting chats", error: err });
    }
  },
};
export default messageController;
