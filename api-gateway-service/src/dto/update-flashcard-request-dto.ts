import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardRequestDto } from './create-flashcard-request-dto';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Represents the data transfer object for updating a flashcard.
 * Inherits from the `CreateFlashcardRequestDto` class and extends it with an `id` property.
 */
export class UpdateFlashcardRequestDto extends PartialType(CreateFlashcardRequestDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
