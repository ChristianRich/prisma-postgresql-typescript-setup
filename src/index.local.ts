import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { apigV1Decorator } from '../fixtures/aws/apig-v1-decorator';
import { getContext } from '../fixtures/aws/context';
import { main } from './handlers/getUser';

void (async () => {
  const event: APIGatewayProxyEvent = apigV1Decorator();
  const context: Context = getContext();
  const result: any = await main(event, context, () => {});
  console.log(result);
})();
