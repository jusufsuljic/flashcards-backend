import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { CustomRpcExceptionFilter } from './exceptions/CustomRpcExceptionFilter';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FlashcardsModule, {
    transport: Transport.TCP,
    options: {
      port: 4200,
    }
  });
  
  app.useGlobalFilters(new CustomRpcExceptionFilter())
  app.listen();
  logger.log("FLASHCARDS MICROSERVICE LISTENING...")
}

bootstrap();
