-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "type_notification" TEXT NOT NULL,
    "idmetadata" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "iduser" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_idmetadata_key" ON "Notification"("idmetadata");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_idmetadata_fkey" FOREIGN KEY ("idmetadata") REFERENCES "Metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
