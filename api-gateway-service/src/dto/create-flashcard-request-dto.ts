import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data transfer object (DTO) for creating a flashcard.
 */
export class CreateFlashcardRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}