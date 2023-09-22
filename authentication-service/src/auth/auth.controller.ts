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

  /**
   * Registers a new user with the provided registration data.
   * @param {RegisterDto} registerDto - The registration data object containing email and password.
   * @throws {RpcException} - If the email or password is not in the correct format.
   * @returns {Promise<void>} - A promise that resolves when the registration is successful.
   */
  @MessagePattern('register')
  public async register(registerDto: RegisterDto) {
    const emailValid = regex.emailRegex.test(registerDto.email);
    const passwordValid = regex.passwordRegex.test(registerDto.password);

    if (!emailValid || !passwordValid) {
      throw new RpcException(new HttpException("Please check that your email and password are in the correct format.", HttpStatus.BAD_REQUEST));
    }

    return await this.authService.register(registerDto);
  }

  /**
   * Handles the 'login' message pattern and attempts to log in the user.
   * @param {LoginDto} loginDto - The login data transfer object containing the email and password.
   * @throws {RpcException} - If the email or password is not in the correct format, a RpcException is thrown.
   * @returns {Promise<any>} - A promise that resolves to the result of the login operation.
   */
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
