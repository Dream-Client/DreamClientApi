import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { PlayerModule } from './player/player.module';
import { LicenceModule } from './licence/licence.module';

@Module({
  imports: [ClientModule, PlayerModule, LicenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
