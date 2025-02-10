-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "provinceId" TEXT,
    "districtId" TEXT,
    "userType" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Province" (
    "provinceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("provinceId")
);

-- CreateTable
CREATE TABLE "District" (
    "districtId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("districtId")
);

-- CreateTable
CREATE TABLE "Place" (
    "placeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pricePerPerson" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("placeId")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "itineraryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "places" JSONB NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("itineraryId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "timeInterval" JSONB NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "PaymentInformation" (
    "paymentId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardHolderName" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,

    CONSTRAINT "PaymentInformation_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("provinceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("districtId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("provinceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("provinceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("districtId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Province_fkey" FOREIGN KEY ("typeId") REFERENCES "Province"("provinceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_District_fkey" FOREIGN KEY ("typeId") REFERENCES "District"("districtId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_Place_fkey" FOREIGN KEY ("typeId") REFERENCES "Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("provinceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("districtId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentInformation"("paymentId") ON DELETE RESTRICT ON UPDATE CASCADE;
