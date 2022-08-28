import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { PrismaService } from './modules/prisma/prisma.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors : true});
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());
  app.listen(3001);
}
bootstrap();
