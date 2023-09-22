import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardDto } from './create-flashcard.dto';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for updating a flashcard.
 * Extends the CreateFlashcardDto class and adds an 'id' property.
 * @class UpdateFlashcardDto
 * @extends {PartialType(CreateFlashcardDto)}
 */
export class UpdateFlashcardDto extends PartialType(CreateFlashcardDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
