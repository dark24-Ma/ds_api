import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  //   Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SubscriptionTypeService } from '../services/subscription-type.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
// import { Roles } from '../decorators/roles.decorator';
// import { UserRole } from '../../domain/enums/user-role.enum';

@Controller('subscription-types')
@UseGuards(JwtAuthGuard)
export class SubscriptionTypeController {
  constructor(
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) {}

  @Post()
  //   @Roles(UserRole.ADMIN)
  async createSubscriptionType(@Body() subscriptionTypeData: any) {
    try {
      return await this.subscriptionTypeService.createSubscriptionType(
        subscriptionTypeData,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllSubscriptionTypes() {
    try {
      return await this.subscriptionTypeService.getAllSubscriptionTypes();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getSubscriptionTypeById(@Param('id') id: string) {
    try {
      const subscriptionType =
        await this.subscriptionTypeService.getSubscriptionTypeById(id);
      if (!subscriptionType) {
        throw new NotFoundException("Type d'abonnement non trouvé");
      }
      return subscriptionType;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  //   @Roles(UserRole.ADMIN)
  async updateSubscriptionType(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    try {
      const updatedSubscriptionType =
        await this.subscriptionTypeService.updateSubscriptionType(
          id,
          updateData,
        );
      if (!updatedSubscriptionType) {
        throw new NotFoundException("Type d'abonnement non trouvé");
      }
      return updatedSubscriptionType;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  //   @Roles(UserRole.ADMIN)
  async deleteSubscriptionType(@Param('id') id: string) {
    try {
      const deletedSubscriptionType =
        await this.subscriptionTypeService.deleteSubscriptionType(id);
      if (!deletedSubscriptionType) {
        throw new NotFoundException("Type d'abonnement non trouvé");
      }
      return { message: "Type d'abonnement supprimé avec succès" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
