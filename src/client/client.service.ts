import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';
import { promises as fs } from 'fs';

@Injectable()
export class ClientService {
  async getClient(getClientDto: GetClientDto) {
    // TODO: Validate licence
    // TODO: Validate hashes
    // TODO: Handle first time

    const path = `${process.cwd()}/Assets/${getClientDto.checksum}`;

    try {
      await fs.stat(path);
    }
    catch(err) {
      throw new HttpException('Client file for checksum does not exist', HttpStatus.BAD_REQUEST);
    }

    return path;
  }

  async uploadClient(file: Express.Multer.File, uploadClientDto: UploadClientDto) {
    const path = `${process.cwd()}/Assets/${uploadClientDto.checksum}`;
    
    await fs.writeFile(path, file.buffer);
  }

  // TODO: Management later?
  // findAll() {
  //   return `This action returns all client`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} client`;
  // }
}
