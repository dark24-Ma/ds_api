import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BannerSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  linkUrl: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, default: 1 })
  displayOrder: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true, enum: ['all', 'clients', 'subscribers'], default: 'all' })
  targetAudience: string;

  @Prop({ default: 0 })
  clickCount: number;

  @Prop({ default: 0 })
  impressions: number;

  @Prop()
  createdBy: string;
}

export type BannerDocument = Document & BannerSchema;
export const BannerModel = SchemaFactory.createForClass(BannerSchema); 