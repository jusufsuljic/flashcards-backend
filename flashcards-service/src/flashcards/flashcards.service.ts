import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard } from './schema/flashcard.schema';
import { Model, Types } from 'mongoose';
import * as CryptoJS from 'crypto-js'
import { RpcException } from '@nestjs/microservices';

/**
 * Service class for managing flashcards.
 * @class FlashcardsService
 * @constructor
 * @param {Model<Flashcard>} flashcardModel - The flashcard model injected from the database.
 */
@Injectable()
export class FlashcardsService {

  constructor(
    @InjectModel(Flashcard.name) private flashcardModel: Model<Flashcard>
  ) { }

  /**
   * Creates a new flashcard with the given parameters.
   * @param {CreateFlashcardDto} flashcardParams - The parameters for creating the flashcard.
   * @returns {Promise<Flashcard>} - A promise that resolves to the created flashcard.
   * @throws {RpcException} - If there is an error while creating the flashcard.
   */
  async create(flashcardParams: CreateFlashcardDto): Promise<Flashcard> {
    try {
      const createdFlashcard = new this.flashcardModel(flashcardParams);
      return await createdFlashcard.save();
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while creating a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Updates a flashcard with the provided data.
   * @param {UpdateFlashcardDto} updateFlashcardDto - The data to update the flashcard with.
   * @returns {Promise<Flashcard>} - The updated flashcard.
   * @throws {RpcException} - If an error occurs while updating the flashcard.
   */
  async update(updateFlashcardDto: UpdateFlashcardDto): Promise<Flashcard> {
    try {
      return await this.flashcardModel.findOneAndUpdate({ _id: new Types.ObjectId(updateFlashcardDto.id) }, updateFlashcardDto, { new: true });
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while updating a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Finds a flashcard by its ID.
   * @param {string} id - The ID of the flashcard to find.
   * @returns {Promise<Flashcard>} - A promise that resolves to the found flashcard.
   * @throws {RpcException} - If an error occurs while fetching the flashcard.
   */
  async findOne(id: string): Promise<Flashcard> {
    try {
      return await this.flashcardModel.findById(new Types.ObjectId(id));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetcing a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Retrieves the flashcards associated with a user using a share token.
   * @param {string} shareToken - The share token used to identify the user.
   * @returns {Promise<Array<Flashcard>>} - A promise that resolves to an array of flashcards.
   * @throws {RpcException} - If there is an error while fetching the shared flashcards.
   */
  async getUserFlashcards(shareToken): Promise<Array<Flashcard>> {
    try {
      const userId = await this.decryptUserId(shareToken.trim());
      return await this.flashcardModel.find().where('userId').equals(new Types.ObjectId(userId));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while fetcing shared flashcards.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Removes a flashcard with the specified ID from the database.
   * @param {string} id - The ID of the flashcard to remove.
   * @returns {Promise<Flashcard | null>} - A promise that resolves to the removed flashcard, or null if no flashcard was found with the specified ID.
   * @throws {RpcException} - If an error occurs while removing the flashcard, a RpcException is thrown with an HttpException containing an error message.
   */
  async remove(id: string) {
    try {
      return await this.flashcardModel.findByIdAndDelete(new Types.ObjectId(id));
    } catch (e) {
      throw new RpcException(new HttpException("Something went wrong while removing a flashcard.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Generates a share URL for the given user ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<string>} - A promise that resolves to the share URL.
   * @throws {RpcException} - If an error occurs while generating the share URL.
   */
  async getShareUrl(userId: string): Promise<string> {
    try {
      const shareToken = await this.encryptUserId(userId);
      return `http://localhost:${process.env.GATEWAY_PORT}/flashcards/shared?sharetoken=${shareToken}`;
    }
    catch (e) {
      throw new RpcException(new HttpException("Something went wrong while generating a share url.", HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * Encrypts the given user ID using AES encryption with the secret key.
   * @param {string} userId - The user ID to encrypt.
   * @returns {Promise<string>} - A promise that resolves to the encrypted user ID.
   */
  private async encryptUserId(userId: string): Promise<string> {
    const encrypted = await CryptoJS.AES.encrypt(userId, process.env.SECRET_KEY);
    const urlEncodedString = encodeURIComponent(encrypted);
    return urlEncodedString.toString();
  }

  /**
   * Decrypts an encrypted user ID using AES encryption.
   * @param {string} encryptedUserId - The encrypted user ID to decrypt.
   * @returns {Promise<string>} - A promise that resolves to the decrypted user ID.
   */
  private async decryptUserId(encryptedUserId: string): Promise<string> {
    const decrypted = await CryptoJS.AES.decrypt(encryptedUserId, process.env.SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
