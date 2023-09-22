import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

/**
 * Service class for managing users.
 * @class UsersService
 * @constructor
 * @param {Model<User>} userModel - The user model injected from the database.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  /**
   * Creates a new user with the provided user parameters.
   * @param {CreateUserDto} userParams - The user parameters to create the user with.
   * @returns {Promise<User>} A promise that resolves to the created user.
   * @throws {RpcException} If an error occurs while creating the user.
   */
  async create(userParams: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(userParams);
      return createdUser.save();
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while creating a new user", HttpStatus.INTERNAL_SERVER_ERROR))
    }

  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<User>} - A promise that resolves to the found user.
   * @throws {RpcException} - If an error occurs while fetching the user.
   */
  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(new Types.ObjectId(id));
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetching a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Finds a user by their email address.
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<User>} - A promise that resolves to the found user object.
   * @throws {RpcException} - If there is an error while fetching the user.
   */
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email: email });
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetching a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Removes a user from the database based on their ID.
   * @param {string} id - The ID of the user to remove.
   * @returns {Promise<User | null>} - A promise that resolves to the removed user object, or null if the user was not found.
   * @throws {RpcException} - If an error occurs while removing the user, a RpcException is thrown with an HttpException containing an error message.
   */
  async remove(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(new Types.ObjectId(id));
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while removing a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}
