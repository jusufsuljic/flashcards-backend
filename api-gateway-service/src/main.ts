import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './exceptions/HttpExceptionFilter';
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  const test = process.env.GATEWAY_PORT
  console.log(test);
  
  await app.listen(process.env.GATEWAY_PORT, () => logger.log("Gateway up and listening on port "));
}

bootstrap();
