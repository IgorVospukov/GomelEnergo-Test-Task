import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { LoggerService } from '../logger-service/logger.service';
import { ParserService } from '../parser-service/parser.service';
import { PayerController } from './payer.controller';
import { PayerService } from './payer.service';

@Module({
  controllers: [PayerController],
  providers: [PayerService, ParserService, LoggerService, PrismaService],
})
export class PayerModule {}
