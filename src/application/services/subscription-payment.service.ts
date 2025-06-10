import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PayGateService, PayGatePaymentRequest } from './paygate.service';
import { UserSubscriptionService } from './user-subscription.service';
import { SubscriptionTypeService } from './subscription-type.service';

export interface SubscriptionUpgradeRequest {
  userId: string;
  newSubscriptionTypeId: string;
  phone?: string;
  network?: 'FLOOZ' | 'TMONEY';
}

export interface PaymentPendingResponse {
  paymentUrl: string;
  identifier: string;
  amount: number;
  description: string;
}

@Injectable()
export class SubscriptionPaymentService {
  private readonly logger = new Logger(SubscriptionPaymentService.name);

  constructor(
    private payGateService: PayGateService,
    private userSubscriptionService: UserSubscriptionService,
    private subscriptionTypeService: SubscriptionTypeService,
  ) {}

  /**
   * Initier un paiement pour un upgrade d'abonnement
   */
  async initiateUpgradePayment(request: SubscriptionUpgradeRequest): Promise<PaymentPendingResponse> {
    this.logger.log(`=== DEBUT INITIATION PAIEMENT UPGRADE ===`);
    this.logger.log(`Request reçue:`, JSON.stringify(request, null, 2));
    this.logger.log(`userId: ${request.userId}, newSubscriptionTypeId: ${request.newSubscriptionTypeId}`);

    // Vérifier que le nouveau type d'abonnement existe
    this.logger.log(`Recherche du type d'abonnement avec ID: ${request.newSubscriptionTypeId}`);
    const newSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(request.newSubscriptionTypeId);
    this.logger.log(`Type d'abonnement trouvé:`, newSubscriptionType ? 'Oui' : 'Non');
    if (!newSubscriptionType) {
      this.logger.error(`Type d'abonnement non trouvé pour l'ID: ${request.newSubscriptionTypeId}`);
      throw new NotFoundException('Type d\'abonnement non trouvé');
    }

    // Vérifier l'abonnement actuel de l'utilisateur
    this.logger.log(`Recherche de l'abonnement actuel pour l'utilisateur: ${request.userId}`);
    const currentSubscription = await this.userSubscriptionService.getUserSubscriptionWithDetails(request.userId);
    this.logger.log(`Abonnement actuel trouvé:`, currentSubscription ? 'Oui' : 'Non');
    
    if (currentSubscription) {
      const currentLevel = currentSubscription.subscriptionType?.level || 0;
      const newLevel = newSubscriptionType.level || 1;
      this.logger.log(`Niveaux - Actuel: ${currentLevel}, Nouveau: ${newLevel}`);
      
      // Vérifier que ce n'est pas le même plan
      if (currentSubscription.subscriptionType?.id === request.newSubscriptionTypeId) {
        this.logger.error(`Tentative de sélection du même plan - ID: ${request.newSubscriptionTypeId}`);
        throw new BadRequestException('Vous êtes déjà abonné à ce plan');
      }
      
      // Permettre tous les types de changements (upgrade, downgrade, changement latéral)
      if (newLevel > currentLevel) {
        this.logger.log('Type de changement: UPGRADE');
      } else if (newLevel < currentLevel) {
        this.logger.log('Type de changement: DOWNGRADE');
      } else {
        this.logger.log('Type de changement: CHANGEMENT LATERAL (même niveau)');
      }
    }

    // Générer l'identifiant unique de transaction
    const identifier = this.payGateService.generateTransactionIdentifier(request.userId, request.newSubscriptionTypeId);
    
    // Déterminer le type de changement pour la description
    let changeType = 'Changement';
    if (currentSubscription) {
      const currentLevel = currentSubscription.subscriptionType?.level || 0;
      const newLevel = newSubscriptionType.level || 1;
      
      if (newLevel > currentLevel) {
        changeType = 'Upgrade';
      } else if (newLevel < currentLevel) {
        changeType = 'Downgrade';
      } else {
        changeType = 'Changement';
      }
    } else {
      changeType = 'Nouvel abonnement';
    }
    
    const description = `${changeType} abonnement - ${newSubscriptionType.name}`;

    // Créer la requête de paiement PayGate
    const paymentRequest: PayGatePaymentRequest = {
      amount: newSubscriptionType.price,
      description,
      identifier,
      userId: request.userId,
      subscriptionTypeId: request.newSubscriptionTypeId,
      phone: request.phone,
      network: request.network,
    };

    // Générer l'URL de redirection PayGate
    const paymentUrl = this.payGateService.generatePaymentUrl(paymentRequest);

    this.logger.log(`URL de paiement générée pour l'utilisateur ${request.userId}: ${paymentUrl}`);

    return {
      paymentUrl,
      identifier,
      amount: newSubscriptionType.price,
      description,
    };
  }

