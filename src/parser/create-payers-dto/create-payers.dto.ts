import { ReadStream } from 'fs';
export class CreatePayersDto {
  createReadStream: () => ReadStream;
}
