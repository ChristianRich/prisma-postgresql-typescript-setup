# Up and running with Prisma using TypeScript and PostgreSQL

This project follows the Prisma "Getting Started" step-by-step guide for Prisma with PostgreSQL and TypeScript:

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres

After you have run these steps you'll gain fundamental knowledge of how Prisma works and better equipped for your first Prisma software project using PostgreSQL and TypeScript.

For this exercice I used Amazon RDS Aurora PostgreSQL with a remote connection to AWS for dev/testing.

This exercise should take around 30 min.

My overall development goal is to create a REST HTTP API deployed to AWS Lambda / API Gateway with Prisma as ORM and PostgreSQL as persistent storage.

## 1. New project setup

Starting from a clean slate:

```sh
mkdir hello-prisma
cd hello-prisma
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
```

Next, create a tsconfig.json file and add the following configuration to it:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

## 2. Initialise new Prisma project

Next, set up your Prisma project by creating your Prisma schema file with the following command:

```sh
npx prisma init
```

This command does two things:

- Creates a new directory called `/prisma` that contains a file called `schema.prisma`, which contains the Prisma schema with your database connection variable and schema models
- Creates the `.env` file in the root directory of the project, which is used for defining environment variables (such as your database connection).

## 3. Connect your database

Add your connection string to `.env`

```sh
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## 4. Using Prisma Migrate

Add the following Prisma data model to your Prisma schema in `/prisma/schema.prisma`:

```js
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

To map your data model to the database schema, you need to use the prisma migrate CLI commands:

```sh
npx prisma migrate dev --name init
```

This command does two things:

- It creates a new SQL migration file for this migration
- It runs the SQL migration file against the database

> Note: `npx prisma generate` is called under the hood by default, after running `npx prisma migrate dev`. If the prisma-client-js generator is defined in your schema, this will check if @prisma/client is installed and install it if it's missing.

Great, you now created three tables in your database with Prisma Migrate 🚀

https://www.prisma.io/docs/concepts/components/prisma-migrate

## 5. Install Prisma client

To get started with Prisma client, you need to install the `@prisma/client` package:

```sh
npm install @prisma/client
```

This command does two things:

- Install a tailor-made client into `/node_modules/.prisma/client/`
- Invoke the `prisma generate` command under the hood

> Eveytime you change change the schema or adding models you must run `npx prisma generate` to generate a new Prima client. If you miss step step, the Prisma client will not understand your changes.

In this context, the Prisma `client` simply refers to the instance used to interact with your PostgreSQL DB e.g

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## 6. Run

```sh
npm run dev

# Equivalent to
npx ts-node index.ts
```

Should output:

```json
[
  {
    id: 1,
    email: 'alice@prisma.io',
    name: 'Alice',
    status: 'unverified',
    posts: [
      {
        id: 1,
        createdAt: 2022-03-05T09:59:00.755Z,
        updatedAt: 2022-03-05T09:59:00.756Z,
        title: 'Check out Prisma with Next.js',
        content: 'https://www.prisma.io/nextjs',
        published: true,
        authorId: 1
      }
    ],
    profile: { id: 1, bio: 'I like turtles', userId: 1 }
  },
  {
    id: 2,
    email: 'bob@prisma.io',
    name: 'Bob',
    status: 'unverified',
    posts: [
      {
        id: 2,
        createdAt: 2022-03-05T09:59:01.053Z,
        updatedAt: 2022-03-05T09:59:01.054Z,
        title: 'Follow Prisma on Twitter',
        content: 'https://twitter.com/prisma',
        published: true,
        authorId: 2
      },
      {
        id: 3,
        createdAt: 2022-03-05T09:59:01.053Z,
        updatedAt: 2022-03-05T09:59:01.054Z,
        title: 'Follow Nexus on Twitter',
        content: 'https://twitter.com/nexusgql',
        published: true,
        authorId: 2
      }
    ],
    profile: null
  }
]
```

## 7. Important Prisma CLI commands you'll need

```json
"scripts": {
  "db:client:generate": "npx prisma generate",
  "db:migrate:dev": "npx prisma migrate dev",
  "db:seed": "npx ts-node prisma/seed.ts",
  "db:migrate:reset": "npx prisma migrate reset",
  "db:reset:migrate:seed": "npm run db:migrate:reset && npm run db:migrate:dev && npm run db:seed"
}
```

### `npx prisma generate`

Whenever you make changes to your Prisma schema in the future, you manually need to invoke `npx prisma generate` in order to accommodate the changes in your Prisma Client API.

### `npx prisma migrate dev`

Migrates local schema changes to your DB

### `npx prisma migrate reset`

Permanently deletes all of your tables and data

## 8. Seeding your database

This guide describes how to seed your database using Prisma Client and Prisma's integrated seeding functionality. Seeding allows you to consistently re-create the same data in your database and can be used to:

- Populate your database with data that is required for your application to start - for example, a default language or a default currency.
- Provide basic data for validating and using your application in a development environment. This is particularly useful if you are using Prisma Migrate, which sometimes requires resetting your development database.

Create a seed script in `/prisma/seed.ts`:

[seed.ts](./prisma/seed.ts)

Create a new script in `package.json`

```json
"scripts": {
  "db:seed": "npx ts-node prisma/seed.ts"
}
```

Make sure your schema is in sync with your localhost:

```sh
npm run db:migrate:dev

# Equivalent to
npx prisma migrate dev
```

Then, run the seed command

```sh
npm run db:seed
```

> Excerpt from https://www.prisma.io/docs/guides/database/seed-database

# Notes

https://github.com/AmoDinho/prisma2-f1-demo

https://www.npmjs.com/package/serverless-webpack-prisma



## PostgreSQL UI apps

When testing I tried a few database GUI tools for quick data inspection.
My goal here, is not to manage the database, but to browse the tables and manipulate the data for dev / testing purposes.

[PG admin](https://www.pgadmin.org/)

As the name implies, it's more of a database admin tool, I did not find it particularely useful for quick data access and manipulation without having to write SQL commands and click / brose around in the tree in the left column.

![pg-admin](/images/pg-admin.png?raw=true)

[Postico](https://eggerapps.at/postico/)

Great app for browsing your tables effortlessly and play around with the data, however it's not free.

![postico](/images/postico.png?raw=true)
![postico](/images/postico-tableview.png?raw=true)

## Prisma CLI commands

```
Commands

            init   Setup Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)
              db   Manage your database schema and lifecycle
         migrate   Migrate your database
          studio   Browse your data with Prisma Studio
          format   Format your schema
```

```
Examples

  Setup a new Prisma project
  $ prisma init

  Generate artifacts (e.g. Prisma Client)
  $ prisma generate

  Browse your data
  $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  $ prisma migrate dev

  Pull the schema from an existing database, updating the Prisma schema
  $ prisma db pull

  Push the Prisma schema state to the database
  $ prisma db push
```
