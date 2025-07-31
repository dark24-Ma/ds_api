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
exports.BannerModel = exports.BannerSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let BannerSchema = class BannerSchema {
};
exports.BannerSchema = BannerSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BannerSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BannerSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BannerSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BannerSchema.prototype, "linkUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], BannerSchema.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    __metadata("design:type", Number)
], BannerSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BannerSchema.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BannerSchema.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['all', 'clients', 'subscribers'], default: 'all' }),
    __metadata("design:type", String)
], BannerSchema.prototype, "targetAudience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BannerSchema.prototype, "clickCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BannerSchema.prototype, "impressions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BannerSchema.prototype, "createdBy", void 0);
exports.BannerSchema = BannerSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BannerSchema);
exports.BannerModel = mongoose_1.SchemaFactory.createForClass(BannerSchema);
//# sourceMappingURL=banner.schema.js.map