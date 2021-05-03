import { Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';
import { genRandomString } from 'src/utils/random';
import { CreateLicenceDto } from './dto/create-licence.dto';
import { UpdateLicenceDto } from './dto/update-licence.dto';

@Injectable()
export class LicenceService {
  constructor(private prisma: PrismaService) {}

  async create({ expirationDate, ...createLicenceDto }: CreateLicenceDto) {
    const player = await this.prisma.player.findUnique({
      where: {
        id: createLicenceDto.playerId,
      },
    });

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    const licence = await this.prisma.licence.create({
      data: {
        ...createLicenceDto,
        licenceKey: await this.generateLicence(),
        expirationDate: moment(expirationDate).toDate(),
      },
    });

    return licence;
  }

  async findAll() {
    return this.prisma.licence.findMany();
  }

  async findOne(id: number) {
    const licence = await this.prisma.licence.findUnique({
      where: {
        id: id,
      },
    });

    if (!licence) {
      throw new HttpException('Licence not found', HttpStatus.NOT_FOUND);
    }

    return licence;
  }

  async findOneByKey(licenceKey: string) {
    const licence = await this.prisma.licence.findUnique({
      where: {
        licenceKey: licenceKey,
      },
    });

    if (!licence) {
      return undefined;
    }

    return licence;
  }

  async update(id: number, updateLicenceDto: UpdateLicenceDto) {
    // TODO: Save to logs old state
    return this.prisma.licence.update({
      where: {
        id: id,
      },
      data: {
        ...updateLicenceDto,
      },
    });
  }

  async remove(id: number) {
    // TODO: Save to logs old state
    return await this.prisma.licence.delete({
      where: {
        id: id,
      },
    });
  }

  async generateLicence() {
    while (true) {
      const licence = `${genRandomString()}-${genRandomString()}-${genRandomString()}-${genRandomString()}`;

      const existingLicence = await this.prisma.licence.findUnique({
        where: {
          licenceKey: licence,
        },
      });

      if (existingLicence) {
        continue;
      }

      return licence;
    }
  }
}
