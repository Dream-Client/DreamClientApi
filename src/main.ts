import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as express from 'express';
import { AppModule } from './app.module';
import { ActivityLogs } from './middlewares/activitylogs.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(ActivityLogs);
  app.use(express.static(`${process.cwd()}/Assets`));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  await app.listen(configService.get('express.port'));
}
bootstrap();
