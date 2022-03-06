import { Context } from 'aws-lambda';

export const getContext = (args?: Object): Context => ({
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'MyFunction',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:us-east-2:1234567890:function:MyFunction',
  memoryLimitInMB: '512',
  awsRequestId: '4e7edb54-1989-426b-aa7c-554a4fc30ab0',
  logGroupName: 'MyFunction',
  logStreamName: 'MyFunction',
  getRemainingTimeInMillis: () => 0,
  done: (error?: Error, result?: any) =>
    console.log('localhost context done', error, result), // eslint-disable-line no-console
  fail: (error: Error | string) => console.log('localhost context fail', error), // eslint-disable-line no-console
  succeed: (messageOrObject: any) =>
    console.log('localhost context succeed', messageOrObject), // eslint-disable-line no-console
  ...args,
});
