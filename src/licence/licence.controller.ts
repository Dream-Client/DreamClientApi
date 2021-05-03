import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LicenceService } from './licence.service';
import { CreateLicenceDto } from './dto/create-licence.dto';
import { UpdateLicenceDto } from './dto/update-licence.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v3/licences')
export class LicenceController {
  constructor(private readonly licenceService: LicenceService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  create(@Body() createLicenceDto: CreateLicenceDto) {
    return this.licenceService.create(createLicenceDto);
  }

  @Get()
  @UseGuards(AuthGuard('basic'))
  findAll() {
    return this.licenceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('basic'))
  findOne(@Param('id') id: string) {
    return this.licenceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('basic'))
  update(@Param('id') id: string, @Body() updateLicenceDto: UpdateLicenceDto) {
    return this.licenceService.update(+id, updateLicenceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('basic'))
  remove(@Param('id') id: string) {
    return this.licenceService.remove(+id);
  }

  @Put('generate')
  @UseGuards(AuthGuard('basic'))
  async generateLicence() {
    return await this.licenceService.generateLicence();
  }
}
