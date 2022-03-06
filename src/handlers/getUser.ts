import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const client = new PrismaClient();

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  const { pathParameters } = event;
  const { username } = pathParameters as Record<string, string>;

  const user: User | null = await client.user.findFirst({
    where: {
      name: {
        equals: username,
        mode: 'insensitive', // ignore case
      },
    },
  });

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Not Found',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};
