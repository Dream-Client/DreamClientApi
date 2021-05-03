-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Licence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenceKey" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 2000,
    "expirationDate" DATETIME NOT NULL,
    "playerId" INTEGER NOT NULL,
    "featureMask" TEXT NOT NULL DEFAULT 'ffffffff',
    "hashes" TEXT NOT NULL DEFAULT '[]',
    FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Licence" ("id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "hashes") SELECT "id", "licenceKey", "status", "expirationDate", "playerId", "featureMask", "hashes" FROM "Licence";
DROP TABLE "Licence";
ALTER TABLE "new_Licence" RENAME TO "Licence";
CREATE UNIQUE INDEX "Licence.licenceKey_unique" ON "Licence"("licenceKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
