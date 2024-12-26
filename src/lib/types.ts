import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    username: true,
    email: true,
  };
}
