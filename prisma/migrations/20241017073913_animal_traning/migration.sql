-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "CurriculumStep" AS ENUM ('LECTURE', 'LECTURE_END', 'TRANING', 'END');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "OccupationType" AS ENUM ('TRAINER', 'VETERINARIAN', 'GROOMER', 'PROFESSOR');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'BEAUTY', 'HEALTH', 'WALK', 'TRAINING', 'ADOPT', 'PLAY', 'COMMUNICATION');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('ADOPTION', 'Abandon');

-- CreateEnum
CREATE TYPE "RatingStatus" AS ENUM ('VERY_GOOD', 'GOOD', 'GENERAL', 'BAD');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('ATTENDANCE', 'TARDY', 'ABSENT', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "MembershipType" AS ENUM ('STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "registrationNumber" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "GenderType" NOT NULL DEFAULT 'MALE',
    "isNewNews_SMS" BOOLEAN NOT NULL DEFAULT true,
    "isNotice_SMS" BOOLEAN NOT NULL DEFAULT true,
    "isPromotion_SMS" BOOLEAN NOT NULL DEFAULT true,
    "isNewNews_Email" BOOLEAN NOT NULL DEFAULT true,
    "isNotice_Email" BOOLEAN NOT NULL DEFAULT true,
    "isPromotion_Email" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lectureId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" TEXT NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "membershipType" "MembershipType" NOT NULL,
    "membershiPrice" INTEGER NOT NULL DEFAULT 9900,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCurriculum" (
    "id" TEXT NOT NULL,
    "curriculumType" "AnimalType" NOT NULL DEFAULT 'DOG',
    "curriculumStep" "CurriculumStep" NOT NULL DEFAULT 'LECTURE',
    "currentCategory" "Category" NOT NULL DEFAULT 'TRAINING',
    "currentIndex" INTEGER NOT NULL DEFAULT 1,
    "attendances" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCurriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corporation" (
    "id" TEXT NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "corporation_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "business_number" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "introduction" TEXT NOT NULL,
    "career" VARCHAR(255) NOT NULL,
    "profile_img" VARCHAR(255) NOT NULL,
    "traning_location" VARCHAR(255) NOT NULL,
    "traning_name" VARCHAR(255) NOT NULL,
    "corporation_name" VARCHAR(255) NOT NULL,
    "occupation" "OccupationType" NOT NULL DEFAULT 'TRAINER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corporationId" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "animal_type" "AnimalType" NOT NULL DEFAULT 'CAT',
    "price_type" "PriceType" NOT NULL DEFAULT 'FREE',
    "category" "Category" NOT NULL DEFAULT 'TRAINING',
    "thumbnailPath" VARCHAR(255) NOT NULL,
    "videoUrl" VARCHAR(255) NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "bookmark" BOOLEAN NOT NULL DEFAULT false,
    "tutor_name" VARCHAR(255) NOT NULL,
    "tutor_occupation" "OccupationType" NOT NULL DEFAULT 'TRAINER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumLecture" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "animal_type" "AnimalType" NOT NULL DEFAULT 'CAT',
    "category" "Category" NOT NULL DEFAULT 'TRAINING',
    "thumbnailPath" VARCHAR(255) NOT NULL,
    "videoUrl" VARCHAR(255) NOT NULL,
    "tutor_name" VARCHAR(255) NOT NULL,
    "tutor_occupation" "OccupationType" NOT NULL DEFAULT 'TRAINER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT NOT NULL,
    "curriculumCollectionId" TEXT NOT NULL,

    CONSTRAINT "CurriculumLecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adoption" (
    "id" TEXT NOT NULL,
    "adoption_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "abandon_date" TIMESTAMP(3),
    "status" "AdoptionStatus" NOT NULL DEFAULT 'ADOPTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "corporationId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abandon" (
    "id" TEXT NOT NULL,
    "abandon_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adoption_date" TIMESTAMP(3),
    "abandon_reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "corporationId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "Abandon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "age" INTEGER DEFAULT 0,
    "gender" "GenderType" NOT NULL DEFAULT 'MALE',
    "breed" VARCHAR(255) NOT NULL,
    "profile" VARCHAR(255) NOT NULL,
    "additionalImgs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "corporationId" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraningCenter" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "introduction" TEXT NOT NULL,
    "profile" VARCHAR(255) NOT NULL,
    "additionalImgs" TEXT[],
    "address" VARCHAR(255) NOT NULL,
    "holidays" TEXT[],
    "price" INTEGER NOT NULL DEFAULT 0,
    "like" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT NOT NULL,
    "corporationId" TEXT NOT NULL,

    CONSTRAINT "TraningCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,
    "rating" "RatingStatus" NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "traningCenterId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(255),
    "attachments" TEXT[],
    "isFixed" BOOLEAN NOT NULL DEFAULT false,
    "index" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_registrationNumber_key" ON "User"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE INDEX "User_lectureId_idx" ON "User"("lectureId");

-- CreateIndex
CREATE INDEX "UserPayment_userId_idx" ON "UserPayment"("userId");

-- CreateIndex
CREATE INDEX "UserCurriculum_userId_idx" ON "UserCurriculum"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_phoneNumber_key" ON "Corporation"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_email_key" ON "Corporation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_business_number_key" ON "Corporation"("business_number");

-- CreateIndex
CREATE INDEX "Tutor_corporationId_idx" ON "Tutor"("corporationId");

-- CreateIndex
CREATE INDEX "Lecture_tutorId_idx" ON "Lecture"("tutorId");

-- CreateIndex
CREATE INDEX "CurriculumLecture_tutorId_idx" ON "CurriculumLecture"("tutorId");

-- CreateIndex
CREATE INDEX "Adoption_userId_idx" ON "Adoption"("userId");

-- CreateIndex
CREATE INDEX "Adoption_corporationId_idx" ON "Adoption"("corporationId");

-- CreateIndex
CREATE INDEX "Adoption_animalId_idx" ON "Adoption"("animalId");

-- CreateIndex
CREATE INDEX "Abandon_userId_idx" ON "Abandon"("userId");

-- CreateIndex
CREATE INDEX "Abandon_corporationId_idx" ON "Abandon"("corporationId");

-- CreateIndex
CREATE INDEX "Abandon_animalId_idx" ON "Abandon"("animalId");

-- CreateIndex
CREATE INDEX "Animal_userId_idx" ON "Animal"("userId");

-- CreateIndex
CREATE INDEX "Animal_corporationId_idx" ON "Animal"("corporationId");

-- CreateIndex
CREATE INDEX "TraningCenter_tutorId_idx" ON "TraningCenter"("tutorId");

-- CreateIndex
CREATE INDEX "TraningCenter_corporationId_idx" ON "TraningCenter"("corporationId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_traningCenterId_idx" ON "Review"("traningCenterId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCurriculum" ADD CONSTRAINT "UserCurriculum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumLecture" ADD CONSTRAINT "CurriculumLecture_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abandon" ADD CONSTRAINT "Abandon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abandon" ADD CONSTRAINT "Abandon_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abandon" ADD CONSTRAINT "Abandon_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraningCenter" ADD CONSTRAINT "TraningCenter_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraningCenter" ADD CONSTRAINT "TraningCenter_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_traningCenterId_fkey" FOREIGN KEY ("traningCenterId") REFERENCES "TraningCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
