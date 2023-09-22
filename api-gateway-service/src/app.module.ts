import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlashcardsController } from './flashcards/flashcards.controller';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Module({
  imports: [
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
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h'}
    })
  ],
  controllers: [FlashcardsController, AuthController],
  providers: [AuthGuard],
})
export class AppModule { }
