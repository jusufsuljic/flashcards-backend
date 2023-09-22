import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Data transfer object for creating a new user.
 */
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    passwordHash: string;
}
