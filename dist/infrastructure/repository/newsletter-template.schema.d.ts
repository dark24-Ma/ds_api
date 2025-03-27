import { Document } from 'mongoose';
export declare class NewsletterTemplateSchema {
    name: string;
    subject: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
export type NewsletterTemplateDocument = NewsletterTemplateSchema & Document;
export declare const NewsletterTemplateModel: import("mongoose").Schema<NewsletterTemplateSchema, import("mongoose").Model<NewsletterTemplateSchema, any, any, any, Document<unknown, any, NewsletterTemplateSchema> & NewsletterTemplateSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsletterTemplateSchema, Document<unknown, {}, import("mongoose").FlatRecord<NewsletterTemplateSchema>> & import("mongoose").FlatRecord<NewsletterTemplateSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
