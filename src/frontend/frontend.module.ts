import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FrontendController } from './frontend.controller';
import { FrontendMiddleware } from './frontend.middleware';
import { FrontendService } from './frontend.service';

@Module({
  imports: [ConfigModule],
  controllers: [FrontendController],
  providers: [FrontendService],
})
export class FrontendModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendMiddleware).forRoutes(FrontendController);
  }
}
