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
exports.BannerRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BannerRepository = class BannerRepository {
    constructor(bannerModel) {
        this.bannerModel = bannerModel;
    }
    async create(bannerData) {
        const newBanner = new this.bannerModel(bannerData);
        return newBanner.save();
    }
    async findAll(filters) {
        const query = this.bannerModel.find();
        if (filters) {
            if (filters.isActive !== undefined) {
                query.where('isActive', filters.isActive);
            }
            if (filters.targetAudience) {
                query.where('targetAudience', filters.targetAudience);
            }
            if (filters.search) {
                query.where({
                    $or: [
                        { title: { $regex: filters.search, $options: 'i' } },
                        { description: { $regex: filters.search, $options: 'i' } }
                    ]
                });
            }
        }
        return query.sort({ displayOrder: 1, createdAt: -1 }).exec();
    }
    async findActiveBanners() {
        const now = new Date();
        return this.bannerModel.find({
            isActive: true,
            $and: [
                {
                    $or: [
                        { startDate: { $exists: false } },
                        { startDate: { $lte: now } }
                    ]
                },
                {
                    $or: [
                        { endDate: { $exists: false } },
                        { endDate: { $gte: now } }
                    ]
                }
            ]
        }).sort({ displayOrder: 1 }).exec();
    }
    async findById(id) {
        return this.bannerModel.findById(id).exec();
    }
    async update(id, updateData) {
        return this.bannerModel.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true }).exec();
    }
    async delete(id) {
        await this.bannerModel.findByIdAndDelete(id).exec();
    }
    async toggleStatus(id) {
        const banner = await this.findById(id);
        if (!banner) {
            throw new Error('Banner not found');
        }
        return this.update(id, { isActive: !banner.isActive });
    }
    async trackClick(id) {
        await this.bannerModel.findByIdAndUpdate(id, { $inc: { clickCount: 1 } }).exec();
    }
    async trackImpression(id) {
        await this.bannerModel.findByIdAndUpdate(id, { $inc: { impressions: 1 } }).exec();
    }
    async updateOrder(banners) {
        const updates = banners.map(banner => ({
            updateOne: {
                filter: { _id: banner.id },
                update: { displayOrder: banner.displayOrder }
            }
        }));
        await this.bannerModel.bulkWrite(updates);
    }
};
exports.BannerRepository = BannerRepository;
exports.BannerRepository = BannerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Banner')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BannerRepository);
//# sourceMappingURL=banner.repository.js.map