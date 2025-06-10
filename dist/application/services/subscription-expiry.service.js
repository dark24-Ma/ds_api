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
var SubscriptionExpiryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionExpiryService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const user_subscription_service_1 = require("./user-subscription.service");
let SubscriptionExpiryService = SubscriptionExpiryService_1 = class SubscriptionExpiryService {
    constructor(userSubscriptionService) {
        this.userSubscriptionService = userSubscriptionService;
        this.logger = new common_1.Logger(SubscriptionExpiryService_1.name);
    }
    async handleExpiredSubscriptions() {
        this.logger.log('Vérification des abonnements expirés...');
        try {
            const result = await this.userSubscriptionService.checkAndUpdateExpiredSubscriptions();
            if (result.expiredCount > 0) {
                this.logger.log(`${result.expiredCount} abonnement(s) expiré(s) mis à jour`);
            }
            else {
                this.logger.log('Aucun abonnement expiré trouvé');
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la vérification des abonnements expirés:', error);
        }
    }
    async forceCheckExpiredSubscriptions() {
        this.logger.log('Vérification manuelle des abonnements expirés...');
        return this.handleExpiredSubscriptions();
    }
};
exports.SubscriptionExpiryService = SubscriptionExpiryService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionExpiryService.prototype, "handleExpiredSubscriptions", null);
exports.SubscriptionExpiryService = SubscriptionExpiryService = SubscriptionExpiryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_subscription_service_1.UserSubscriptionService])
], SubscriptionExpiryService);
//# sourceMappingURL=subscription-expiry.service.js.map