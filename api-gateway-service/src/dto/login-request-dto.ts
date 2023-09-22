import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Represents a data transfer object (DTO) for the login operation.
 */
export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}