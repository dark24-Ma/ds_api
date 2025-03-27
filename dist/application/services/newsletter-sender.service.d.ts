import { NewsletterService } from './newsletter.service';
import { NewsletterTemplateService } from './newsletter-template.service';
import { EmailService } from './email.service';
export declare class NewsletterSenderService {
    private newsletterService;
    private templateService;
    private emailService;
    constructor(newsletterService: NewsletterService, templateService: NewsletterTemplateService, emailService: EmailService);
    sendNewsletter(templateId: string): Promise<{
        totalSent: number;
        totalFailed: number;
        details: any[];
    }>;
}
