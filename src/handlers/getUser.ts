import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { getUser } from '../repos/user';

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  const { pathParameters } = event;
  console.log('pathParameters', pathParameters);
  // const { username } = event.pathParameters;
  const user = await getUser();
  const response = {
    statusCode: 200,
    body: JSON.stringify(user),
  };

  return response;
};
