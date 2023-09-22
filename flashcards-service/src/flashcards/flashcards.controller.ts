import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { Flashcard } from './schema/flashcard.schema';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) { }

  @MessagePattern('create_flashcard')
  async create(@Payload() createFlashcardParams: CreateFlashcardDto): Promise<Flashcard> {
    if (!createFlashcardParams.title) {
      throw new RpcException(new HttpException("Please provide a title for the flaschard.", HttpStatus.BAD_REQUEST));
    }
    return await this.flashcardsService.create(createFlashcardParams);
  }

  @MessagePattern('get_by_id')
  async findOne(@Payload() id: string): Promise<Flashcard> {
    return await this.flashcardsService.findOne(id);
  }

  @MessagePattern('get_share_url')
  async getShareUrl(userId: string): Promise<string> {
    return await this.flashcardsService.getShareUrl(userId);
  }

  @MessagePattern("get_shared_flashcards")
  async getSharedFlashcards(shareToken: string): Promise<Array<Flashcard>> {
    return await this.flashcardsService.getUserFlashcards(shareToken);
  }

  @MessagePattern('update_flashcard')
  async update(@Payload() updateFlashcardDto: UpdateFlashcardDto) {
    if (!updateFlashcardDto.title) {
      throw new RpcException(new HttpException("Title of the flashcard cannot be empty.", HttpStatus.BAD_REQUEST));
    }
    return await this.flashcardsService.update(updateFlashcardDto);
  }

  @MessagePattern('remove_flashcard')
  async remove(@Payload() id: string) {
    return await this.flashcardsService.remove(id);
  }
}
