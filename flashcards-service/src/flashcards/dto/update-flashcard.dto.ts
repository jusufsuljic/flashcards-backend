import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardDto } from './create-flashcard.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFlashcardDto extends PartialType(CreateFlashcardDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
