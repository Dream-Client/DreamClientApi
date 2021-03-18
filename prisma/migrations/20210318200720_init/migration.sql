-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "patreonId" TEXT NOT NULL,
    "patreonName" TEXT NOT NULL,
    "manager" INTEGER NOT NULL,
    "role" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL,
    "hash1" TEXT NOT NULL,
    "hash2" TEXT NOT NULL,
    "hash3" TEXT NOT NULL,
    "hash4" TEXT NOT NULL,
    "hash5" TEXT NOT NULL,
    "hash6" TEXT NOT NULL,
    FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log_Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL,
    "hash1" TEXT NOT NULL,
    "hash2" TEXT NOT NULL,
    "hash3" TEXT NOT NULL,
    "hash4" TEXT NOT NULL,
    "hash5" TEXT NOT NULL,
    "hash6" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Log_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "patreonId" TEXT NOT NULL,
    "patreonName" TEXT NOT NULL,
    "manager" INTEGER NOT NULL,
    "role" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Player.email_unique" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Licence.licenceKey_unique" ON "Licence"("licenceKey");

-- CreateIndex
CREATE UNIQUE INDEX "Log_Licence.licenceKey_unique" ON "Log_Licence"("licenceKey");

-- CreateIndex
CREATE UNIQUE INDEX "Log_Player.email_unique" ON "Log_Player"("email");
