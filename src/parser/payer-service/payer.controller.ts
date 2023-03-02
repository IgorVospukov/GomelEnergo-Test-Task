import { Controller, Post } from '@nestjs/common';
import { PayerService } from './payer.service';

@Controller('payers')
export class PayerController {
  constructor(private payerService: PayerService) {}
  @Post('post')
  async createPayers(): Promise<string> {
    try {
      await this.payerService.processPaymentsData();
      return 'succsessful';
    } catch (error) {
      console.error(error);
    }
  }
}
