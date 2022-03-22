# Prisma with PostgreSQL, TypeScript, Serverless and Parameter Store

This project is the outcome of following the [Prisma Getting Started](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres) guide.

In addition, Serverless features have been added for seamless AWS deployments.

## Prerequisites

- AWS account
- A running PostgreSQL database e.g Amazon Aurora RDS PostgreSQL
- A valid database connection string

To run this project:

```
npm i
```

## Modify `.env`

See `.env.sample`

This step is only required if you plan on running the app on localhost.

```
DATABASE_URL=postgresql://user:password@host:port/db-name
```

## Add secret database string to AWS Parameter Store

When Serverless builds the deployment package, it fetches the database connection string from Parameter Store.

Modify the `provider` block in `serverless.yaml`:

```
environment:
    DATABASE_URL: ${ssm:/dev/my-app/my-connection}
```

Then go to Parameter Store and create the following secret e.g
```
/dev/my-app/my-connection = postgresql://user:password@host:port/db-name
```
## Create Prisma client

This generates a custom built Prisma client based on your schema
```
npx prisma generate
```
## Run sample migration

This will create the desired tables for you
```
npx prisma migrate dev
```

## Seed the DB

Next, create two users Alice and Bob

```
npm run db:seed
```

## Deploy application to AWS Lambda

```
sls deploy
```

## Test the service
Copy the API Gateway URL from the Serverless output in the console to Postman.

```
GET https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/dev/users/alice
```

Should return Alice:

```
{
    "id": 1,
    "email": "alice@prisma.io",
    "name": "Alice"
}
```
