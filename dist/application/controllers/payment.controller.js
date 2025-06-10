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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const subscription_payment_service_1 = require("../services/subscription-payment.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let PaymentController = class PaymentController {
    constructor(subscriptionPaymentService) {
        this.subscriptionPaymentService = subscriptionPaymentService;
    }
    async initiateUpgradePayment(request) {
        return this.subscriptionPaymentService.initiateUpgradePayment(request);
    }
    async initiateNewSubscriptionPayment(request) {
        return this.subscriptionPaymentService.initiateNewSubscriptionPayment(request);
    }
    async handlePaymentConfirmation(confirmationData) {
        return this.subscriptionPaymentService.processPaymentConfirmation(confirmationData);
    }
    async checkPaymentStatus(identifier) {
        return this.subscriptionPaymentService.checkPaymentStatus(identifier);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('subscription/upgrade'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiateUpgradePayment", null);
__decorate([
    (0, common_1.Post)('subscription/new'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiateNewSubscriptionPayment", null);
__decorate([
    (0, common_1.Post)('webhook/confirmation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handlePaymentConfirmation", null);
__decorate([
    (0, common_1.Get)('status/:identifier'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkPaymentStatus", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [subscription_payment_service_1.SubscriptionPaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map