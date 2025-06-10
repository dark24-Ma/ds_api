import {
  Injectable,
  NotFoundException,
  BadRequestException,
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
    console.log(`[subscribeUser] Attribution abonnement - userId: ${userId}, subscriptionTypeId: ${subscriptionTypeId}`);
    // Vérifier si le type d'abonnement existe
    const subscriptionType =
      await this.subscriptionTypeService.getSubscriptionTypeById(
        subscriptionTypeId,
      );
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }
    console.log(`[subscribeUser] Type d'abonnement trouvé:`, subscriptionType);

    // Vérifier s'il existe déjà un abonnement actif pour cet utilisateur
    const existingActiveSubscription = await this.userSubscriptionRepository.findByUserId(userId);
    
    if (existingActiveSubscription && existingActiveSubscription.isActive && 
        new Date(existingActiveSubscription.endDate) > new Date()) {
      
      // Retourner les suggestions au lieu de bloquer
      const suggestions = await this.getSubscriptionSuggestions(userId, subscriptionTypeId);
      throw new BadRequestException({
        message: "L'utilisateur a déjà un abonnement actif",
        suggestions: suggestions
      });
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
    console.log(`[subscribeUser] Abonnement créé avec succès:`, userSubscription);

    return this.formatUserSubscriptionResponse(userSubscription);
  }

  async getSubscriptionSuggestions(userId: string, requestedSubscriptionTypeId: string) {
    const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
    if (!currentSubscription || !currentSubscription.isActive) {
      return null;
    }

    const currentSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(
      currentSubscription.subscriptionTypeId.toString()
    );
    
    const requestedSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(
      requestedSubscriptionTypeId
    );

    const allSubscriptionTypes = await this.subscriptionTypeService.getAllSubscriptionTypes();

    // Trouver le plan supérieur suivant
    const nextLevelType = allSubscriptionTypes.find(type => 
      type.level === currentSubscriptionType.level + 1
    );

    return {
      currentSubscription: {
        id: currentSubscription._id.toString(),
        type: currentSubscriptionType,
        endDate: currentSubscription.endDate
      },
      suggestions: [
        // Option 1: Prolonger l'abonnement actuel d'un mois
        {
          type: 'extend',
          title: 'Prolonger votre abonnement actuel',
          description: `Ajouter 30 jours à votre abonnement "${currentSubscriptionType.name}"`,
          subscriptionType: currentSubscriptionType,
          newEndDate: this.addDaysToDate(new Date(currentSubscription.endDate), 30)
        },
        // Option 2: Upgrade vers le plan supérieur (si disponible)
        ...(nextLevelType ? [{
          type: 'upgrade',
          title: 'Passer au plan supérieur',
          description: `Upgrader vers "${nextLevelType.name}" avec tous ses avantages`,
          subscriptionType: nextLevelType,
          newEndDate: this.addDaysToDate(new Date(), nextLevelType.duration)
        }] : [])
      ]
    };
  }

  private addDaysToDate(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async getUserSubscription(userId: string) {
    console.log(`[getUserSubscription] Recherche abonnement pour userId: ${userId}`);
    const userSubscription =
      await this.userSubscriptionRepository.findByUserId(userId);
    console.log(`[getUserSubscription] Abonnement trouvé:`, userSubscription);
    if (!userSubscription) {
      console.log(`[getUserSubscription] Aucun abonnement trouvé pour userId: ${userId}`);
      throw new NotFoundException('Abonnement non trouvé');
    }
    return this.formatUserSubscriptionResponse(userSubscription);
  }

  async getUserSubscriptionWithDetails(userId: string) {
    console.log(`[getUserSubscriptionWithDetails] Recherche abonnement avec détails pour userId: ${userId}`);
    
    // D'abord chercher un abonnement actif
    let userSubscription = await this.userSubscriptionRepository.findActiveByUserId(userId);
    console.log(`[getUserSubscriptionWithDetails] Abonnement actif trouvé:`, userSubscription);
    
    // Si pas d'abonnement actif, chercher le dernier abonnement (actif ou non)
    if (!userSubscription) {
      console.log(`[getUserSubscriptionWithDetails] Aucun abonnement actif, recherche du dernier abonnement`);
      userSubscription = await this.userSubscriptionRepository.findByUserId(userId);
      console.log(`[getUserSubscriptionWithDetails] Dernier abonnement trouvé:`, userSubscription);
    }
    
    if (!userSubscription) {
      console.log(`[getUserSubscriptionWithDetails] Aucun abonnement trouvé pour userId: ${userId}`);
      return null;
    }

    // Récupérer les informations complètes du type d'abonnement
    let subscriptionTypeInfo = null;
    try {
      subscriptionTypeInfo =
        await this.subscriptionTypeService.getSubscriptionTypeById(
          userSubscription.subscriptionTypeId.toString(),
        );
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du type d'abonnement: ${error.message}`,
      );
    }

    return {
      id: userSubscription._id.toString(),
      userId: userSubscription.userId,
      subscriptionTypeId: userSubscription.subscriptionTypeId.toString(),
      startDate: userSubscription.startDate,
      endDate: userSubscription.endDate,
      isActive: userSubscription.isActive,
      createdAt: userSubscription.createdAt,
      updatedAt: userSubscription.updatedAt,
      subscriptionType: subscriptionTypeInfo,
      status: this.calculateSubscriptionStatus(userSubscription)
    };
  }

  private calculateSubscriptionStatus(subscription: any): string {
    const now = new Date();
    const endDate = new Date(subscription.endDate);
    
    // Si explicitement marqué comme inactif, c'est soit annulé soit expiré
    if (!subscription.isActive) {
      // Si la date de fin est passée, c'est expiré, sinon c'est annulé
      if (endDate < now) {
        return 'expired';
      }
      return 'cancelled';
    }
    
    // Si actif mais date de fin passée, marquer comme expiré
    if (endDate < now) {
      return 'expired';
    }
    
    return 'active';
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

  async hasActiveSubscription(userId: string): Promise<boolean> {
    try {
      const subscription = await this.userSubscriptionRepository.findActiveByUserId(userId);
      
      // Si aucun abonnement n'est trouvé
      if (!subscription) {
        return false;
      }
      
      // Vérifier si l'abonnement est actif et non expiré
      const isActive = subscription.isActive && new Date() <= subscription.endDate;
      
      return isActive;
    } catch (error) {
      console.error(`Erreur lors de la vérification de l'abonnement pour l'utilisateur ${userId}:`, error);
      return false;
    }
  }

  async expireSubscription(subscriptionId: string) {
    const subscription = await this.userSubscriptionRepository.findById(subscriptionId);
    if (!subscription) {
      throw new NotFoundException('Abonnement non trouvé');
    }

    // Marquer l'abonnement comme inactif
    const updatedSubscription = await this.userSubscriptionRepository.updateById(subscriptionId, {
      isActive: false,
      updatedAt: new Date()
    });

    return this.formatUserSubscriptionResponse(updatedSubscription);
  }

  async cancelSubscription(subscriptionId: string) {
    const subscription = await this.userSubscriptionRepository.findById(subscriptionId);
    if (!subscription) {
      throw new NotFoundException('Abonnement non trouvé');
    }

    // Marquer l'abonnement comme inactif (annulé)
    const updatedSubscription = await this.userSubscriptionRepository.updateById(subscriptionId, {
      isActive: false,
      updatedAt: new Date()
    });

    return this.formatUserSubscriptionResponse(updatedSubscription);
  }

  async checkAndUpdateExpiredSubscriptions() {
    // Récupérer tous les abonnements actifs
    const activeSubscriptions = await this.userSubscriptionRepository.findActiveSubscriptions();
    const now = new Date();
    
    const expiredSubscriptions = [];
    
    for (const subscription of activeSubscriptions) {
      if (subscription.endDate < now) {
        // Expirer l'abonnement
        await this.userSubscriptionRepository.updateById(subscription._id.toString(), {
          isActive: false,
          updatedAt: now
        });
        expiredSubscriptions.push(subscription._id.toString());
      }
    }
    
    return {
      expiredCount: expiredSubscriptions.length,
      expiredSubscriptions
    };
  }

  async renewSubscription(userId: string, subscriptionTypeId: string) {
    // Vérifier si le type d'abonnement existe
    const subscriptionType =
      await this.subscriptionTypeService.getSubscriptionTypeById(
        subscriptionTypeId,
      );
    if (!subscriptionType) {
      throw new NotFoundException("Type d'abonnement non trouvé");
    }

    // Trouver l'abonnement existant de l'utilisateur
    const existingSubscription = await this.userSubscriptionRepository.findByUserId(userId);
    
    if (existingSubscription) {
      // Réactiver et prolonger l'abonnement existant
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + subscriptionType.duration);

      const updatedSubscription = await this.userSubscriptionRepository.updateById(
        existingSubscription._id.toString(),
        {
          subscriptionTypeId,
          startDate,
          endDate,
          isActive: true,
          updatedAt: new Date()
        }
      );

      return this.formatUserSubscriptionResponse(updatedSubscription);
    } else {
      // Créer un nouvel abonnement si aucun n'existe
      return this.subscribeUser(userId, subscriptionTypeId);
    }
  }

  async extendSubscription(userId: string, additionalDays: number = 30) {
    const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
    
    if (!currentSubscription) {
      throw new NotFoundException('Aucun abonnement trouvé pour cet utilisateur');
    }

    if (!currentSubscription.isActive) {
      throw new BadRequestException('L\'abonnement actuel n\'est pas actif');
    }

    // Prolonger la date de fin
    const newEndDate = this.addDaysToDate(new Date(currentSubscription.endDate), additionalDays);

    const updatedSubscription = await this.userSubscriptionRepository.updateById(
      currentSubscription._id.toString(),
      {
        endDate: newEndDate,
        updatedAt: new Date()
      }
    );

    return this.formatUserSubscriptionResponse(updatedSubscription);
  }

  async upgradeSubscription(userId: string, newSubscriptionTypeId: string) {
    const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
    
    if (!currentSubscription) {
      throw new NotFoundException('Aucun abonnement trouvé pour cet utilisateur');
    }

    if (!currentSubscription.isActive) {
      throw new BadRequestException('L\'abonnement actuel n\'est pas actif');
    }

    const newSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(
      newSubscriptionTypeId
    );

    if (!newSubscriptionType) {
      throw new NotFoundException('Type d\'abonnement non trouvé');
    }

    const currentSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(
      currentSubscription.subscriptionTypeId.toString()
    );

    // Vérifier que c'est bien un upgrade (niveau supérieur)
    if (newSubscriptionType.level <= currentSubscriptionType.level) {
      throw new BadRequestException('Le nouveau plan doit être de niveau supérieur');
    }

    // Mettre à jour l'abonnement avec le nouveau type
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + newSubscriptionType.duration);

    const updatedSubscription = await this.userSubscriptionRepository.updateById(
      currentSubscription._id.toString(),
      {
        subscriptionTypeId: newSubscriptionTypeId,
        startDate: startDate,
        endDate: endDate,
        updatedAt: new Date()
      }
    );

    return this.formatUserSubscriptionResponse(updatedSubscription);
  }

  async getUserSubscriptionHistory(userId: string) {
    console.log(`[getUserSubscriptionHistory] Récupération historique pour userId: ${userId}`);
    const subscriptions = await this.userSubscriptionRepository.findAllByUserId(userId);
    console.log(`[getUserSubscriptionHistory] ${subscriptions.length} abonnements trouvés`);
    
    const formattedSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        let subscriptionTypeInfo = null;
        try {
          subscriptionTypeInfo = await this.subscriptionTypeService.getSubscriptionTypeById(
            subscription.subscriptionTypeId.toString(),
          );
        } catch (error) {
          console.error(`Erreur lors de la récupération du type d'abonnement: ${error.message}`);
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
          status: this.calculateSubscriptionStatus(subscription)
        };
      }),
    );

    return formattedSubscriptions;
  }
}
