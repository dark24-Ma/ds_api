import { Controller, Post, Body, Get, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { UserSubscriptionService } from '../services/user-subscription.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
// import { Roles } from '../decorators/roles.decorator';
// import { UserRole } from '../../domain/enums/user-role.enum';

@Controller('user-subscriptions')
@UseGuards(JwtAuthGuard)
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @Post('subscribe')
  async subscribeUser(
    @Body() body: { userId: string; subscriptionTypeId: string },
  ) {
    return this.userSubscriptionService.subscribeUser(
      body.userId,
      body.subscriptionTypeId,
    );
  }

  @Get(':userId')
  async getUserSubscription(@Param('userId') userId: string) {
    return this.userSubscriptionService.getUserSubscription(userId);
  }

  @Get('details/:userId')
  async getUserSubscriptionWithDetails(@Param('userId') userId: string) {
    return this.userSubscriptionService.getUserSubscriptionWithDetails(userId);
  }

  @Get()
  async getAllSubscriptions() {
    return this.userSubscriptionService.getAllSubscriptions();
  }

  @Get('check/:userId')
  async checkUserSubscription(@Param('userId') userId: string) {
    try {
      const hasActiveSubscription = await this.userSubscriptionService.hasActiveSubscription(userId);
      return { hasActiveSubscription };
    } catch (error) {
      return { hasActiveSubscription: false, error: error.message };
    }
  }

  @Put('cancel/:subscriptionId')
  async cancelSubscription(@Param('subscriptionId') subscriptionId: string) {
    return this.userSubscriptionService.cancelSubscription(subscriptionId);
  }

  @Put('expire/:subscriptionId')
  async expireSubscription(@Param('subscriptionId') subscriptionId: string) {
    return this.userSubscriptionService.expireSubscription(subscriptionId);
  }

  @Post('check-expired')
  async checkAndUpdateExpiredSubscriptions() {
    return this.userSubscriptionService.checkAndUpdateExpiredSubscriptions();
  }

  @Post('renew')
  async renewSubscription(
    @Body() body: { userId: string; subscriptionTypeId: string },
  ) {
    return this.userSubscriptionService.renewSubscription(
      body.userId,
      body.subscriptionTypeId,
    );
  }

  @Post('extend')
  async extendSubscription(
    @Body() body: { userId: string; additionalDays?: number },
  ) {
    return this.userSubscriptionService.extendSubscription(
      body.userId,
      body.additionalDays || 30,
    );
  }

  @Post('upgrade')
  async upgradeSubscription(
    @Body() body: { userId: string; newSubscriptionTypeId: string },
  ) {
    return this.userSubscriptionService.upgradeSubscription(
      body.userId,
      body.newSubscriptionTypeId,
    );
  }

  @Get('suggestions/:userId/:requestedTypeId')
  async getSubscriptionSuggestions(
    @Param('userId') userId: string,
    @Param('requestedTypeId') requestedTypeId: string,
  ) {
    return this.userSubscriptionService.getSubscriptionSuggestions(userId, requestedTypeId);
  }

  @Get('history/:userId')
  async getUserSubscriptionHistory(@Param('userId') userId: string) {
    return this.userSubscriptionService.getUserSubscriptionHistory(userId);
  }
}
