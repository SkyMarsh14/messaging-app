import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  // --- Hash passwords ---

  const yutoPass = await bcrypt.hash("password123", 10);
  const mariaPass = await bcrypt.hash("password123", 10);
  const alexPass = await bcrypt.hash("password123", 10);
  const saraPass = await bcrypt.hash("password123", 10);
  const adminPass = await bcrypt.hash("password123", 10);

  // --- Users ---
  const users = [
    {
      id: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      username: "yuto",
      password: yutoPass,
    },
    {
      id: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      username: "maria",
      password: mariaPass,
    },
    {
      id: "e21af723-0e82-44cc-b621-12ef900d0003",
      username: "alex",
      password: alexPass,
    },
    {
      id: "f781c884-9f53-4e98-92ce-1818300d0004",
      username: "sara",
      password: saraPass,
    },
    {
      id: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      username: "admin",
      password: adminPass,
    },
  ];

  // --- Sessions ---
  const sessions = [
    {
      id: "sess:a12dd1f3becc44a899d1d2ce1e11b101",
      sid: "a12dd1f3becc44a899d1d2ce1e11b101",
      data: JSON.stringify({
        cookie: {
          path: "/",
          httpOnly: true,
          maxAge: 1800000,
        },
        userId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      }),
      expiresAt: new Date("2025-02-15T14:10:00.000Z"),
    },
    {
      id: "sess:b22ee2f3ceaa44bbb9d2f3cc2e11b202",
      sid: "b22ee2f3ceaa44bbb9d2f3cc2e11b202",
      data: JSON.stringify({
        cookie: {
          path: "/",
          httpOnly: true,
          maxAge: 1800000,
        },
        userId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      }),
      expiresAt: new Date("2025-02-15T14:45:00.000Z"),
    },
    {
      id: "sess:c33ff3d4deaa55ccc9e3f4dd3f22c303",
      sid: "c33ff3d4deaa55ccc9e3f4dd3f22c303",
      data: JSON.stringify({
        cookie: {
          path: "/",
          httpOnly: true,
          maxAge: 1800000,
        },
        userId: "e21af723-0e82-44cc-b621-12ef900d0003",
      }),
      expiresAt: new Date("2025-02-15T15:12:00.000Z"),
    },
  ];

  // --- Messages ---
  const messages = [
    {
      id: "101a1a11-11aa-44aa-b1a1-111a1a1a0101",
      content: "Hey, are you working on the project today?",
      authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      receiverId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      createdAt: new Date("2025-02-15T10:15:00.000Z"),
    },
    {
      id: "202b2b22-22bb-55bb-b2b2-222b2b2b0202",
      content: "Yeah, I’ll start in an hour. Want to hop on a call?",
      authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      receiverId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      createdAt: new Date("2025-02-15T10:17:20.000Z"),
    },
    {
      id: "303c3c33-33cc-66cc-c3c3-333c3c3c0303",
      content: "Sure, give me 30min!",
      authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      receiverId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      createdAt: new Date("2025-02-15T10:18:00.000Z"),
    },
    {
      id: "606f6f66-66ff-99ff-f6f6-666f6f6f0606",
      content: "Anyone free to test the API endpoint?",
      authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      receiverId: "f781c884-9f53-4e98-92ce-1818300d0004",
      createdAt: new Date("2025-02-15T11:40:00.000Z"),
    },
    {
      id: "707a7a77-77aa-11aa-a7a7-777a7a7a0707",
      content: "Yep, I’m testing now. It returns 200 OK.",
      authorId: "f781c884-9f53-4e98-92ce-1818300d0004",
      receiverId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
      createdAt: new Date("2025-02-15T11:42:50.000Z"),
    },
    {
      id: "909c9c99-99cc-33cc-c9c9-999c9c9c0909",
      content: "Hey admin, can you check user permissions later?",
      authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      createdAt: new Date("2025-02-15T12:10:05.000Z"),
    },
    {
      id: "a0ada0aa-a0dd-44dd-dada-a0ada0ad1010",
      content: "Sure, I’ll review them this afternoon.",
      authorId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
      receiverId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001",
      createdAt: new Date("2025-02-15T12:12:00.000Z"),
    },
  ];

  // --- Insert Data ---
  await prisma.$transaction([
    prisma.user.createMany({ data: users }),
    prisma.session.createMany({ data: sessions }),
    prisma.message.createMany({ data: messages }),
  ]);

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
