import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlashcardsController } from './flashcards/flashcards.controller';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    ClientsModule.register([
      {
        name: 'FLASHCARDS',
        transport: Transport.TCP,
        options: {
          port: 4200
        }
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          port: 8888
        }
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FlashcardsController, AuthController],
  providers: [AuthGuard],
})
export class AppModule { }
