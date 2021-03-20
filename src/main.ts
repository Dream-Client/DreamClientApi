import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ActivityLogs } from './middlewares/activitylogs.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(ActivityLogs);
  await app.listen(3000);
}
bootstrap();
