import { APIGatewayProxyEvent } from 'aws-lambda';

const formatBody = (body: Record<any, string> | null): string | null => {
  if (!body) {
    return null;
  }
  return typeof body === 'string' ? body : JSON.stringify(body);
};

export const apigV1Decorator = (
  body: Record<any, string> | null = null,
  args?: Record<any, any>,
): APIGatewayProxyEvent => ({
  body: formatBody(body),
  resource: '/apis/my-api/auth',
  path: '/apis/my-api/auth',
  httpMethod: 'GET',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Host: 'pdz1rmfsre.execute-api.ap-southeast-2.amazonaws.com',
    'Postman-Token': 'b82e087e-02e8-4bf2-ae06-5f30a9e6a967',
    'User-Agent': 'PostmanRuntime/7.29.0',
    'X-Amzn-Trace-Id': 'Root=1-61f8c4e4-47dd3334450221512fc8cae6',
    'X-Forwarded-For': '3.106.4.76',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  multiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Host: ['pdz1rmfsre.execute-api.ap-southeast-2.amazonaws.com'],
    'Postman-Token': ['b82e087e-02e8-4bf2-ae06-5f30a9e6a967'],
    'User-Agent': ['PostmanRuntime/7.29.0'],
    'X-Amzn-Trace-Id': ['Root=1-61f8c4e4-47dd3334450221512fc8cae6'],
    'X-Forwarded-For': ['3.106.4.76'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
    'X-Idempotency-Enabled': ['0'],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: {
    username: 'alice',
  },
  stageVariables: null,
  requestContext: {
    resourceId: '2yyu7k',
    resourcePath: '/apis/{apiName}/auth',
    httpMethod: 'GET',
    extendedRequestId: 'M2OzvE54SwMFs5Q=',
    requestTime: '01/Feb/2022:05:28:04 +0000',
    path: '/dev/apis/foo/auth',
    accountId: '747327224502',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    domainPrefix: 'pdz1rmfsre',
    requestTimeEpoch: 1643693284568,
    requestId: 'e3568aef-0df0-44ce-b3bd-914eba65b935',
    identity: {
      apiKey: null,
      apiKeyId: null,
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '3.106.4.76',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'PostmanRuntime/7.29.0',
      user: null,
      clientCert: null,
    },
    authorizer: {},
    domainName: 'pdz1rmfsre.execute-api.ap-southeast-2.amazonaws.com',
    apiId: 'pdz1rmfsre',
  },
  isBase64Encoded: false,
  ...args,
});
