import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Represents a user document that has been hydrated with user data.
 * @type {HydratedDocument<User>}
 */
export type UserDocument = HydratedDocument<User>;

/**
 * Represents a user in the system.
 * @class User
 * @property {string} email - The email address of the user.
 * @property {string} username - The username of the user.
 * @property {string} passwordHash - The hashed password of the user.
 */
@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    username: string;

    @Prop()
    passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);