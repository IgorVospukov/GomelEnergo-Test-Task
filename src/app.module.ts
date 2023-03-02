import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserService } from './parser/parser-service/parser.service';
import { PayerController } from './parser/payer-service/payer.controller';
import { PayerModule } from './parser/payer-service/payer.module';
import { PayerService } from './parser/payer-service/payer.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerService } from './parser/logger-service/logger.service';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot(), PayerModule],
  controllers: [AppController, PayerController],
  providers: [
    AppService,
    PayerService,
    ParserService,
    LoggerService,
    PrismaService,
  ],
})
export class AppModule {}
