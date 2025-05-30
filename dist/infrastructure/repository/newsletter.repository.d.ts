import { Model } from 'mongoose';
import { NewsletterDocument } from '../newsletter.schema';
export declare class NewsletterRepository {
    private newsletterModel;
    constructor(newsletterModel: Model<NewsletterDocument>);
    subscribe(email: string): Promise<NewsletterDocument>;
    unsubscribe(email: string): Promise<NewsletterDocument | null>;
    findByEmail(email: string): Promise<NewsletterDocument | null>;
    getAllSubscribed(): Promise<NewsletterDocument[]>;
}
