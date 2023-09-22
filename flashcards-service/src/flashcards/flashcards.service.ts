import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard } from './schema/flashcard.schema';
import { Model, Types } from 'mongoose';
import * as CryptoJS from 'crypto-js'
import { SECRET_KEY } from 'src/constants';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FlashcardsService {

  constructor(
    @InjectModel(Flashcard.name) private flashcardModel: Model<Flashcard>
  ) { }

  async create(flashcardParams: CreateFlashcardDto): Promise<Flashcard> {
    try {
      const createdFlashcard = new this.flashcardModel(flashcardParams);
      return await createdFlashcard.save();
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while creating a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async update(updateFlashcardDto: UpdateFlashcardDto) {
    try {
      return await this.flashcardModel.findOneAndUpdate({ _id: new Types.ObjectId(updateFlashcardDto.id) }, updateFlashcardDto);
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while updating a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async findOne(id: string): Promise<Flashcard> {
    try {
      return await this.flashcardModel.findById(new Types.ObjectId(id));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetcing a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async getUserFlashcards(shareToken): Promise<Array<Flashcard>> {
    try {
      const userId = await this.decryptUserId(shareToken.trim());
      return await this.flashcardModel.find().where('userId').equals(new Types.ObjectId(userId));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetcing shared flashcards.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async remove(id: string) {
    try {
      return await this.flashcardModel.findByIdAndDelete(new Types.ObjectId(id));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while removing a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async getShareUrl(userId: string): Promise<string> {
    try {
      const shareToken = await this.encryptUserId(userId);
      return `http://localhost:8000/flashcards/shared?sharetoken=${shareToken}`;
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while generating a share url.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  private async encryptUserId(userId: string): Promise<string> {
    const encrypted = await CryptoJS.AES.encrypt(userId, SECRET_KEY);
    const urlEncodedString = encodeURIComponent(encrypted);
    return urlEncodedString.toString();
  }

  private async decryptUserId(encryptedUserId: string): Promise<string> {
    const decrypted = await CryptoJS.AES.decrypt(encryptedUserId, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
