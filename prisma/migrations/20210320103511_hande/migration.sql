-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "patreonId" TEXT,
    "patreonName" TEXT,
    "manager" INTEGER,
    "role" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Log_Player" ("id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role", "action", "timestamp") SELECT "id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role", "action", "timestamp" FROM "Log_Player";
DROP TABLE "Log_Player";
ALTER TABLE "new_Log_Player" RENAME TO "Log_Player";
CREATE UNIQUE INDEX "Log_Player.email_unique" ON "Log_Player"("email");
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "patreonId" TEXT,
    "patreonName" TEXT,
    "manager" INTEGER,
    "role" INTEGER NOT NULL
);
INSERT INTO "new_Player" ("id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role") SELECT "id", "email", "name", "discordId", "discordName", "notes", "patreonId", "patreonName", "manager", "role" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player.email_unique" ON "Player"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
