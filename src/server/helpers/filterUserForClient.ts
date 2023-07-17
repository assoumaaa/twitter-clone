import { User } from "@clerk/nextjs/dist/types/server";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.firstName,
    profilePicture: user.profileImageUrl,
  };
};