import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { ActivityLogs } from './middlewares/activitylogs.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(ActivityLogs);
  app.use(express.static(`${process.cwd()}/Assets`));
  await app.listen(3000);
}
bootstrap();
