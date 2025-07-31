import { Document } from 'mongoose';
export declare class BannerSchema {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    isActive: boolean;
    displayOrder: number;
    startDate: Date;
    endDate: Date;
    targetAudience: string;
    clickCount: number;
    impressions: number;
    createdBy: string;
}
export type BannerDocument = Document & BannerSchema;
export declare const BannerModel: import("mongoose").Schema<BannerSchema, import("mongoose").Model<BannerSchema, any, any, any, Document<unknown, any, BannerSchema> & BannerSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BannerSchema, Document<unknown, {}, import("mongoose").FlatRecord<BannerSchema>> & import("mongoose").FlatRecord<BannerSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
