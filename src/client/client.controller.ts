import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v3/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async getClient(@Body() getClientDto: GetClientDto, @Res() res: Response) {
    const path = await this.clientService.getClient(getClientDto);

    res.status(HttpStatus.OK).sendFile(path, (err) => {
      if (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  @Patch()
  @UseGuards(AuthGuard('basic'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadClient(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadClientDto: UploadClientDto
  ) {
    if (!file) {
      throw new HttpException(
        'Client file was not provided',
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.clientService.uploadClient(file, uploadClientDto);
  }

  @Get()
  @UseGuards(AuthGuard('basic'))
  async getClients() {
    return await this.clientService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('basic'))
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
