// src/infrastructure/repository/newsletter-template.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NewsletterTemplateSchema {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ required: false })
  status: string;
}

export type NewsletterTemplateDocument = NewsletterTemplateSchema & Document;
export const NewsletterTemplateModel = SchemaFactory.createForClass(
  NewsletterTemplateSchema,
);
