import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Handles the 'create_user' message pattern and creates a new user.
   * @param {CreateUserDto} createUserDto - The data transfer object containing the user information.
   * @returns {Promise<User>} - A promise that resolves to the created user.
   */
  @MessagePattern('create_user')
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} - A promise that resolves to the user object.
   */
  @MessagePattern('get_user_by_id')
  async findOne(@Payload() id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  /**
   * Handles the 'get_user_by_email' message pattern and retrieves a user by their email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<User>} - A promise that resolves to the user object.
   */
  @MessagePattern('get_user_by_email')
  async findByEmail(@Payload() email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  /**
   * Removes a user from the system.
   * @param {string} id - The ID of the user to remove.
   * @returns {Promise<void>} - A promise that resolves when the user is successfully removed.
   */
  @MessagePattern('remove_user')
  async remove(@Payload() id: string) {
    return await this.usersService.remove(id);
  }
}
