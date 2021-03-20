import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException( 'KEK', HttpStatus.BAD_REQUEST);
    return 'Hello World!';
  }
}
