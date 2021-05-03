import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { UploadClientDto } from './dto/upload-client.dto';
import { GetClientDto } from './dto/get-client.dto';
import { promises as fs } from 'fs';
import { LicenceService } from 'src/licence/licence.service';
import { LICENCE_STATUS } from 'src/constants';
import { UpdateLicenceDto } from 'src/licence/dto/update-licence.dto';
import { createReadStream } from 'node:fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
  constructor(
    private licenceService: LicenceService,
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async getClient(getClientDto: GetClientDto) {
    await this.validateLicence(getClientDto);

    const path = `${this.configService.get<string>('CLIENT_UPLOAD_DIR')}/${
      getClientDto.checksum
    }`;

    try {
      await fs.stat(path);
    } catch (err) {
      throw new HttpException(
        'Client file for checksum does not exist',
        HttpStatus.BAD_REQUEST
      );
    }

    return path;
  }

  async validateLicence(getClientDto: GetClientDto) {
    const licence = await this.licenceService.findOneByKey(
      getClientDto.licenceKey
    );

    if (!licence) {
      throw new HttpException('Licence not found', HttpStatus.UNAUTHORIZED);
    }

    if (licence.status == LICENCE_STATUS.DISABLED) {
      throw new HttpException('Licence is disabled', HttpStatus.UNAUTHORIZED);
    }

    const now = new Date();
    if (licence.expirationDate < now) {
      throw new HttpException('Licence expired', HttpStatus.UNAUTHORIZED);
    }

    const hashes = JSON.parse(licence.hashes);
    let matches = 0;

    if (licence.status == LICENCE_STATUS.NEW) {
      matches = -1;
    } else if (licence.status == LICENCE_STATUS.ACTIVE) {
      for (const hash of getClientDto.hashes) {
        if (!hashes.includes(hash)) {
          continue;
        }
        matches++;
      }

      if (Math.abs(matches - hashes.length) > 2) {
        throw new HttpException(
          'Machine not recognized',
          HttpStatus.UNAUTHORIZED
        );
      }
    }

    if (matches !== hashes.length) {
      const updateObj: UpdateLicenceDto = {
        hashes: JSON.stringify(getClientDto.hashes),
        status: LICENCE_STATUS.ACTIVE,
      };
      this.licenceService.update(licence.id, updateObj);
    }
  }

  async uploadClient(
    file: Express.Multer.File,
    uploadClientDto: UploadClientDto
  ) {
    await this.prisma.client.create({
      data: {
        checksum: uploadClientDto.checksum,
        vrcVersion: uploadClientDto.vrcVersion,
      },
    });

    const path = `${this.configService.get<string>('CLIENT_UPLOAD_DIR')}/${
      uploadClientDto.checksum
    }`;

    await fs.writeFile(path, file.buffer);
  }

  // TODO: Management later?
  async findAll() {
    return await this.prisma.client.findMany();
  }

  async remove(id: number) {
    return await this.prisma.client.delete({
      where: {
        id: id,
      },
    });
  }
}
