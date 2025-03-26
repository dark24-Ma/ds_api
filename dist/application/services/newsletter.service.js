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
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const newsletter_repository_1 = require("../../infrastructure/repository/newsletter.repository");
const email_service_1 = require("./email.service");
let NewsletterService = class NewsletterService {
    constructor(newsletterRepository, emailService) {
        this.newsletterRepository = newsletterRepository;
        this.emailService = emailService;
    }
    async subscribe(email) {
        const existing = await this.newsletterRepository.findByEmail(email);
        if (existing && existing.isSubscribed) {
            throw new common_1.ConflictException('Cette adresse email est déjà inscrite à la newsletter');
        }
        await this.newsletterRepository.subscribe(email);
        await this.sendWelcomeNewsletter(email);
    }
    async unsubscribe(email) {
        const newsletter = await this.newsletterRepository.unsubscribe(email);
        if (!newsletter) {
            throw new common_1.NotFoundException('Adresse email non trouvée');
        }
    }
    async sendWelcomeNewsletter(email) {
        await this.emailService.sendNewsletterWelcome(email);
    }
    async getAllSubscribed() {
        const newsletters = await this.newsletterRepository.getAllSubscribed();
        return newsletters.map((n) => n.email);
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [newsletter_repository_1.NewsletterRepository,
        email_service_1.EmailService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map