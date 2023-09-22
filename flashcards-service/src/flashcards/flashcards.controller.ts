import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { Flashcard } from './schema/flashcard.schema';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) { }

  /**
   * Creates a flashcard using the provided parameters.
   * @param {CreateFlashcardDto} createFlashcardParams - The parameters for creating the flashcard.
   * @returns {Promise<Flashcard>} - A promise that resolves to the created flashcard.
   * @throws {RpcException} - If the title is not provided, a RpcException is thrown with a HttpException containing a BAD_REQUEST status.
   */
  @MessagePattern('create_flashcard')
  async create(@Payload() createFlashcardParams: CreateFlashcardDto): Promise<Flashcard> {
    if (!createFlashcardParams.title) {
      throw new RpcException(new HttpException("Please provide a title for the flaschard.", HttpStatus.BAD_REQUEST));
    }
    return await this.flashcardsService.create(createFlashcardParams);
  }

  /**
   * Retrieves a flashcard by its ID.
   * @param {string} id - The ID of the flashcard to retrieve.
   * @returns {Promise<Flashcard>} - A promise that resolves to the flashcard object.
   */
  @MessagePattern('get_by_id')
  async findOne(@Payload() id: string): Promise<Flashcard> {
    return await this.flashcardsService.findOne(id);
  }

  /**
   * Retrieves the share URL for a given user ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<string>} - A promise that resolves to the share URL.
   */
  @MessagePattern('get_share_url')
  async getShareUrl(userId: string): Promise<string> {
    return await this.flashcardsService.getShareUrl(userId);
  }

  /**
   * Retrieves shared flashcards based on the provided share token.
   * @param {string} shareToken - The share token used to identify the shared flashcards.
   * @returns {Promise<Array<Flashcard>>} - A promise that resolves to an array of shared flashcards.
   */
  @MessagePattern("get_shared_flashcards")
  async getSharedFlashcards(shareToken: string): Promise<Array<Flashcard>> {
    return await this.flashcardsService.getUserFlashcards(shareToken);
  }

  /**
   * Handles the 'update_flashcard' message pattern and updates a flashcard.
   * @param {UpdateFlashcardDto} updateFlashcardDto - The DTO containing the updated flashcard data.
   * @returns {Promise<any>} - A promise that resolves to the updated flashcard.
   * @throws {RpcException} - If the title of the flashcard is empty, a RpcException is thrown with a HttpException.
   */
  @MessagePattern('update_flashcard')
  async update(@Payload() updateFlashcardDto: UpdateFlashcardDto) {
    if (!updateFlashcardDto.title) {
      throw new RpcException(new HttpException("Title of the flashcard cannot be empty.", HttpStatus.BAD_REQUEST));
    }
    return await this.flashcardsService.update(updateFlashcardDto);
  }

  /**
   * Removes a flashcard with the given ID.
   * @param {string} id - The ID of the flashcard to remove.
   * @returns {Promise<void>} - A promise that resolves when the flashcard is successfully removed.
   */
  @MessagePattern('remove_flashcard')
  async remove(@Payload() id: string) {
    return await this.flashcardsService.remove(id);
  }
}
