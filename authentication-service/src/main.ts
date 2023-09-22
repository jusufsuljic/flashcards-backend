import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomRpcExceptionFilter } from './exceptions/CustomRpcExceptionFilter';
import { SERVICE_PORT } from './constants';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      port: SERVICE_PORT,
    }
  });
  app.useGlobalFilters(new CustomRpcExceptionFilter())
  app.listen();
  logger.log(`AUTH MICROSERVICE LISTENING ON PORT ${SERVICE_PORT}`)
}

bootstrap();
