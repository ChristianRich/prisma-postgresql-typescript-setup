import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const client = new PrismaClient();

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  const { pathParameters } = event;
  const { username } = pathParameters as any;

  const user: User | null = await client.user.findFirst({
    where: {
      name: {
        equals: username,
        mode: 'insensitive',
      },
    },
  });

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Not Found',
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};
