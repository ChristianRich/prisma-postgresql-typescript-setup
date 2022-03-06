import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const client = new PrismaClient();

export const getUser = async () => {
  // TODO Return a single user by name
  // const users: User[] = await client.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });

  const users: User[] = await client.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  return users;
};
