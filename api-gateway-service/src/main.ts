import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './exceptions/HttpExceptionFilter';
import { ConfigService } from '@nestjs/config';
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  const configService = app.get(ConfigService);
  const gatewayPort = configService.get<number>('gateway_port');
  await app.listen(gatewayPort, () => logger.log(`Gateway up and listening on port ${gatewayPort}`));
}

bootstrap();
