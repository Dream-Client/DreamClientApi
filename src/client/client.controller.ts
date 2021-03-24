import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {Response} from 'express'

@Controller('api/v3/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Get client
  @Post()
  async getClient(@Body() getClientDto: GetClientDto, @Res() res: Response) {
    const path = await this.clientService.getClient(getClientDto);

    res.status(HttpStatus.OK).sendFile(path, (err) => {
      if (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  // Upload client
  // TODO: Auth
  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async uploadClient(@UploadedFile() file: Express.Multer.File, @Body() uploadClientDto: UploadClientDto) {
    if(!file) {
      throw new HttpException('Client file was not provided', HttpStatus.BAD_REQUEST);
    }

    return await this.clientService.uploadClient(file, uploadClientDto);
  }
}
