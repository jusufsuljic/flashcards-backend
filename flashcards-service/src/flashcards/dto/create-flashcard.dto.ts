import { IsString, IsInt, IsNotEmpty } from 'class-validator';

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
