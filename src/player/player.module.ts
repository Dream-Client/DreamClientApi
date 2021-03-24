import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsPlayerAlreadyExist, IsPlayerAlreadyExistConstraint } from 'src/decorators/IsPlayerAlreadyExist.decorator';

@Module({
  controllers: [PlayerController],
  providers: [
    IsPlayerAlreadyExistConstraint,
    PlayerService,
    PrismaService
  ],
})
export class PlayerModule {}
