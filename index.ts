import { PrismaClient, User } from '@prisma/client';

// Infer enums from types
// https://stackoverflow.com/questions/68520816/using-prisma-and-typescript-models-in-parallel
type Status = User['status'];

void (async () => {
  const prisma = new PrismaClient();

  const users: User[] = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.dir(users, { depth: null });
})();
