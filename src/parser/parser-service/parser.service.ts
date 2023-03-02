import { Injectable } from '@nestjs/common';
import { MessageHeader, Payer } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

@Injectable()
export class ParserService {
  async parseText(input: string) {
    const [head, ...payements] = input.trim().split('\n');
    const dataHead = head
      .trim()
      .split('^')
      .map((value) => value.replace(/[\r\n]/g, ''));

    const dataPayments = payements
      .map((value) => value.replace(/[\r\n]/g, ''))
      .map((item) => {
        const arr = item.split('^');
        return arr.map((item) => item.split('~'));
      });

    const header = await this.createHeader(dataHead);
    const payments = await this.createPayments(dataPayments);

    return { header, payments };
  }
  async createHeader(array: Array<string>): Promise<MessageHeader> {
    try {
      const header = {} as MessageHeader;
      header.messageVersion = +array[0];
      header.senderCode = +array[1];
      header.messageNumber = +array[2];
      header.dateOfCreation = new Date(+array[3]);
      header.numberOfRecords = +array[4];
      header.settlementAgentUNUR = +array[5];
      header.serviceProviderAccount = +array[6];
      header.serviceProviderBankUNUR = +array[7];
      header.serviceProviderAccNumber = array[8];
      header.paymentDocumentNumber = +array[9];
      header.dateOfFundsTransfer = new Date(+array[10]);
      header.currencyCode = +array[11];
      header.totalAmountOfOperations = array[12];
      header.totalAmountOfPenalty = array[13];
      header.transferredAmount = array[14];
      header.elementAgentBankUNUR = +array[15];
      header.elementAgentAccNumber = array[16];
      header.budgetPaymentCode = array[17];
      header.totalPaymentToBudget = array[18];
      header.withheldRemuneration = array[19];
      return header;
    } catch (error) {
      console.error(`do not create a header, ${error}`);
    }
  }
  async createPayments(array: any) {
    try {
      return array.map((item) => {
        const payer = {} as Payer;
        payer.recordNumber = +item[0][0];
        payer.serviceNumber = item[1][0];
        payer.accountNumber = item[2][0];
        payer.consumerName = item[3][0];
        payer.consumerAddress = item[4][0];
        payer.paymentPeriod = new Date(+item[5]);
        payer.totalPaymentAmount = +item[6][0];
        payer.penaltyAmount = +item[7][0];
        payer.paidAmount = +item[8][0];
        payer.transactionDate = new Date(+item[9]);
        payer.meterReadings = item[10].toString();
        payer.demandDate = new Date(+item[11]);
        payer.centralOpNumber = new Decimal(item[12][0]);
        payer.agentOpNumber = new Decimal(item[13][0]);
        payer.terminalId = item[14][0];
        payer.authMethod = item[15][0];
        payer.additionalDetails = item[16].toString();
        payer.additionalData = item[17].toString();
        payer.authDeviceId = item[18][0];
        payer.deviceType = +item[19][0];
        payer.budgetPayment = item[20];
        payer.rewardAmount = item[21];
        return payer;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
