import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const application: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
  });
  return application.listenAsync();
}
bootstrap();
