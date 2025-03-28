import { Document } from 'mongoose';
export declare class SubscriptionTypeSchema {
    name: string;
    description: string;
    price: number;
    duration: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}
export type SubscriptionTypeDocument = SubscriptionTypeSchema & Document;
export declare const SubscriptionTypeModel: import("mongoose").Schema<SubscriptionTypeSchema, import("mongoose").Model<SubscriptionTypeSchema, any, any, any, Document<unknown, any, SubscriptionTypeSchema> & SubscriptionTypeSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubscriptionTypeSchema, Document<unknown, {}, import("mongoose").FlatRecord<SubscriptionTypeSchema>> & import("mongoose").FlatRecord<SubscriptionTypeSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
