import prisma from "../db/prisma.js";
// Users should be an array of users with userId
// Retrun if there's already a chatroom associated with the user, if not, it will creat one and return it.
async function getChatRoom(usersId) {
  if (!Array.isArray(usersId || usersId.length == 0)) {
    throw new Error("usersId must be a non-empty array");
  }
  const type = usersId.length > 2 ? "GROUP" : "DIRECT"; // More than 2 users to be the group chat.
  const sortedUsers = [...new Set(usersId)].sort();
  let exsitingRoom = await prisma.chatRoom.findFirst({
    where: {
      type: type,
      chatRoomUsers: {
        every: {
          userId: {
            in: sortedUsers,
          },
        },
      },
    },
    include: {
      chatRoomUsers: true,
    },
  });
  if (exsitingRoom && exsitingRoom.chatRoomUsers.length === 2)
    return exsitingRoom;
  return await prisma.chatRoom.create({
    data: {
      type: type,
      chatRoomUsers: {
        create: sortedUsers.map((id) => ({
          userId: id,
        })),
      },
    },
    include: { chatRoomUsers: true },
  });
}

export default getChatRoom;
