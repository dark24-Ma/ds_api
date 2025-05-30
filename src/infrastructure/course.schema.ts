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

// Schéma pour une ressource individuelle dans un cours
@Schema()
export class CourseResource {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ enum: ResourceType, required: true })
  resourceType: ResourceType;

  @Prop({ required: true })
  resourceUrl: string;

  @Prop()
  fileName: string;

  @Prop({ default: 0 })
  duration: number; // En minutes pour les vidéos

  @Prop({ default: 0 })
  order: number; // Pour ordonner les ressources dans le cours
}

@Schema()
export class CourseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ enum: ResourceType, required: false })
  resourceType: ResourceType;

  @Prop({ required: false })
  resourceUrl: string;

  @Prop()
  thumbnailUrl: string;

  @Prop({ default: 0 })
  duration: number; // En minutes pour les vidéos

  @Prop({ default: [] })
  accessibleTo: UserType[]; // Types d'utilisateurs ayant accès

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isFreeAccess: boolean; // Indique si le cours est accessible sans abonnement

  @Prop({ default: 0 })
  downloadCount: number;
  
  @Prop({ default: 0 })
  viewCount: number; // Nombre de fois que le cours a été visualisé

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: String, ref: 'SubscriptionType' }], default: [] })
  requiredSubscriptionTypes: string[];

  // Nouvelle propriété pour les ressources multiples
  @Prop({ type: [Object], default: [] })
  resources: CourseResource[];
}

export type CourseDocument = CourseSchema & Document;
export const CourseModel = SchemaFactory.createForClass(CourseSchema);
