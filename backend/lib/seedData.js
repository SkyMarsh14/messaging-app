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
    profile: {
      create: {
        public_id: "Stan-marsh-0_tejlcx",
        url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766990852/Stan-marsh-0_tejlcx.webp",
      },
    },
  },
  {
    id: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002",
    username: "Eric",
    password: ericPass,
    profile: {
      create: {
        public_id: "Eric-cartman_aeec5e",
        url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766989900/Eric-cartman_aeec5e.webp",
      },
    },
  },
  {
    id: "e21af723-0e82-44cc-b621-12ef900d0003",
    username: "Kyle",
    password: kylePass,
    profile: {
      create: {
        public_id: "Kyle-broflovski_nsf6wp",
        url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766990959/Kyle-broflovski_nsf6wp.webp",
      },
    },
  },
  {
    id: "82d52a75-c363-4010-ad97-cd129c9b218c",
    username: "Kenny",
    password: kennyPass,
    profile: {
      create: {
        public_id: "60e59bba-7545-474d-a6de-728dd3c94f3a",
        url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1767009820/60e59bba-7545-474d-a6de-728dd3c94f3a.png",
      },
    },
  },
  {
    id: "f781c884-9f53-4e98-92ce-1818300d0004",
    username: "Butters",
    password: buttersPass,
    profile: {
      create: {
        public_id: "534de966-7658-4969-8800-4afe73010640",
        url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1767009900/534de966-7658-4969-8800-4afe73010640.png",
      },
    },
  },
];

const messages = [
  {
    content: "Dude, you better not kill Kenny again in this build.",
    authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
    createdAt: new Date("2025-02-15T10:15:00.000Z"),
  },
  {
    content: "Respect my authoritah! I pushed directly to main.",
    authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
    createdAt: new Date("2025-02-15T10:17:20.000Z"),
  },
  {
    content: "Kyle says this logic is wrong and also morally offensive.",
    authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
    createdAt: new Date("2025-02-15T10:18:00.000Z"),
  },
  {
    content: "Mmmph mmph! (I merged without testing.)",
    authorId: "82d52a75-c363-4010-ad97-cd129c9b218c", // Kenny
    createdAt: new Date("2025-02-15T10:25:00.000Z"),
  },
  {
    content: "Mmmph! (The build is gonna explode.)",
    authorId: "82d52a75-c363-4010-ad97-cd129c9b218c", // Kenny
    createdAt: new Date("2025-02-15T10:27:30.000Z"),
  },
  {
    content: "Oh hamburgers… I deployed to prod by mistake.",
    authorId: "f781c884-9f53-4e98-92ce-1818300d0004", // Butters
    createdAt: new Date("2025-02-15T11:40:00.000Z"),
  },
  {
    content: "If this breaks, I blame Canada.",
    authorId: "c4a52d34-6bdf-47b4-8e52-dc22a7d80002", // Eric
    createdAt: new Date("2025-02-15T11:42:50.000Z"),
  },
  {
    content: "This chat room feels like Tegridy Farms.",
    authorId: "a1f3e3bb-7df1-4a1b-9f90-141c0f3fb001", // Stan
    createdAt: new Date("2025-02-15T12:10:05.000Z"),
  },
  {
    content: "You guys, I’m seriously super cereal about these bugs.",
    authorId: "e21af723-0e82-44cc-b621-12ef900d0003", // Kyle
    createdAt: new Date("2025-02-15T12:12:00.000Z"),
  },
];

function getMessages(receiverId) {
  return messages.map((message) => {
    return { ...message, receiverId };
  });
}

const profile = [
  {
    public_id: "Stan-marsh-0_tejlcx",
    url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766990852/Stan-marsh-0_tejlcx.webp",
  },
  {
    public_id: "Eric-cartman_aeec5e",
    url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766989900/Eric-cartman_aeec5e.webp",
  },
  {
    public_id: "Kyle-broflovski_nsf6wp",
    url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1766990959/Kyle-broflovski_nsf6wp.webp",
  },
  {
    public_id: "60e59bba-7545-474d-a6de-728dd3c94f3a",
    url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1767009820/60e59bba-7545-474d-a6de-728dd3c94f3a.png",
  },
  {
    public_id: "534de966-7658-4969-8800-4afe73010640",
    url: "https://res.cloudinary.com/dzor53b0k/image/upload/v1767009900/534de966-7658-4969-8800-4afe73010640.png",
  },
];
export { getMessages, users, profile };
