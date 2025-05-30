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
exports.SubscriptionTypeController = void 0;
const common_1 = require("@nestjs/common");
const subscription_type_service_1 = require("../services/subscription-type.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let SubscriptionTypeController = class SubscriptionTypeController {
    constructor(subscriptionTypeService) {
        this.subscriptionTypeService = subscriptionTypeService;
    }
    async createSubscriptionType(subscriptionTypeData) {
        try {
            return await this.subscriptionTypeService.createSubscriptionType(subscriptionTypeData);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllSubscriptionTypes() {
        try {
            return await this.subscriptionTypeService.getAllSubscriptionTypes();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getSubscriptionTypeById(id) {
        try {
            const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(id);
            if (!subscriptionType) {
                throw new common_1.NotFoundException("Type d'abonnement non trouvé");
            }
            return subscriptionType;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateSubscriptionType(id, updateData) {
        try {
            const updatedSubscriptionType = await this.subscriptionTypeService.updateSubscriptionType(id, updateData);
            if (!updatedSubscriptionType) {
                throw new common_1.NotFoundException("Type d'abonnement non trouvé");
            }
            return updatedSubscriptionType;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteSubscriptionType(id) {
        try {
            const deletedSubscriptionType = await this.subscriptionTypeService.deleteSubscriptionType(id);
            if (!deletedSubscriptionType) {
                throw new common_1.NotFoundException("Type d'abonnement non trouvé");
            }
            return { message: "Type d'abonnement supprimé avec succès" };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.SubscriptionTypeController = SubscriptionTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionTypeController.prototype, "createSubscriptionType", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionTypeController.prototype, "getAllSubscriptionTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionTypeController.prototype, "getSubscriptionTypeById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionTypeController.prototype, "updateSubscriptionType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionTypeController.prototype, "deleteSubscriptionType", null);
exports.SubscriptionTypeController = SubscriptionTypeController = __decorate([
    (0, common_1.Controller)('subscription-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [subscription_type_service_1.SubscriptionTypeService])
], SubscriptionTypeController);
//# sourceMappingURL=subscription-type.controller.js.map