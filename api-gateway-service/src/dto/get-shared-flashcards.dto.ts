import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data transfer object (DTO) for retrieving shared flashcards.
 */
export class GetSharedFlashcardsDto{
    @IsString()
    @IsNotEmpty()
    sharetoken: string;
}