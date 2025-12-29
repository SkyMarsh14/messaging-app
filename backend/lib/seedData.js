import bcrypt from "bcryptjs";
const stanPass = await bcrypt.hash("password123", 10);
const ericPass = await bcrypt.hash("password123", 10);
const kylePass = await bcrypt.hash("password123", 10);
const kennyPass = await bcrypt.hash("password123", 10);
const buttersPass = await bcrypt.hash("password123", 10);
const guestPass = await bcrypt.hash("manbearpig", 10);

// --- Users ---
const users = [
  {
    id: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    username: "Guest",
    password: guestPass,
  },
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
    id: "82d52a75-c363-4010-ad97-cd129c9b218c",
    username: "Kenny",
    password: kennyPass,
  },
  {
    id: "f781c884-9f53-4e98-92ce-1818300d0004",
    username: "Butters",
    password: buttersPass,
  },
];

const messages = [
  {
    content: "Dude, you better not kill Kenny again in this build.",
    authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005", // guest
    createdAt: new Date("2025-02-15T10:15:00.000Z"),
  },
  {
    content: "Respect my authoritah! I pushed directly to main.",
    authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T10:17:20.000Z"),
  },
  {
    content: "Kyle says this logic is wrong and also morally offensive.",
    authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T10:18:00.000Z"),
  },
  {
    content: "Mmmph mmph! (I merged without testing.)",
    authorId: "82d52a75-c363-4010-ad97-cd129c9b218c", // Kenny
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T10:25:00.000Z"),
  },
  {
    content: "Mmmph! (The build is gonna explode.)",
    authorId: "82d52a75-c363-4010-ad97-cd129c9b218c", // Kenny
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T10:27:30.000Z"),
  },
  {
    content: "Oh hamburgers… I deployed to prod by mistake.",
    authorId: "f781c884-9f53-4e98-92ce-1818300d0004", // Butters
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T11:40:00.000Z"),
  },
  {
    content: "If this breaks, I blame Canada.",
    authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T11:42:50.000Z"),
  },
  {
    content: "This chat room feels like Tegridy Farms.",
    authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T12:10:05.000Z"),
  },
  {
    content: "You guys, I’m seriously super cereal about these bugs.",
    authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
    receiverId: "19be7d21-bb0b-4625-b6d6-8fd1200d0005",
    createdAt: new Date("2025-02-15T12:12:00.000Z"),
  },
];

function getMessages(receiverId) {
  return messages.map((message) => {
    return { ...message, receiverId };
  });
}
export { getMessages, users };
