// src/application/services/newsletter-sender.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterTemplateService } from './newsletter-template.service';
import { EmailService } from './email.service';

@Injectable()
export class NewsletterSenderService {
  constructor(
    private newsletterService: NewsletterService,
    private templateService: NewsletterTemplateService,
    private emailService: EmailService,
  ) {}

  async sendNewsletter(templateId: string) {
    // Récupérer le template
    const template = await this.templateService.getTemplateById(templateId);
    if (!template) {
      throw new NotFoundException('Template non trouvé');
    }

    // Récupérer tous les abonnés
    const subscribers = await this.newsletterService.getAllSubscribed();

    // Envoyer l'email à chaque abonné
    const results = [];
    for (const subscriber of subscribers) {
      try {
        await this.emailService.sendNewsletterToSubscriber(
          subscriber.email,
          template.subject,
          template.content,
        );
        results.push({ email: subscriber.email, success: true });
      } catch (error) {
        results.push({
          email: subscriber.email,
          success: false,
          error: error.message,
        });
      }
    }

    return {
      totalSent: results.filter((r) => r.success).length,
      totalFailed: results.filter((r) => !r.success).length,
      details: results,
    };
  }
}
