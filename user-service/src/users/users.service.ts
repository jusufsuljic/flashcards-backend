import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async create(userParams: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(userParams);
      return createdUser.save();
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while creating a new user", HttpStatus.INTERNAL_SERVER_ERROR))
    }

  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(new Types.ObjectId(id));
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetching a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email: email });
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetching a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(new Types.ObjectId(id));
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while removing a user.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}
