import prisma from "../db/prisma.js";
import getChatRoom from "../lib/getChatRoom.js";
import { getMessages, users, profile } from "../lib/seedData.js";
async function main() {
  // --- Insert Data ---
  const messages = getMessages(users[0].id);
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  const messageData = [];
  const processedChatRooms = new Map(); // create a cache and look up when creating a new chatRoom to prevent race condition.
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

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
