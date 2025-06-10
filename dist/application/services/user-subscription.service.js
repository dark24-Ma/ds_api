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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const user_subscription_repository_1 = require("../../infrastructure/repository/user-subscription.repository");
const subscription_type_service_1 = require("./subscription-type.service");
let UserSubscriptionService = class UserSubscriptionService {
    constructor(userSubscriptionRepository, subscriptionTypeService) {
        this.userSubscriptionRepository = userSubscriptionRepository;
        this.subscriptionTypeService = subscriptionTypeService;
    }
    async subscribeUser(userId, subscriptionTypeId) {
        console.log(`[subscribeUser] Attribution abonnement - userId: ${userId}, subscriptionTypeId: ${subscriptionTypeId}`);
        const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(subscriptionTypeId);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
        }
        console.log(`[subscribeUser] Type d'abonnement trouvé:`, subscriptionType);
        const existingActiveSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (existingActiveSubscription && existingActiveSubscription.isActive &&
            new Date(existingActiveSubscription.endDate) > new Date()) {
            const suggestions = await this.getSubscriptionSuggestions(userId, subscriptionTypeId);
            throw new common_1.BadRequestException({
                message: "L'utilisateur a déjà un abonnement actif",
                suggestions: suggestions
            });
        }
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + subscriptionType.duration);
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
    async getSubscriptionSuggestions(userId, requestedSubscriptionTypeId) {
        const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (!currentSubscription || !currentSubscription.isActive) {
            return null;
        }
        const currentSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(currentSubscription.subscriptionTypeId.toString());
        const requestedSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(requestedSubscriptionTypeId);
        const allSubscriptionTypes = await this.subscriptionTypeService.getAllSubscriptionTypes();
        const nextLevelType = allSubscriptionTypes.find(type => type.level === currentSubscriptionType.level + 1);
        return {
            currentSubscription: {
                id: currentSubscription._id.toString(),
                type: currentSubscriptionType,
                endDate: currentSubscription.endDate
            },
            suggestions: [
                {
                    type: 'extend',
                    title: 'Prolonger votre abonnement actuel',
                    description: `Ajouter 30 jours à votre abonnement "${currentSubscriptionType.name}"`,
                    subscriptionType: currentSubscriptionType,
                    newEndDate: this.addDaysToDate(new Date(currentSubscription.endDate), 30)
                },
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
    addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    async getUserSubscription(userId) {
        console.log(`[getUserSubscription] Recherche abonnement pour userId: ${userId}`);
        const userSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        console.log(`[getUserSubscription] Abonnement trouvé:`, userSubscription);
        if (!userSubscription) {
            console.log(`[getUserSubscription] Aucun abonnement trouvé pour userId: ${userId}`);
            throw new common_1.NotFoundException('Abonnement non trouvé');
        }
        return this.formatUserSubscriptionResponse(userSubscription);
    }
    async getUserSubscriptionWithDetails(userId) {
        console.log(`[getUserSubscriptionWithDetails] Recherche abonnement avec détails pour userId: ${userId}`);
        let userSubscription = await this.userSubscriptionRepository.findActiveByUserId(userId);
        console.log(`[getUserSubscriptionWithDetails] Abonnement actif trouvé:`, userSubscription);
        if (!userSubscription) {
            console.log(`[getUserSubscriptionWithDetails] Aucun abonnement actif, recherche du dernier abonnement`);
            userSubscription = await this.userSubscriptionRepository.findByUserId(userId);
            console.log(`[getUserSubscriptionWithDetails] Dernier abonnement trouvé:`, userSubscription);
        }
        if (!userSubscription) {
            console.log(`[getUserSubscriptionWithDetails] Aucun abonnement trouvé pour userId: ${userId}`);
            return null;
        }
        let subscriptionTypeInfo = null;
        try {
            subscriptionTypeInfo =
                await this.subscriptionTypeService.getSubscriptionTypeById(userSubscription.subscriptionTypeId.toString());
        }
        catch (error) {
            console.error(`Erreur lors de la récupération du type d'abonnement: ${error.message}`);
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
    calculateSubscriptionStatus(subscription) {
        const now = new Date();
        const endDate = new Date(subscription.endDate);
        if (!subscription.isActive) {
            if (endDate < now) {
                return 'expired';
            }
            return 'cancelled';
        }
        if (endDate < now) {
            return 'expired';
        }
        return 'active';
    }
    async getAllSubscriptions() {
        const subscriptions = await this.userSubscriptionRepository.findAll();
        const formattedSubscriptions = await Promise.all(subscriptions.map(async (subscription) => {
            let subscriptionTypeInfo = null;
            try {
                subscriptionTypeInfo =
                    await this.subscriptionTypeService.getSubscriptionTypeById(subscription.subscriptionTypeId.toString());
            }
            catch (error) {
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
            };
        }));
        return formattedSubscriptions;
    }
    formatUserSubscriptionResponse(userSubscription) {
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
    async hasActiveSubscription(userId) {
        try {
            const subscription = await this.userSubscriptionRepository.findActiveByUserId(userId);
            if (!subscription) {
                return false;
            }
            const isActive = subscription.isActive && new Date() <= subscription.endDate;
            return isActive;
        }
        catch (error) {
            console.error(`Erreur lors de la vérification de l'abonnement pour l'utilisateur ${userId}:`, error);
            return false;
        }
    }
    async expireSubscription(subscriptionId) {
        const subscription = await this.userSubscriptionRepository.findById(subscriptionId);
        if (!subscription) {
            throw new common_1.NotFoundException('Abonnement non trouvé');
        }
        const updatedSubscription = await this.userSubscriptionRepository.updateById(subscriptionId, {
            isActive: false,
            updatedAt: new Date()
        });
        return this.formatUserSubscriptionResponse(updatedSubscription);
    }
    async cancelSubscription(subscriptionId) {
        const subscription = await this.userSubscriptionRepository.findById(subscriptionId);
        if (!subscription) {
            throw new common_1.NotFoundException('Abonnement non trouvé');
        }
        const updatedSubscription = await this.userSubscriptionRepository.updateById(subscriptionId, {
            isActive: false,
            updatedAt: new Date()
        });
        return this.formatUserSubscriptionResponse(updatedSubscription);
    }
    async checkAndUpdateExpiredSubscriptions() {
        const activeSubscriptions = await this.userSubscriptionRepository.findActiveSubscriptions();
        const now = new Date();
        const expiredSubscriptions = [];
        for (const subscription of activeSubscriptions) {
            if (subscription.endDate < now) {
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
    async renewSubscription(userId, subscriptionTypeId) {
        const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(subscriptionTypeId);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
        }
        const existingSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (existingSubscription) {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + subscriptionType.duration);
            const updatedSubscription = await this.userSubscriptionRepository.updateById(existingSubscription._id.toString(), {
                subscriptionTypeId,
                startDate,
                endDate,
                isActive: true,
                updatedAt: new Date()
            });
            return this.formatUserSubscriptionResponse(updatedSubscription);
        }
        else {
            return this.subscribeUser(userId, subscriptionTypeId);
        }
    }
    async extendSubscription(userId, additionalDays = 30) {
        const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (!currentSubscription) {
            throw new common_1.NotFoundException('Aucun abonnement trouvé pour cet utilisateur');
        }
        if (!currentSubscription.isActive) {
            throw new common_1.BadRequestException('L\'abonnement actuel n\'est pas actif');
        }
        const newEndDate = this.addDaysToDate(new Date(currentSubscription.endDate), additionalDays);
        const updatedSubscription = await this.userSubscriptionRepository.updateById(currentSubscription._id.toString(), {
            endDate: newEndDate,
            updatedAt: new Date()
        });
        return this.formatUserSubscriptionResponse(updatedSubscription);
    }
    async upgradeSubscription(userId, newSubscriptionTypeId) {
        const currentSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (!currentSubscription) {
            throw new common_1.NotFoundException('Aucun abonnement trouvé pour cet utilisateur');
        }
        if (!currentSubscription.isActive) {
            throw new common_1.BadRequestException('L\'abonnement actuel n\'est pas actif');
        }
        const newSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(newSubscriptionTypeId);
        if (!newSubscriptionType) {
            throw new common_1.NotFoundException('Type d\'abonnement non trouvé');
        }
        const currentSubscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(currentSubscription.subscriptionTypeId.toString());
        if (newSubscriptionType.level <= currentSubscriptionType.level) {
            throw new common_1.BadRequestException('Le nouveau plan doit être de niveau supérieur');
        }
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + newSubscriptionType.duration);
        const updatedSubscription = await this.userSubscriptionRepository.updateById(currentSubscription._id.toString(), {
            subscriptionTypeId: newSubscriptionTypeId,
            startDate: startDate,
            endDate: endDate,
            updatedAt: new Date()
        });
        return this.formatUserSubscriptionResponse(updatedSubscription);
    }
    async getUserSubscriptionHistory(userId) {
        console.log(`[getUserSubscriptionHistory] Récupération historique pour userId: ${userId}`);
        const subscriptions = await this.userSubscriptionRepository.findAllByUserId(userId);
        console.log(`[getUserSubscriptionHistory] ${subscriptions.length} abonnements trouvés`);
        const formattedSubscriptions = await Promise.all(subscriptions.map(async (subscription) => {
            let subscriptionTypeInfo = null;
            try {
                subscriptionTypeInfo = await this.subscriptionTypeService.getSubscriptionTypeById(subscription.subscriptionTypeId.toString());
            }
            catch (error) {
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
        }));
        return formattedSubscriptions;
    }
};
exports.UserSubscriptionService = UserSubscriptionService;
exports.UserSubscriptionService = UserSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_subscription_repository_1.UserSubscriptionRepository,
        subscription_type_service_1.SubscriptionTypeService])
], UserSubscriptionService);
//# sourceMappingURL=user-subscription.service.js.map