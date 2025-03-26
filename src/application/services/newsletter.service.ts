// src/application/services/newsletter.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NewsletterRepository } from '../../infrastructure/repository/newsletter.repository';
import { EmailService } from './email.service';

@Injectable()
export class NewsletterService {
  constructor(
    private newsletterRepository: NewsletterRepository,
    private emailService: EmailService,
  ) {}

  async subscribe(email: string): Promise<void> {
    const existing = await this.newsletterRepository.findByEmail(email);

    if (existing && existing.isSubscribed) {
      throw new ConflictException(
        'Cette adresse email est déjà inscrite à la newsletter',
      );
    }

    await this.newsletterRepository.subscribe(email);
    await this.sendWelcomeNewsletter(email);
  }

  async unsubscribe(email: string): Promise<void> {
    const newsletter = await this.newsletterRepository.unsubscribe(email);
    if (!newsletter) {
      throw new NotFoundException('Adresse email non trouvée');
    }
  }

  private async sendWelcomeNewsletter(email: string): Promise<void> {
    // Ajoutez cette méthode dans votre EmailService
    await this.emailService.sendNewsletterWelcome(email);
  }

  async getAllSubscribed(): Promise<string[]> {
    const newsletters = await this.newsletterRepository.getAllSubscribed();
    return newsletters.map((n) => n.email);
  }
}
