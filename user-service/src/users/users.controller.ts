import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('create_user')
  create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('get_user_by_id')
  findOne(@Payload() id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @MessagePattern('get_user_by_email')
  findByEmail(@Payload() email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern('remove_user')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