  /**
   * Initier un paiement pour un nouvel abonnement
   */
  async initiateNewSubscriptionPayment(request: SubscriptionUpgradeRequest): Promise<PaymentPendingResponse> {
    this.logger.log(`Initiation paiement nouvel abonnement - userId: ${request.userId}, subscriptionTypeId: ${request.newSubscriptionTypeId}`);

    // Vérifier que le type d'abonnement existe
    const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(request.newSubscriptionTypeId);
    if (!subscriptionType) {
      throw new NotFoundException('Type d\'abonnement non trouvé');
    }

    // Vérifier que l'utilisateur n'a pas déjà un abonnement actif
    const hasActiveSubscription = await this.userSubscriptionService.hasActiveSubscription(request.userId);
    if (hasActiveSubscription) {
      throw new BadRequestException('L\'utilisateur a déjà un abonnement actif. Utilisez la fonction d\'upgrade.');
    }

    // Générer l'identifiant unique de transaction
    const identifier = this.payGateService.generateTransactionIdentifier(request.userId, request.newSubscriptionTypeId);
    
    const description = `Nouvel abonnement - ${subscriptionType.name}`;

    // Créer la requête de paiement PayGate
    const paymentRequest: PayGatePaymentRequest = {
      amount: subscriptionType.price,
      description,
      identifier,
      userId: request.userId,
      subscriptionTypeId: request.newSubscriptionTypeId,
      phone: request.phone,
      network: request.network,
    };

    // Générer l'URL de redirection PayGate
    const paymentUrl = this.payGateService.generatePaymentUrl(paymentRequest);

    this.logger.log(`URL de paiement générée pour l'utilisateur ${request.userId}: ${paymentUrl}`);

    return {
      paymentUrl,
      identifier,
      amount: subscriptionType.price,
      description,
    };
  }

  /**
   * Traiter la confirmation de paiement depuis PayGate (webhook)
   */
  async processPaymentConfirmation(confirmationData: any) {
    this.logger.log('Traitement confirmation de paiement:', confirmationData);

    const { identifier, tx_reference, payment_reference, amount, payment_method, phone_number } = confirmationData;

    // Parser l'identifier pour extraire les informations
    const parsedData = this.payGateService.parseTransactionIdentifier(identifier);
    if (!parsedData) {
      this.logger.error(`Identifier invalide: ${identifier}`);
      throw new BadRequestException('Identifier de transaction invalide');
    }

    const { userId, subscriptionTypeId } = parsedData;

    try {
      // Vérifier le statut du paiement avec PayGate
      const paymentStatus = await this.payGateService.checkPaymentStatusByIdentifier(identifier);
      
      if (this.payGateService.interpretPaymentStatus(paymentStatus.status) === 'success') {
        // Paiement réussi, attribuer l'abonnement
        const result = await this.userSubscriptionService.upgradeSubscription(userId, subscriptionTypeId);
        
        this.logger.log(`Abonnement attribué avec succès - userId: ${userId}, subscriptionTypeId: ${subscriptionTypeId}`);
        
        return {
          success: true,
          message: 'Abonnement attribué avec succès',
          subscription: result,
          paymentDetails: {
            tx_reference,
            payment_reference,
            amount,
            payment_method,
            phone_number,
          }
        };
      } else {
        this.logger.warn(`Paiement non réussi - Status: ${paymentStatus.status}, Identifier: ${identifier}`);
        return {
          success: false,
          message: 'Paiement non confirmé',
          status: this.payGateService.interpretPaymentStatus(paymentStatus.status),
        };
      }
    } catch (error) {
      this.logger.error(`Erreur lors du traitement de la confirmation:`, error);
      throw error;
    }
  }

  /**
   * Vérifier le statut d'un paiement
   */
  async checkPaymentStatus(identifier: string) {
    try {
      const paymentStatus = await this.payGateService.checkPaymentStatusByIdentifier(identifier);
      
      return {
        identifier,
        status: this.payGateService.interpretPaymentStatus(paymentStatus.status),
        details: paymentStatus,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la vérification du statut pour ${identifier}:`, error);
      throw error;
    }
  }
} 