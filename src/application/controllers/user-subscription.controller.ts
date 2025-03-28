import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
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

  @Get()
  async getAllSubscriptions() {
    return this.userSubscriptionService.getAllSubscriptions();
  }
}
