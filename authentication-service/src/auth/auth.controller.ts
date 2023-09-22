import { Controller, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-request-dto';
import { LoginDto } from './dto/login-request-dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';

const regex = {
  emailRegex: /^[\w\.\-\_]+@([\w]+\.)+[\w]{2,4}$/,
  passwordRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @MessagePattern('register')
  public async register(registerDto: RegisterDto) {
    const emailValid = regex.emailRegex.test(registerDto.email);
    const passwordValid = regex.passwordRegex.test(registerDto.password);

    if (!emailValid || !passwordValid) {
      throw new RpcException(new HttpException("Please check that your email and password are in the correct format.", HttpStatus.BAD_REQUEST));
    }

    return await this.authService.register(registerDto);
  }

  @MessagePattern('login')
  public async login(loginDto: LoginDto) {
    const emailValid = regex.emailRegex.test(loginDto.email);
    const passwordValid = regex.passwordRegex.test(loginDto.password);

    if (!emailValid || !passwordValid) {
      throw new RpcException(new HttpException("Please check that your email and password are in the correct format.", HttpStatus.BAD_REQUEST));
    }
    
    return await this.authService.login(loginDto);
  }
}
