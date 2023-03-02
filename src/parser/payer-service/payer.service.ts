import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-service/prisma.service';
import { ParserService } from '../parser-service/parser.service';
import { Cron } from '@nestjs/schedule';
import { join } from 'path';
import { createReadStream } from 'fs';
import { MessageHeader, Payer, PrismaClient } from '@prisma/client';
import { LoggerService } from '../logger-service/logger.service';

@Injectable()
export class PayerService {
  prisma = new PrismaClient();
  constructor(
    @Inject(ParserService)
    private prismaService: PrismaService,
    private parserService: ParserService,
    private readonly loggerService: LoggerService,
  ) {}
  @Cron('0 0 * * *') // <-- every day calling task
  async processPaymentsData(): Promise<void> {
    try {
      console.log('calling');
      const data = await this.readInputData();
      const parsedData = await this.parserService.parseText(data);
      await this.saveToDb(parsedData.header, parsedData.payments);
      await this.loggerService.log('data into Db saved', 'saved');
    } catch (error) {
      await this.loggerService.log('data into Db not saved', ' not saved');
    }
  }
  async readInputData(): Promise<string> {
    try {
      const filePath = join(__dirname, '../../../src/resources/resources.txt');
      console.log(__dirname);
      console.log(filePath);
      const readFile = createReadStream(filePath);
      const buffers = [];
      readFile.on('data', (chunk) => {
        const buff = Buffer.from(chunk);
        buffers.push(buff);
      });
      return new Promise<string>((resolve, reject) => {
        readFile.on('end', () => {
          const answer = Buffer.concat(buffers).toString();
          resolve(answer);
        });
        readFile.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      throw new Error(`Could not read file, ${error.message}`);
    }
  }
  async saveToDb(header: MessageHeader, payers: Payer[]): Promise<string> {
    try {
      const createdHeaderwithPayersResult =
        await this.prisma.messageHeader.create({
          data: {
            messageVersion: header.messageVersion,
            senderCode: header.senderCode,
            messageNumber: header.messageNumber,
            dateOfCreation: header.dateOfCreation,
            numberOfRecords: header.numberOfRecords,
            settlementAgentUNUR: header.settlementAgentUNUR,
            serviceProviderAccount: header.serviceProviderAccount,
            serviceProviderBankUNUR: header.serviceProviderBankUNUR,
            serviceProviderAccNumber: header.serviceProviderAccNumber,
            paymentDocumentNumber: header.paymentDocumentNumber,
            dateOfFundsTransfer: header.dateOfFundsTransfer,
            currencyCode: header.currencyCode,
            totalAmountOfOperations: header.totalAmountOfOperations,
            totalAmountOfPenalty: header.totalAmountOfPenalty,
            transferredAmount: header.transferredAmount,
            elementAgentBankUNUR: header.elementAgentBankUNUR,
            elementAgentAccNumber: header.elementAgentAccNumber,
            budgetPaymentCode: header.budgetPaymentCode,
            totalPaymentToBudget: header.totalPaymentToBudget,
            withheldRemuneration: header.withheldRemuneration,
            payers: {
              create: payers.map((payer) => {
                const {
                  recordNumber,
                  serviceNumber,
                  accountNumber,
                  consumerName,
                  consumerAddress,
                  paymentPeriod,
                  totalPaymentAmount,
                  penaltyAmount,
                  paidAmount,
                  transactionDate,
                  meterReadings,
                  demandDate,
                  centralOpNumber,
                  agentOpNumber,
                  terminalId,
                  authMethod,
                  additionalDetails,
                  additionalData,
                  authDeviceId,
                  deviceType,
                  budgetPayment,
                  rewardAmount,
                } = payer;

                return {
                  recordNumber,
                  serviceNumber,
                  accountNumber,
                  consumerName,
                  consumerAddress,
                  paymentPeriod,
                  totalPaymentAmount,
                  penaltyAmount,
                  paidAmount,
                  transactionDate,
                  meterReadings,
                  demandDate,
                  centralOpNumber,
                  agentOpNumber,
                  terminalId,
                  authMethod,
                  additionalDetails,
                  additionalData,
                  authDeviceId,
                  deviceType,
                  budgetPayment,
                  rewardAmount,
                };
              }),
            },
          },
        });
      return 'successfull';
    } catch (error) {
      await this.loggerService.log('error', error);
      console.error(error);
    }
  }
}
