// src/application/controllers/newsletter-sender.controller.ts
import { Controller, Post, Param, UseGuards } from '@nestjs/common';
// import { NewsletterSenderService } from '../services/newsletter-sender.service';
import { NewsletterSenderService } from '../services/newsletter-sender.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('send-newsletter')
@UseGuards(JwtAuthGuard)
export class NewsletterSenderController {
  constructor(private readonly senderService: NewsletterSenderService) {}

  @Post(':templateId')
  async sendNewsletter(@Param('templateId') templateId: string) {
    return this.senderService.sendNewsletter(templateId);
  }
}
