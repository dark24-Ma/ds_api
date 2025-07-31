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
exports.BannerController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const banner_service_1 = require("../services/banner.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let BannerController = class BannerController {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    async create(createBannerDto, file) {
        if (!file) {
            throw new common_1.BadRequestException('Image de bannière requise');
        }
        const bannerData = {
            title: createBannerDto.title,
            description: createBannerDto.description,
            linkUrl: createBannerDto.linkUrl,
            targetAudience: createBannerDto.targetAudience || 'all',
            displayOrder: parseInt(createBannerDto.displayOrder) || 1,
            isActive: createBannerDto.isActive === 'true',
            startDate: createBannerDto.startDate ? new Date(createBannerDto.startDate) : undefined,
            endDate: createBannerDto.endDate ? new Date(createBannerDto.endDate) : undefined,
        };
        return this.bannerService.create(bannerData, file);
    }
    async findAll(filters) {
        const queryFilters = {
            isActive: filters.isActive !== undefined ? filters.isActive === 'true' : undefined,
            targetAudience: filters.targetAudience,
            search: filters.search,
        };
        Object.keys(queryFilters).forEach(key => queryFilters[key] === undefined && delete queryFilters[key]);
        return this.bannerService.findAll(queryFilters);
    }
    async findActiveBanners() {
        return this.bannerService.findActiveBanners();
    }
    async findOne(id) {
        return this.bannerService.findById(id);
    }
    async update(id, updateBannerDto, file) {
        const updateData = {
            title: updateBannerDto.title,
            description: updateBannerDto.description,
            linkUrl: updateBannerDto.linkUrl,
            targetAudience: updateBannerDto.targetAudience,
            displayOrder: updateBannerDto.displayOrder ? parseInt(updateBannerDto.displayOrder) : undefined,
            isActive: updateBannerDto.isActive !== undefined ? updateBannerDto.isActive === 'true' : undefined,
            startDate: updateBannerDto.startDate ? new Date(updateBannerDto.startDate) : undefined,
            endDate: updateBannerDto.endDate ? new Date(updateBannerDto.endDate) : undefined,
        };
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        return this.bannerService.update(id, updateData, file);
    }
    async remove(id) {
        await this.bannerService.delete(id);
        return { message: 'Bannière supprimée avec succès' };
    }
    async toggleStatus(id) {
        return this.bannerService.toggleStatus(id);
    }
    async trackClick(id) {
        await this.bannerService.trackClick(id);
        return { message: 'Clic enregistré' };
    }
    async trackImpression(id) {
        await this.bannerService.trackImpression(id);
        return { message: 'Impression enregistrée' };
    }
    async updateOrder(orderData) {
        await this.bannerService.updateOrder(orderData.banners);
        return { message: 'Ordre des bannières mis à jour' };
    }
};
exports.BannerController = BannerController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findActiveBanners", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/toggle-status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Post)(':id/click'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "trackClick", null);
__decorate([
    (0, common_1.Post)(':id/impression'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "trackImpression", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "updateOrder", null);
exports.BannerController = BannerController = __decorate([
    (0, common_1.Controller)('banners'),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerController);
//# sourceMappingURL=banner.controller.js.map