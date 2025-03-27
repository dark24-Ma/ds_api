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
exports.NewsletterTemplateController = void 0;
const common_1 = require("@nestjs/common");
const newsletter_template_service_1 = require("../services/newsletter-template.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let NewsletterTemplateController = class NewsletterTemplateController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    async createTemplate(templateData) {
        return this.templateService.createTemplate(templateData);
    }
    async getAllTemplates() {
        return this.templateService.getAllTemplates();
    }
    async getTemplateById(id) {
        return this.templateService.getTemplateById(id);
    }
    async updateTemplate(id, updateData) {
        return this.templateService.updateTemplate(id, updateData);
    }
    async deleteTemplate(id) {
        return this.templateService.deleteTemplate(id);
    }
};
exports.NewsletterTemplateController = NewsletterTemplateController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsletterTemplateController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsletterTemplateController.prototype, "getAllTemplates", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsletterTemplateController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterTemplateController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsletterTemplateController.prototype, "deleteTemplate", null);
exports.NewsletterTemplateController = NewsletterTemplateController = __decorate([
    (0, common_1.Controller)('newsletter-templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [newsletter_template_service_1.NewsletterTemplateService])
], NewsletterTemplateController);
//# sourceMappingURL=newsletter-template.controller.js.map