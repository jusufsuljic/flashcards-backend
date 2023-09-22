import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-request-dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login-request-dto';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(@Inject("USERS") private readonly usersService: ClientProxy,
        private readonly jwtService: JwtService) { }

    public async register(registerDto: RegisterDto) {
        registerDto.passwordHash = await bcrypt.hash(registerDto.password, saltOrRounds);
        return await firstValueFrom(this.usersService.send("create_user", registerDto));
    }

    public async login(loginDto: LoginDto) {
        const userFromDb = await firstValueFrom(this.usersService.send("get_user_by_email", loginDto.email));

        if (userFromDb) {
            const isMatch = await bcrypt.compare(loginDto.password, userFromDb.passwordHash);
            if (!isMatch) {
                throw new RpcException(new HttpException('Bad credentials', HttpStatus.BAD_REQUEST));
            }
            const payload = { sub: userFromDb._id, useremail: userFromDb.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new RpcException(new HttpException("User with provided email does not exist.", HttpStatus.NOT_FOUND))
        }
    }
}
