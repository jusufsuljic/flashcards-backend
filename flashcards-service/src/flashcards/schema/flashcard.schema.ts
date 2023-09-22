import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlashcardDocument = HydratedDocument<Flashcard>;

/**
 * Represents a flashcard entity.
 * @class Flashcard
 * @property {string} title - The title of the flashcard.
 * @property {string} description - The description of the flashcard.
 * @property {string} userId - The ID of the user who owns the flashcard.
 */
@Schema()
export class Flashcard {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    userId: string;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);