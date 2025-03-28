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
exports.SubscriptionTypeService = void 0;
const common_1 = require("@nestjs/common");
const subscription_type_repository_1 = require("../../infrastructure/repository/subscription-type.repository");
let SubscriptionTypeService = class SubscriptionTypeService {
    constructor(subscriptionTypeRepository) {
        this.subscriptionTypeRepository = subscriptionTypeRepository;
    }
    async createSubscriptionType(subscriptionTypeData) {
        const subscriptionType = await this.subscriptionTypeRepository.create(subscriptionTypeData);
        return this.formatSubscriptionTypeResponse(subscriptionType);
    }
    async getSubscriptionTypeById(id) {
        const subscriptionType = await this.subscriptionTypeRepository.findById(id);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
        }
        return this.formatSubscriptionTypeResponse(subscriptionType);
    }
    async getAllSubscriptionTypes() {
        const subscriptionTypes = await this.subscriptionTypeRepository.findAll();
        return subscriptionTypes.map((st) => this.formatSubscriptionTypeResponse(st));
    }
    async updateSubscriptionType(id, updateData) {
        const subscriptionType = await this.subscriptionTypeRepository.update(id, updateData);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
        }
        return this.formatSubscriptionTypeResponse(subscriptionType);
    }
    async deleteSubscriptionType(id) {
        const subscriptionType = await this.subscriptionTypeRepository.delete(id);
        if (!subscriptionType) {
            throw new common_1.NotFoundException("Type d'abonnement non trouvé");
        }
        return this.formatSubscriptionTypeResponse(subscriptionType);
    }
    formatSubscriptionTypeResponse(subscriptionType) {
        return {
            id: subscriptionType._id,
            name: subscriptionType.name,
            description: subscriptionType.description,
            price: subscriptionType.price,
            duration: subscriptionType.duration,
            features: subscriptionType.features,
            createdAt: subscriptionType.createdAt,
            updatedAt: subscriptionType.updatedAt,
        };
    }
};
exports.SubscriptionTypeService = SubscriptionTypeService;
exports.SubscriptionTypeService = SubscriptionTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_type_repository_1.SubscriptionTypeRepository])
], SubscriptionTypeService);
//# sourceMappingURL=subscription-type.service.js.map