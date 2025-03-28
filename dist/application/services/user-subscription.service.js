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
        const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(subscriptionTypeId);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
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
        return this.formatUserSubscriptionResponse(userSubscription);
    }
    async getUserSubscription(userId) {
        const userSubscription = await this.userSubscriptionRepository.findByUserId(userId);
        if (!userSubscription) {
            throw new common_1.NotFoundException('Abonnement non trouvé');
        }
        return this.formatUserSubscriptionResponse(userSubscription);
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
};
exports.UserSubscriptionService = UserSubscriptionService;
exports.UserSubscriptionService = UserSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_subscription_repository_1.UserSubscriptionRepository,
        subscription_type_service_1.SubscriptionTypeService])
], UserSubscriptionService);
//# sourceMappingURL=user-subscription.service.js.map