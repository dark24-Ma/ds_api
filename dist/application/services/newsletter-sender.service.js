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
exports.NewsletterSenderService = void 0;
const common_1 = require("@nestjs/common");
const newsletter_service_1 = require("./newsletter.service");
const newsletter_template_service_1 = require("./newsletter-template.service");
const email_service_1 = require("./email.service");
let NewsletterSenderService = class NewsletterSenderService {
    constructor(newsletterService, templateService, emailService) {
        this.newsletterService = newsletterService;
        this.templateService = templateService;
        this.emailService = emailService;
    }
    async sendNewsletter(templateId) {
        const template = await this.templateService.getTemplateById(templateId);
        if (!template) {
            throw new common_1.NotFoundException('Template non trouvé');
        }
        const subscribers = await this.newsletterService.getAllSubscribed();
        const results = [];
        for (const subscriber of subscribers) {
            try {
                await this.emailService.sendNewsletterToSubscriber(subscriber.email, template.subject, template.content);
                results.push({ email: subscriber.email, success: true });
            }
            catch (error) {
                results.push({
                    email: subscriber.email,
                    success: false,
                    error: error.message,
                });
            }
        }
        return {
            totalSent: results.filter((r) => r.success).length,
            totalFailed: results.filter((r) => !r.success).length,
            details: results,
        };
    }
};
exports.NewsletterSenderService = NewsletterSenderService;
exports.NewsletterSenderService = NewsletterSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService,
        newsletter_template_service_1.NewsletterTemplateService,
        email_service_1.EmailService])
], NewsletterSenderService);
//# sourceMappingURL=newsletter-sender.service.js.map