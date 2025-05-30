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
exports.NewsletterRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let NewsletterRepository = class NewsletterRepository {
    constructor(newsletterModel) {
        this.newsletterModel = newsletterModel;
    }
    async subscribe(email) {
        const newsletter = new this.newsletterModel({
            email,
            isSubscribed: true,
            subscribedAt: new Date(),
        });
        return newsletter.save();
    }
    async unsubscribe(email) {
        return this.newsletterModel
            .findOneAndUpdate({ email }, {
            isSubscribed: false,
            unsubscribedAt: new Date(),
        }, { new: true })
            .exec();
    }
    async findByEmail(email) {
        return this.newsletterModel.findOne({ email }).exec();
    }
    async getAllSubscribed() {
        return this.newsletterModel.find({ isSubscribed: true }).exec();
    }
};
exports.NewsletterRepository = NewsletterRepository;
exports.NewsletterRepository = NewsletterRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Newsletter')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewsletterRepository);
//# sourceMappingURL=newsletter.repository.js.map