import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserSubscriptionService } from './user-subscription.service';

@Injectable()
export class SubscriptionExpiryService {
  private readonly logger = new Logger(SubscriptionExpiryService.name);

  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  // Vérification automatique toutes les heures
  @Cron(CronExpression.EVERY_HOUR)
  async handleExpiredSubscriptions() {
    this.logger.log('Vérification des abonnements expirés...');
    
    try {
      const result = await this.userSubscriptionService.checkAndUpdateExpiredSubscriptions();
      
      if (result.expiredCount > 0) {
        this.logger.log(`${result.expiredCount} abonnement(s) expiré(s) mis à jour`);
      } else {
        this.logger.log('Aucun abonnement expiré trouvé');
      }
      
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la vérification des abonnements expirés:', error);
    }
  }

  // Méthode manuelle pour forcer la vérification
  async forceCheckExpiredSubscriptions() {
    this.logger.log('Vérification manuelle des abonnements expirés...');
    return this.handleExpiredSubscriptions();
  }
} 