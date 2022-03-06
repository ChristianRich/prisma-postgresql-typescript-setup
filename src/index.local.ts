import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { apigV1Decorator } from '../fixtures/aws/apig-v1-decorator';
import { getContext } from '../fixtures/aws/context';
import { handler } from './handlers/getUser';

// Run local using `npm run dev`
// Not really required when you got `serverless offline` but this may suit some developers
void (async () => {
  const event: APIGatewayProxyEvent = apigV1Decorator(null, {
    pathParameters: {
      username: 'alice',
    },
  });
  const context: Context = getContext();
  const result: any = await handler(event, context, () => {});
  console.log('Localhost response:');
  console.log(result);
})();
