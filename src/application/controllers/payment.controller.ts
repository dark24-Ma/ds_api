import { Controller, Post, Body, Get, Param, UseGuards, Query } from '@nestjs/common';
import { SubscriptionPaymentService, SubscriptionUpgradeRequest } from '../services/subscription-payment.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly subscriptionPaymentService: SubscriptionPaymentService,
  ) {}

  @Post('subscription/upgrade')
  @UseGuards(JwtAuthGuard)
  async initiateUpgradePayment(@Body() request: SubscriptionUpgradeRequest) {
    return this.subscriptionPaymentService.initiateUpgradePayment(request);
  }

  @Post('subscription/new')
  @UseGuards(JwtAuthGuard)
  async initiateNewSubscriptionPayment(@Body() request: SubscriptionUpgradeRequest) {
    return this.subscriptionPaymentService.initiateNewSubscriptionPayment(request);
  }

  @Post('webhook/confirmation')
  async handlePaymentConfirmation(@Body() confirmationData: any) {
    // Endpoint pour recevoir les confirmations de PayGate
    // Note: PayGate envoie les confirmations ici après un paiement réussi
    return this.subscriptionPaymentService.processPaymentConfirmation(confirmationData);
  }

  @Get('status/:identifier')
  @UseGuards(JwtAuthGuard)
  async checkPaymentStatus(@Param('identifier') identifier: string) {
    return this.subscriptionPaymentService.checkPaymentStatus(identifier);
  }
} 