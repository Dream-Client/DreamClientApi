import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v3/players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    const player = await this.playerService.create(createPlayerDto);
    return { id: player.id };
  }

  @Get()
  @UseGuards(AuthGuard('basic'))
  async findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('basic'))
  async findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('basic'))
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto
  ) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('basic'))
  async remove(@Param('id') id: string) {
    await this.playerService.remove(+id);
    return;
  }
}
