import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GymDocument = Gym & Document;

@Schema({ timestamps: true })
export class Gym {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  price: number;

  @Prop()
  rating: number;
}

export const GymSchema = SchemaFactory.createForClass(Gym);

// INDEXING (IMPORTANT FOR PERFORMANCE)
GymSchema.index({ location: 1 });
GymSchema.index({ name: 1 });
GymSchema.index({ createdAt: -1 });