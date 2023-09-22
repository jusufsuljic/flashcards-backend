import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Represents the data transfer object (DTO) for registering a user.
 */
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}