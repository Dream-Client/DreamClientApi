import { Module } from '@nestjs/common';
import { LicenceService } from './licence.service';
import { LicenceController } from './licence.controller';

@Module({
  controllers: [LicenceController],
  providers: [LicenceService]
})
export class LicenceModule {}
