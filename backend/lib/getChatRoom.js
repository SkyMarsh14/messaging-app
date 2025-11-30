import prisma from "../db/prisma.js";
// Users should be an array of users with userId
// Retrun if there's already a chatroom associated with the user, if not, it will creat one and return it.
async function getChatRoom(usersId) {
  if (!Array.isArray(usersId || usersId.length == 0)) {
    throw new Error("usersId must be a non-empty array");
  }
  const type = usersId.length > 2 ? "GROUP" : "DIRECT"; // More than 2 users to be the group chat.
  let chatRoom = await prisma.chatRoom.findFirst({
    where: {
      type: type,
      chatRoomUsers: {
        every: {
          userId: {
            in: usersId,
          },
        },
      },
    },
  });
  if (!chatRoom) {
    chatRoom = await prisma.chatRoom.create({
      data: {
        type: type,
        chatRoomUsers: {
          create: usersId.map((id) => ({
            userId: id,
          })),
        },
      },
      include: { chatRoomUsers: true },
    });
  }
  return chatRoom;
}

export default getChatRoom;
