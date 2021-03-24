import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {
  Player
} from '@prisma/client';
@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) { }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.create({data: createPlayerDto});
  }

  async findAll(): Promise<Player[]> {
    return this.prisma.player.findMany();
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: {
        id: id
      }
    });

    if(!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    return player;
  }

  async findByEmail(email: string): Promise<Player> {
    return this.prisma.player.findUnique({
      where: {
        email: email
      }
    });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    // TODO: Save to logs old state
    return this.prisma.player.update({
      where: {
        id: id,
      },
      data: {
        ...updatePlayerDto
      }
    });
  }

  remove(id: number) {
    // TODO: Save to logs old state
    return this.prisma.player.delete({
      where: {
        id: id,
      }
    });
  }
}
