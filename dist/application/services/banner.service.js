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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const banner_repository_1 = require("../../infrastructure/repository/banner.repository");
const fs = require("fs");
const path = require("path");
let BannerService = class BannerService {
    constructor(bannerRepository) {
        this.bannerRepository = bannerRepository;
    }
    async create(bannerData, imageFile) {
        if (imageFile) {
            bannerData.imageUrl = await this.saveImage(imageFile);
        }
        const banner = await this.bannerRepository.create(bannerData);
        return this.mapToEntity(banner);
    }
    async findAll(filters) {
        const banners = await this.bannerRepository.findAll(filters);
        return banners.map(banner => this.mapToEntity(banner));
    }
    async findActiveBanners() {
        const banners = await this.bannerRepository.findActiveBanners();
        return banners.map(banner => this.mapToEntity(banner));
    }
    async findById(id) {
        const banner = await this.bannerRepository.findById(id);
        if (!banner) {
            throw new common_1.NotFoundException('Bannière non trouvée');
        }
        return this.mapToEntity(banner);
    }
    async update(id, updateData, imageFile) {
        const existingBanner = await this.bannerRepository.findById(id);
        if (!existingBanner) {
            throw new common_1.NotFoundException('Bannière non trouvée');
        }
        if (imageFile) {
            if (existingBanner.imageUrl) {
                await this.deleteImage(existingBanner.imageUrl);
            }
            updateData.imageUrl = await this.saveImage(imageFile);
        }
        const updatedBanner = await this.bannerRepository.update(id, updateData);
        return this.mapToEntity(updatedBanner);
    }
    async delete(id) {
        const banner = await this.bannerRepository.findById(id);
        if (!banner) {
            throw new common_1.NotFoundException('Bannière non trouvée');
        }
        if (banner.imageUrl) {
            await this.deleteImage(banner.imageUrl);
        }
        await this.bannerRepository.delete(id);
    }
    async toggleStatus(id) {
        const banner = await this.bannerRepository.toggleStatus(id);
        if (!banner) {
            throw new common_1.NotFoundException('Bannière non trouvée');
        }
        return this.mapToEntity(banner);
    }
    async trackClick(id) {
        const banner = await this.bannerRepository.findById(id);
        if (!banner) {
            return;
        }
        await this.bannerRepository.trackClick(id);
    }
    async trackImpression(id) {
        const banner = await this.bannerRepository.findById(id);
        if (!banner) {
            return;
        }
        await this.bannerRepository.trackImpression(id);
    }
    async updateOrder(banners) {
        await this.bannerRepository.updateOrder(banners);
    }
    async saveImage(file) {
        return file.filename;
    }
    async deleteImage(filename) {
        try {
            const filepath = path.join(process.cwd(), 'uploads', filename);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error);
        }
    }
    mapToEntity(document) {
        return {
            id: document._id.toString(),
            title: document.title,
            description: document.description,
            imageUrl: document.imageUrl,
            linkUrl: document.linkUrl,
            isActive: document.isActive,
            displayOrder: document.displayOrder,
            startDate: document.startDate,
            endDate: document.endDate,
            targetAudience: document.targetAudience,
            clickCount: document.clickCount,
            impressions: document.impressions,
            createdBy: document.createdBy,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [banner_repository_1.BannerRepository])
], BannerService);
//# sourceMappingURL=banner.service.js.map