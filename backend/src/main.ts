import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors : true});
  app.use(cors())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001 , ()=>{
    console.log('server runing on port ' + 3001)
  });
}
bootstrap();
