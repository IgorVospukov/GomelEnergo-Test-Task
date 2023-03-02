-- CreateTable
CREATE TABLE `MessageHeader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageVersion` INTEGER NOT NULL,
    `senderCode` INTEGER NOT NULL,
    `messageNumber` INTEGER NOT NULL,
    `dateOfCreation` DATETIME(3) NOT NULL,
    `numberOfRecords` INTEGER NOT NULL,
    `settlementAgentUNUR` INTEGER NOT NULL,
    `serviceProviderAccount` INTEGER NOT NULL,
    `serviceProviderBankUNUR` INTEGER NOT NULL,
    `serviceProviderAccNumber` VARCHAR(28) NOT NULL,
    `paymentDocumentNumber` INTEGER NOT NULL,
    `dateOfFundsTransfer` DATETIME(3) NOT NULL,
    `currencyCode` INTEGER NOT NULL,
    `totalAmountOfOperations` VARCHAR(16) NOT NULL,
    `totalAmountOfPenalty` VARCHAR(16) NOT NULL,
    `transferredAmount` VARCHAR(16) NOT NULL,
    `elementAgentBankUNUR` INTEGER NOT NULL,
    `elementAgentAccNumber` VARCHAR(28) NOT NULL,
    `budgetPaymentCode` VARCHAR(5) NULL,
    `totalPaymentToBudget` VARCHAR(12) NULL,
    `withheldRemuneration` VARCHAR(12) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recordNumber` INTEGER NOT NULL,
    `serviceNumber` VARCHAR(8) NULL,
    `accountNumber` VARCHAR(30) NOT NULL,
    `consumerName` VARCHAR(191) NULL,
    `consumerAddress` VARCHAR(191) NULL,
    `paymentPeriod` DATETIME(3) NULL,
    `totalPaymentAmount` DOUBLE NOT NULL,
    `penaltyAmount` DOUBLE NOT NULL,
    `paidAmount` DOUBLE NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL,
    `meterReadings` VARCHAR(191) NOT NULL,
    `demandDate` DATETIME(3) NULL,
    `centralOpNumber` VARCHAR(191) NOT NULL,
    `agentOpNumber` INTEGER NOT NULL,
    `terminalId` VARCHAR(30) NOT NULL,
    `authMethod` VARCHAR(10) NULL,
    `additionalDetails` VARCHAR(191) NULL,
    `additionalData` VARCHAR(191) NULL,
    `authDeviceId` VARCHAR(30) NULL,
    `deviceType` INTEGER NOT NULL,
    `budgetPayment` VARCHAR(12) NULL,
    `rewardAmount` VARCHAR(12) NULL,
    `messageHeaderId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payer` ADD CONSTRAINT `Payer_messageHeaderId_fkey` FOREIGN KEY (`messageHeaderId`) REFERENCES `MessageHeader`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
