import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomRpcExceptionFilter } from './exceptions/CustomRpcExceptionFilter';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    }
  });

  app.useGlobalFilters(new CustomRpcExceptionFilter())
  app.listen();
  logger.log("USERS MICROSERVICE LISTENING...")
}

bootstrap();
