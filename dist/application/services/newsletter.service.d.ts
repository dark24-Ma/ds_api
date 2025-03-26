import { NewsletterRepository } from '../../infrastructure/repository/newsletter.repository';
import { EmailService } from './email.service';
export declare class NewsletterService {
    private newsletterRepository;
    private emailService;
    constructor(newsletterRepository: NewsletterRepository, emailService: EmailService);
    subscribe(email: string): Promise<void>;
    unsubscribe(email: string): Promise<void>;
    private sendWelcomeNewsletter;
    getAllSubscribed(): Promise<string[]>;
}
