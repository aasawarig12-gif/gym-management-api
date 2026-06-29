import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MembershipDocument = Membership & Document;

@Schema({ timestamps: true })
export class Membership {

  @Prop({ required: true })
  plan: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gym',
    required: true,
  })
  gym: string;
}

export const MembershipSchema =
  SchemaFactory.createForClass(Membership);

  MembershipSchema.index({ gym: 1 });
MembershipSchema.index({ plan: 1 });