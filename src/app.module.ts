import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { PlayerModule } from './player/player.module';
import { LicenceModule } from './licence/licence.module';
import { ConfigModule } from '@nestjs/config';
import { FrontendModule } from './frontend/frontend.module';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientModule,
    PlayerModule,
    LicenceModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    FrontendModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
