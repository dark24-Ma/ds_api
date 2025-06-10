"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscriptionPaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPaymentService = void 0;
const common_1 = require("@nestjs/common");
const paygate_service_1 = require("./paygate.service");
const user_subscription_service_1 = require("./user-subscription.service");
const subscription_type_service_1 = require("./subscription-type.service");
let SubscriptionPaymentService = SubscriptionPaymentService_1 = class SubscriptionPaymentService {
    constructor(payGateService, userSubscriptionService, subscriptionTypeService) {
        this.payGateService = payGateService;
        this.userSubscriptionService = userSubscriptionService;
        this.subscriptionTypeService = subscriptionTypeService;
        this.logger = new common_1.Logger(SubscriptionPaymentService_1.name);
    }
    async initiateUpgradePayment(request) {
        this.logger.log(`=== DEBUT INITIATION PAIEMENT UPGRADE ===`);
        this.logger.log(`Request reçue:`, JSON.stringify(request, null, 2));
        this.logger.log(`userId: ${request.userId}, newSubscriptionTypeId: ${request.newSubscriptionTypeId}`);
        this.logger.log(`Recherche du type d'abonnement avec ID: ${request.newSubscriptionTypeId}`);
        const newSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(request.newSubscriptionTypeId);
        this.logger.log(`Type d'abonnement trouvé:`, newSubscriptionType ? 'Oui' : 'Non');
        if (!newSubscriptionType) {
            this.logger.error(`Type d'abonnement non trouvé pour l'ID: ${request.newSubscriptionTypeId}`);
            throw new common_1.NotFoundException('Type d\'abonnement non trouvé');
        }
        this.logger.log(`Recherche de l'abonnement actuel pour l'utilisateur: ${request.userId}`);
        const currentSubscription = await this.userSubscriptionService.getUserSubscriptionWithDetails(request.userId);
        this.logger.log(`Abonnement actuel trouvé:`, currentSubscription ? 'Oui' : 'Non');
        if (currentSubscription) {
            const currentLevel = currentSubscription.subscriptionType?.level || 0;
            const newLevel = newSubscriptionType.level || 1;
            this.logger.log(`Niveaux - Actuel: ${currentLevel}, Nouveau: ${newLevel}`);
            if (currentSubscription.subscriptionType?.id === request.newSubscriptionTypeId) {
                this.logger.error(`Tentative de sélection du même plan - ID: ${request.newSubscriptionTypeId}`);
                throw new common_1.BadRequestException('Vous êtes déjà abonné à ce plan');
            }
            if (newLevel > currentLevel) {
                this.logger.log('Type de changement: UPGRADE');
            }
            else if (newLevel < currentLevel) {
                this.logger.log('Type de changement: DOWNGRADE');
            }
            else {
                this.logger.log('Type de changement: CHANGEMENT LATERAL (même niveau)');
            }
        }
        const identifier = this.payGateService.generateTransactionIdentifier(request.userId, request.newSubscriptionTypeId);
        let changeType = 'Changement';
        if (currentSubscription) {
            const currentLevel = currentSubscription.subscriptionType?.level || 0;
            const newLevel = newSubscriptionType.level || 1;
            if (newLevel > currentLevel) {
                changeType = 'Upgrade';
            }
            else if (newLevel < currentLevel) {
                changeType = 'Downgrade';
            }
            else {
                changeType = 'Changement';
            }
        }
        else {
            changeType = 'Nouvel abonnement';
        }
        const description = `${changeType} abonnement - ${newSubscriptionType.name}`;
        const paymentRequest = {
            amount: newSubscriptionType.price,
            description,
            identifier,
            userId: request.userId,
            subscriptionTypeId: request.newSubscriptionTypeId,
            phone: request.phone,
            network: request.network,
        };
        const paymentUrl = this.payGateService.generatePaymentUrl(paymentRequest);
        this.logger.log(`URL de paiement générée pour l'utilisateur ${request.userId}: ${paymentUrl}`);
        return {
            paymentUrl,
            identifier,
            amount: newSubscriptionType.price,
            description,
        };
    }
    async initiateNewSubscriptionPayment(request) {
        this.logger.log(`Initiation paiement nouvel abonnement - userId: ${request.userId}, subscriptionTypeId: ${request.newSubscriptionTypeId}`);
        const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(request.newSubscriptionTypeId);
        if (!subscriptionType) {
            throw new common_1.NotFoundException('Type d\'abonnement non trouvé');
        }
        const hasActiveSubscription = await this.userSubscriptionService.hasActiveSubscription(request.userId);
        if (hasActiveSubscription) {
            throw new common_1.BadRequestException('L\'utilisateur a déjà un abonnement actif. Utilisez la fonction d\'upgrade.');
        }
        const identifier = this.payGateService.generateTransactionIdentifier(request.userId, request.newSubscriptionTypeId);
        const description = `Nouvel abonnement - ${subscriptionType.name}`;
        const paymentRequest = {
            amount: subscriptionType.price,
            description,
            identifier,
            userId: request.userId,
            subscriptionTypeId: request.newSubscriptionTypeId,
            phone: request.phone,
            network: request.network,
        };
        const paymentUrl = this.payGateService.generatePaymentUrl(paymentRequest);
        this.logger.log(`URL de paiement générée pour l'utilisateur ${request.userId}: ${paymentUrl}`);
        return {
            paymentUrl,
            identifier,
            amount: subscriptionType.price,
            description,
        };
    }
    async processPaymentConfirmation(confirmationData) {
        this.logger.log('Traitement confirmation de paiement:', confirmationData);
        const { identifier, tx_reference, payment_reference, amount, payment_method, phone_number } = confirmationData;
        const parsedData = this.payGateService.parseTransactionIdentifier(identifier);
        if (!parsedData) {
            this.logger.error(`Identifier invalide: ${identifier}`);
            throw new common_1.BadRequestException('Identifier de transaction invalide');
        }
        const { userId, subscriptionTypeId } = parsedData;
        try {
            const paymentStatus = await this.payGateService.checkPaymentStatusByIdentifier(identifier);
            if (this.payGateService.interpretPaymentStatus(paymentStatus.status) === 'success') {
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
            }
            else {
                this.logger.warn(`Paiement non réussi - Status: ${paymentStatus.status}, Identifier: ${identifier}`);
                return {
                    success: false,
                    message: 'Paiement non confirmé',
                    status: this.payGateService.interpretPaymentStatus(paymentStatus.status),
                };
            }
        }
        catch (error) {
            this.logger.error(`Erreur lors du traitement de la confirmation:`, error);
            throw error;
        }
    }
    async checkPaymentStatus(identifier) {
        try {
            const paymentStatus = await this.payGateService.checkPaymentStatusByIdentifier(identifier);
            return {
                identifier,
                status: this.payGateService.interpretPaymentStatus(paymentStatus.status),
                details: paymentStatus,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la vérification du statut pour ${identifier}:`, error);
            throw error;
        }
    }
};
exports.SubscriptionPaymentService = SubscriptionPaymentService;
exports.SubscriptionPaymentService = SubscriptionPaymentService = SubscriptionPaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [paygate_service_1.PayGateService,
        user_subscription_service_1.UserSubscriptionService,
        subscription_type_service_1.SubscriptionTypeService])
], SubscriptionPaymentService);
//# sourceMappingURL=subscription-payment.service.js.map