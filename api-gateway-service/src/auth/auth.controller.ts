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

    /**
     * Registers a new user by sending a "register" message to the authentication service.
     * @param {RegisterDto} registerDto - The data transfer object containing the user's registration information.
     * @returns A promise that resolves to the result of the registration process.
     */
    @Post('register')
    public async register(@Body() registerDto: RegisterDto) {
        return await firstValueFrom(this.authService.send("register", registerDto));
    }

    /**
     * Handles the login request by sending the loginDto to the authService.
     * @param {LoginDto} loginDto - The login data transfer object containing the user's credentials.
     * @returns A promise that resolves to the result of the login request.
     */
    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return await firstValueFrom(this.authService.send("login", loginDto));
    }
}
