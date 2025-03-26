import { Document } from 'mongoose';
export declare class NewsletterSchema {
    email: string;
    isSubscribed: boolean;
    subscribedAt: Date;
    unsubscribedAt: Date;
}
export type NewsletterDocument = NewsletterDocument & Document;
export declare const NewsletterModel: import("mongoose").Schema<NewsletterSchema, import("mongoose").Model<NewsletterSchema, any, any, any, Document<unknown, any, NewsletterSchema> & NewsletterSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsletterSchema, Document<unknown, {}, import("mongoose").FlatRecord<NewsletterSchema>> & import("mongoose").FlatRecord<NewsletterSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
