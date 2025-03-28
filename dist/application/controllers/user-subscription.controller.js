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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const user_subscription_service_1 = require("../services/user-subscription.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let UserSubscriptionController = class UserSubscriptionController {
    constructor(userSubscriptionService) {
        this.userSubscriptionService = userSubscriptionService;
    }
    async subscribeUser(body) {
        return this.userSubscriptionService.subscribeUser(body.userId, body.subscriptionTypeId);
    }
    async getUserSubscription(userId) {
        return this.userSubscriptionService.getUserSubscription(userId);
    }
    async getAllSubscriptions() {
        return this.userSubscriptionService.getAllSubscriptions();
    }
};
exports.UserSubscriptionController = UserSubscriptionController;
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSubscriptionController.prototype, "subscribeUser", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserSubscriptionController.prototype, "getUserSubscription", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserSubscriptionController.prototype, "getAllSubscriptions", null);
exports.UserSubscriptionController = UserSubscriptionController = __decorate([
    (0, common_1.Controller)('user-subscriptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_subscription_service_1.UserSubscriptionService])
], UserSubscriptionController);
//# sourceMappingURL=user-subscription.controller.js.map