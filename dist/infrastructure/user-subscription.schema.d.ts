import { Document } from 'mongoose';
export declare class UserSubscriptionSchema {
    userId: string;
    subscriptionTypeId: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type UserSubscriptionDocument = UserSubscriptionSchema & Document;
export declare const UserSubscriptionModel: import("mongoose").Schema<UserSubscriptionSchema, import("mongoose").Model<UserSubscriptionSchema, any, any, any, Document<unknown, any, UserSubscriptionSchema> & UserSubscriptionSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSubscriptionSchema, Document<unknown, {}, import("mongoose").FlatRecord<UserSubscriptionSchema>> & import("mongoose").FlatRecord<UserSubscriptionSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
