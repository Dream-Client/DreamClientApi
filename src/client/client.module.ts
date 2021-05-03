import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { LicenceService } from 'src/licence/licence.service';
import { LicenceModule } from 'src/licence/licence.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LicenceModule, ConfigModule],
  controllers: [ClientController],
  providers: [ClientService, LicenceService, PrismaService],
})
export class ClientModule {}
