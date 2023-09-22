import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for creating a flashcard.
 */
export class CreateFlashcardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}
