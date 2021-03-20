import { Injectable } from '@nestjs/common';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';

@Injectable()
export class ClientService {
  async getClient(getClientDto: GetClientDto) {
    // TODO: Validate licence
    // TODO: Validate hashes
    // TODO: return binary stream
    return '';
  }

  async uploadClient(UploadClientDto: UploadClientDto) {
    return '';
  }

  // TODO: Management later
  // findAll() {
  //   return `This action returns all client`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} client`;
  // }
}
