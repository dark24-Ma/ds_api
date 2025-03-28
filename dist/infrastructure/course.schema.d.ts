import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserType } from 'src/domain/enums/user-type.enum';
export declare enum ResourceType {
    PDF = "pdf",
    VIDEO = "video",
    LINK = "link"
}
export declare class CourseSchema {
    title: string;
    description: string;
    tags: string[];
    resourceType: ResourceType;
    resourceUrl: string;
    thumbnailUrl: string;
    duration: number;
    accessibleTo: UserType[];
    isFeatured: boolean;
    downloadCount: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: MongooseSchema.Types.ObjectId;
    requiredSubscriptionTypes: string[];
}
export type CourseDocument = CourseSchema & Document;
export declare const CourseModel: MongooseSchema<CourseSchema, import("mongoose").Model<CourseSchema, any, any, any, Document<unknown, any, CourseSchema> & CourseSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CourseSchema, Document<unknown, {}, import("mongoose").FlatRecord<CourseSchema>> & import("mongoose").FlatRecord<CourseSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
