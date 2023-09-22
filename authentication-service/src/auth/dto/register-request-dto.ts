/**
 * Represents the data transfer object (DTO) for registering a user.
 */
export class RegisterDto {
    email: string;
    password: string;
    passwordHash: string;
}