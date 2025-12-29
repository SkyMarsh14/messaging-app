import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import getChatRoom from "../lib/getChatRoom.js";

async function main() {
  // --- Hash passwords ---

  const stanPass = await bcrypt.hash("password123", 10);
  const ericPass = await bcrypt.hash("password123", 10);
  const kylePass = await bcrypt.hash("password123", 10);
  const buttersPass = await bcrypt.hash("password123", 10);
  const guestPass = await bcrypt.hash("manbearpig", 10);

  // --- Users ---
  const users = [
    {
      id: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      username: "Stan",
      password: stanPass,
    },
    {
      id: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      username: "Eric",
      password: ericPass,
    },
    {
      id: "e21af723-0e82-44cc-b621-12ef900d0003",
      username: "Kyle",
      password: kylePass,
    },
    {
      id: "f781c884-9f53-4e98-92ce-1818300d0004",
      username: "Butters",
      password: buttersPass,
    },
    {
      id: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      username: "Guest",
      password: guestPass,
    },
  ];

  // --- Messages ---
  // --- Messages ---
  const messages = [
    {
      id: "101a1a11-11aa-44aa-b1a1-111a1a1a0101",
      content: "Dude, you better not kill Kenny again in this build.",
      authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005", // guest
      createdAt: new Date("2025-02-15T10:15:00.000Z"),
    },
    {
      id: "202b2b22-22bb-55bb-b2b2-222b2b2b0202",
      content: "Respect my authoritah! I pushed directly to main.",
      authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T10:17:20.000Z"),
    },
    {
      id: "303c3c33-33cc-66cc-c3c3-333c3c3c0303",
      content: "Kyle says this logic is wrong and also morally offensive.",
      authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T10:18:00.000Z"),
    },
    {
      id: "606f6f66-66ff-99ff-f6f6-666f6f6f0606",
      content: "Oh hamburgers… I deployed to prod by mistake.",
      authorId: "f781c884-9f53-4e98-92ce-1818300d0004", // Butters
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T11:40:00.000Z"),
    },
    {
      id: "707a7a77-77aa-11aa-a7a7-777a7a7a0707",
      content: "If this breaks, I blame Canada.",
      authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T11:42:50.000Z"),
    },
    {
      id: "909c9c99-99cc-33cc-c9c9-999c9c9c0909",
      content: "This chat room feels like Tegridy Farms.",
      authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T12:10:05.000Z"),
    },
    {
      id: "a0ada0aa-a0dd-44dd-dada-a0ada0ad1010",
      content: "You guys, I’m seriously super cereal about these bugs.",
      authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T12:12:00.000Z"),
    },
  ];

  // --- Insert Data ---
  const userData = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
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
      id: m.id,
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
