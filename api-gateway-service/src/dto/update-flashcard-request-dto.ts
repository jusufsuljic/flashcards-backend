import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardRequestDto } from './create-flashcard-request-dto';
import { IsString } from 'class-validator';

export class UpdateFlashcardRequestDto extends PartialType(CreateFlashcardRequestDto) {
  @IsString()
  id: string;
}
