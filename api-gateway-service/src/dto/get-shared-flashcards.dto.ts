import { IsNotEmpty, IsString } from "class-validator";

export class GetSharedFlashcardsDto{
    @IsString()
    @IsNotEmpty()
    sharetoken: string;
}