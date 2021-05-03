/*
  Warnings:

  - You are about to drop the column `hash1` on the `Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash2` on the `Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash3` on the `Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash4` on the `Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash5` on the `Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash6` on the `Licence` table. All the data in the column will be lost.
  - Added the required column `hashes` to the `Licence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL,
    "hashes" TEXT NOT NULL,
    FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Licence" ("id", "licenceKey", "status", "expirationDate", "playerId", "featureMask") SELECT "id", "licenceKey", "status", "expirationDate", "playerId", "featureMask" FROM "Licence";
DROP TABLE "Licence";
ALTER TABLE "new_Licence" RENAME TO "Licence";
CREATE UNIQUE INDEX "Licence.licenceKey_unique" ON "Licence"("licenceKey");
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "notes" TEXT,
    "patreonId" TEXT,
    "patreonName" TEXT,
    "manager" INTEGER,
    "role" INTEGER NOT NULL DEFAULT 1000
);
INSERT INTO "new_Player" ("id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role") SELECT "id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player.email_unique" ON "Player"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
