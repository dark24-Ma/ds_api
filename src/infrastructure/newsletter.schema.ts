import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NewsletterSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  isSubscribed: boolean;

  @Prop({ required: true })
  subscribedAt: Date;

  @Prop()
  unsubscribedAt: Date;
}

export type NewsletterDocument = Document & NewsletterSchema;
export const NewsletterModel = SchemaFactory.createForClass(NewsletterSchema);
