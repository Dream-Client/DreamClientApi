-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uploadDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checksum" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '',
    "vrcVersion" TEXT NOT NULL
);
INSERT INTO "new_Client" ("id", "uploadDate", "checksum", "path", "vrcVersion") SELECT "id", "uploadDate", "checksum", "path", "vrcVersion" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
