import prisma from "../db/prisma.js";
import getChatRoom from "./getChatRoom.js";
import { getMessages, users } from "../lib/seedData.js";

const seedChatData = async (receiverId) => {
  const messages = getMessages(receiverId);
  const messageData = [];
  const processedChatRooms = new Map();
  for (const m of messages) {
    const users = [m.authorId, m.receiverId].sort();
    const roomKey = users.join("-");
    let chatRoom;
    if (processedChatRooms.has(roomKey)) {
      chatRoom = processedChatRooms.get(roomKey);
    } else {
      chatRoom = await getChatRoom(users);
      processedChatRooms.set(roomKey, chatRoom);
    }
    messageData.push({
      content: m.content,
      authorId: m.authorId,
      chatRoomId: chatRoom.id,
      createdAt: m.createdAt,
    });
  }
  await prisma.message.createMany({
    data: messageData,
    skipDuplicates: true,
  });
};

export default seedChatData;
