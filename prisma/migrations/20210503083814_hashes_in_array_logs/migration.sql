/*
  Warnings:

  - You are about to drop the column `hash1` on the `Log_Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash2` on the `Log_Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash3` on the `Log_Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash4` on the `Log_Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash5` on the `Log_Licence` table. All the data in the column will be lost.
  - You are about to drop the column `hash6` on the `Log_Licence` table. All the data in the column will be lost.
  - Added the required column `hashes` to the `Log_Licence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 2000,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL,
    "hashes" TEXT NOT NULL,
    FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Licence" ("id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "hashes") SELECT "id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "hashes" FROM "Licence";
DROP TABLE "Licence";
ALTER TABLE "new_Licence" RENAME TO "Licence";
CREATE UNIQUE INDEX "Licence.licenceKey_unique" ON "Licence"("licenceKey");
CREATE TABLE "new_Log_Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL,
    "hashes" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Log_Licence" ("id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "action", "timestamp") SELECT "id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "action", "timestamp" FROM "Log_Licence";
DROP TABLE "Log_Licence";
ALTER TABLE "new_Log_Licence" RENAME TO "Log_Licence";
CREATE UNIQUE INDEX "Log_Licence.licenceKey_unique" ON "Log_Licence"("licenceKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
