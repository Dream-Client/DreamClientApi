import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Get client
  @Post()
  getClient(@Body() getClientDto: GetClientDto) {
    return this.clientService.getClient(getClientDto);
  }

  // Upload client
  // TODO: Auth
  @Patch()
  uploadClient(@Body() uploadClientDto: UploadClientDto) {
    return this.clientService.uploadClient(uploadClientDto);
  }
}
