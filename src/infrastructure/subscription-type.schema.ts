import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SubscriptionTypeSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type SubscriptionTypeDocument = SubscriptionTypeSchema & Document;
export const SubscriptionTypeModel = SchemaFactory.createForClass(
  SubscriptionTypeSchema,
);
