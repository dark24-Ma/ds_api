import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionTypeRepository } from '../../infrastructure/repository/subscription-type.repository';

@Injectable()
export class SubscriptionTypeService {
  constructor(private subscriptionTypeRepository: SubscriptionTypeRepository) {}

  async createSubscriptionType(subscriptionTypeData: any) {
    const subscriptionType =
      await this.subscriptionTypeRepository.create(subscriptionTypeData);
    return this.formatSubscriptionTypeResponse(subscriptionType);
  }

  async getSubscriptionTypeById(id: string) {
    const subscriptionType = await this.subscriptionTypeRepository.findById(id);
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }
    return this.formatSubscriptionTypeResponse(subscriptionType);
  }

  async getAllSubscriptionTypes() {
    const subscriptionTypes = await this.subscriptionTypeRepository.findAll();
    return subscriptionTypes.map((st) =>
      this.formatSubscriptionTypeResponse(st),
    );
  }

  async updateSubscriptionType(id: string, updateData: any) {
    const subscriptionType = await this.subscriptionTypeRepository.update(
      id,
      updateData,
    );
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }
    return this.formatSubscriptionTypeResponse(subscriptionType);
  }

  async deleteSubscriptionType(id: string) {
    const subscriptionType = await this.subscriptionTypeRepository.delete(id);
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }
    return this.formatSubscriptionTypeResponse(subscriptionType);
  }

  private formatSubscriptionTypeResponse(subscriptionType) {
    return {
      id: subscriptionType._id,
      name: subscriptionType.name,
      description: subscriptionType.description,
      price: subscriptionType.price,
      duration: subscriptionType.duration,
      features: subscriptionType.features,
      createdAt: subscriptionType.createdAt,
      updatedAt: subscriptionType.updatedAt,
    };
  }
}
