-- CreateEnum
CREATE TYPE "Status" AS ENUM ('unverified', 'verified', 'suspended');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'unverified';
