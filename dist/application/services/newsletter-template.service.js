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
exports.NewsletterTemplateService = void 0;
const common_1 = require("@nestjs/common");
const newsletter_template_repository_1 = require("../../infrastructure/repository/newsletter-template.repository");
let NewsletterTemplateService = class NewsletterTemplateService {
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async createTemplate(templateData) {
        const template = await this.templateRepository.create(templateData);
        return {
            id: template._id,
            name: template.name,
            subject: template.subject,
            content: template.content,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
        };
    }
    async getTemplateById(id) {
        const template = await this.templateRepository.findById(id);
        if (!template) {
            throw new common_1.NotFoundException('Template non trouvé');
        }
        return {
            id: template._id,
            name: template.name,
            subject: template.subject,
            content: template.content,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
        };
    }
    async getAllTemplates() {
        const templates = await this.templateRepository.findAll();
        return templates.map((template) => ({
            id: template._id,
            name: template.name,
            subject: template.subject,
            content: template.content,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
        }));
    }
    async updateTemplate(id, updateData) {
        const template = await this.templateRepository.update(id, updateData);
        if (!template) {
            throw new common_1.NotFoundException('Template non trouvé');
        }
        return {
            id: template._id,
            name: template.name,
            subject: template.subject,
            content: template.content,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
        };
    }
    async deleteTemplate(id) {
        const template = await this.templateRepository.delete(id);
        if (!template) {
            throw new common_1.NotFoundException('Template non trouvé');
        }
        return { message: 'Template supprimé avec succès' };
    }
};
exports.NewsletterTemplateService = NewsletterTemplateService;
exports.NewsletterTemplateService = NewsletterTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [newsletter_template_repository_1.NewsletterTemplateRepository])
], NewsletterTemplateService);
//# sourceMappingURL=newsletter-template.service.js.map