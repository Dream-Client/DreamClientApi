-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `discordId` VARCHAR(191) NOT NULL,
    `discordName` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191),
    `patreonId` VARCHAR(191),
    `patreonName` VARCHAR(191),
    `manager` INTEGER,
    `role` INTEGER NOT NULL DEFAULT 1000,
UNIQUE INDEX `Player.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Licence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licenceKey` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 2000,
    `expirationDate` DATETIME(3) NOT NULL,
    `playerId` INTEGER NOT NULL,
    `featureMask` VARCHAR(191) NOT NULL DEFAULT 'ffffffff',
    `hashes` VARCHAR(191) NOT NULL DEFAULT '[]',
UNIQUE INDEX `Licence.licenceKey_unique`(`licenceKey`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uploadDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `checksum` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `vrcVersion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log_Licence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licenceKey` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `playerId` INTEGER NOT NULL,
    `featureMask` VARCHAR(191) NOT NULL,
    `hashes` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Log_Licence.licenceKey_unique`(`licenceKey`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log_Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `discordId` VARCHAR(191) NOT NULL,
    `discordName` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `patreonId` VARCHAR(191),
    `patreonName` VARCHAR(191),
    `manager` INTEGER,
    `role` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Log_Player.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Licence` ADD FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
