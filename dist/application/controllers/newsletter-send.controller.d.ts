import { NewsletterSenderService } from '../services/newsletter-sender.service';
export declare class NewsletterSenderController {
    private readonly senderService;
    constructor(senderService: NewsletterSenderService);
    sendNewsletter(templateId: string): Promise<{
        totalSent: number;
        totalFailed: number;
        details: any[];
    }>;
}
