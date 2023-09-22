import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomRpcExceptionFilter } from './exceptions/CustomRpcExceptionFilter';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      port: 8888,
    }
  });
  app.useGlobalFilters(new CustomRpcExceptionFilter())
  app.listen();
  logger.log("AUTH MICROSERVICE LISTENING...")
}

bootstrap();
