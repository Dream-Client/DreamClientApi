import { Module } from '@nestjs/common';
import { LicenceService } from './licence.service';
import { LicenceController } from './licence.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LicenceController],
  providers: [LicenceService, PrismaService]
})
export class LicenceModule {}
