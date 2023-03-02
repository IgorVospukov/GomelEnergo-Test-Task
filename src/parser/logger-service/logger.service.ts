import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggerService {
  private readonly logFileName = 'log-file.txt';

  async log(message: string, context?: string) {
    const timeStamp = new Date().toISOString();
    const logMassage = `[${timeStamp}; Info: ${context}: ${message}],`;
    fs.appendFileSync(this.logFileName, logMassage);
  }
}
