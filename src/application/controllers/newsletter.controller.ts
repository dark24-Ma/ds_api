// src/application/controllers/newsletter.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { NewsletterService } from '../services/newsletter.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { email: string }) {
    await this.newsletterService.subscribe(body.email);
    return { message: 'Inscription à la newsletter réussie' };
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() body: { email: string }) {
    await this.newsletterService.unsubscribe(body.email);
    return { message: 'Désabonnement de la newsletter réussi' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribers')
  async getSubscribers() {
    return this.newsletterService.getAllSubscribed();
  }
}
