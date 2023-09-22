import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from 'src/dto/login-request-dto';
import { RegisterDto } from 'src/dto/register-request-dto';

@Controller()
export class AuthController {
    constructor(
        @Inject('AUTHENTICATION') private authService: ClientProxy) {
    }

    @Post('register')
    public async register(@Body() registerDto: RegisterDto) {
        return await firstValueFrom(this.authService.send("register", registerDto));
    }

    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return await firstValueFrom(this.authService.send("login", loginDto));
    }
}
