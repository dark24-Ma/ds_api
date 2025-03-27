import { Model } from 'mongoose';
import { NewsletterTemplateDocument } from '../newsletter-template.schema';
export declare class NewsletterTemplateRepository {
    private templateModel;
    constructor(templateModel: Model<NewsletterTemplateDocument>);
    create(templateData: any): Promise<NewsletterTemplateDocument>;
    findById(id: string): Promise<NewsletterTemplateDocument | null>;
    findAll(): Promise<NewsletterTemplateDocument[]>;
    update(id: string, updateData: any): Promise<NewsletterTemplateDocument | null>;
    delete(id: string): Promise<NewsletterTemplateDocument | null>;
}
