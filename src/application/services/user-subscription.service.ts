import {
  Injectable,
  NotFoundException,
  //   BadRequestException,
} from '@nestjs/common';
import { UserSubscriptionRepository } from '../../infrastructure/repository/user-subscription.repository';
import { SubscriptionTypeService } from './subscription-type.service';

@Injectable()
export class UserSubscriptionService {
  constructor(
    private userSubscriptionRepository: UserSubscriptionRepository,
    private subscriptionTypeService: SubscriptionTypeService,
  ) {}

  async subscribeUser(userId: string, subscriptionTypeId: string) {
    // Vérifier si le type d'abonnement existe
    const subscriptionType =
      await this.subscriptionTypeService.getSubscriptionTypeById(
        subscriptionTypeId,
      );
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }

    // Calculer les dates de début et de fin
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + subscriptionType.duration);

    // Créer l'abonnement
    const userSubscription = await this.userSubscriptionRepository.create({
      userId,
      subscriptionTypeId,
      startDate,
      endDate,
      isActive: true,
    });

    return this.formatUserSubscriptionResponse(userSubscription);
  }

  async getUserSubscription(userId: string) {
    const userSubscription =
      await this.userSubscriptionRepository.findByUserId(userId);
    if (!userSubscription) {
      throw new NotFoundException('Abonnement non trouvé');
    }
    return this.formatUserSubscriptionResponse(userSubscription);
  }

  // src/application/services/user-subscription.service.ts
  async getAllSubscriptions() {
    const subscriptions = await this.userSubscriptionRepository.findAll();

    const formattedSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        // Récupérer les informations complètes du type d'abonnement
        let subscriptionTypeInfo = null;
        try {
          subscriptionTypeInfo =
            await this.subscriptionTypeService.getSubscriptionTypeById(
              subscription.subscriptionTypeId.toString(),
            );
        } catch (error) {
          console.error(
            `Erreur lors de la récupération du type d'abonnement: ${error.message}`,
          );
        }

        return {
          id: subscription._id.toString(),
          userId: subscription.userId,
          subscriptionTypeId: subscription.subscriptionTypeId.toString(),
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          isActive: subscription.isActive,
          createdAt: subscription.createdAt,
          updatedAt: subscription.updatedAt,
          subscriptionType: subscriptionTypeInfo,
        };
      }),
    );

    return formattedSubscriptions;
  }

  private formatUserSubscriptionResponse(userSubscription) {
    return {
      id: userSubscription._id,
      userId: userSubscription.userId,
      subscriptionTypeId: userSubscription.subscriptionTypeId,
      startDate: userSubscription.startDate,
      endDate: userSubscription.endDate,
      isActive: userSubscription.isActive,
      createdAt: userSubscription.createdAt,
      updatedAt: userSubscription.updatedAt,
    };
  }
}
