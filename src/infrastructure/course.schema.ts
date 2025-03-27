// src/infrastructure/repository/course.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserType } from 'src/domain/enums/user-type.enum';
// import { UserType } from '../../domain/enums/user-type.enum';

export enum ResourceType {
  PDF = 'pdf',
  VIDEO = 'video',
  LINK = 'link',
}

@Schema()
export class CourseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ enum: ResourceType, required: true })
  resourceType: ResourceType;

  @Prop({ required: true })
  resourceUrl: string;

  @Prop()
  thumbnailUrl: string;

  @Prop({ default: 0 })
  duration: number; // En minutes pour les vidéos

  @Prop({ default: [] })
  accessibleTo: UserType[]; // Types d'utilisateurs ayant accès

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  downloadCount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;
}

export type CourseDocument = CourseSchema & Document;
export const CourseModel = SchemaFactory.createForClass(CourseSchema);
