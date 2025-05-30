import { NewsletterService } from '../services/newsletter.service';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    subscribe(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    unsubscribe(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    getSubscribers(): Promise<any>;
}
