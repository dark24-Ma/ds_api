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
exports.UserSubscriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserSubscriptionRepository = class UserSubscriptionRepository {
    constructor(userSubscriptionModel) {
        this.userSubscriptionModel = userSubscriptionModel;
    }
    async create(userSubscriptionData) {
        const userSubscription = new this.userSubscriptionModel(userSubscriptionData);
        return userSubscription.save();
    }
    async findByUserId(userId) {
        return this.userSubscriptionModel.findOne({ userId }).exec();
    }
    async update(userId, updateData) {
        return this.userSubscriptionModel
            .findOneAndUpdate({ userId }, updateData, { new: true })
            .exec();
    }
    async delete(userId) {
        return this.userSubscriptionModel.findOneAndDelete({ userId }).exec();
    }
    async getActiveSubscriptions() {
        return this.userSubscriptionModel
            .find({ isActive: true, endDate: { $gte: new Date() } })
            .exec();
    }
    async findAll() {
        return this.userSubscriptionModel.find().exec();
    }
    async findWithPagination(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.userSubscriptionModel.find().skip(skip).limit(limit).exec();
    }
    async count() {
        return this.userSubscriptionModel.countDocuments().exec();
    }
};
exports.UserSubscriptionRepository = UserSubscriptionRepository;
exports.UserSubscriptionRepository = UserSubscriptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('UserSubscription')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserSubscriptionRepository);
//# sourceMappingURL=user-subscription.repository.js.map