import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlashcardDocument = HydratedDocument<Flashcard>;

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