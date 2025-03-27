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
exports.NewsletterSenderController = void 0;
const common_1 = require("@nestjs/common");
const newsletter_sender_service_1 = require("../services/newsletter-sender.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let NewsletterSenderController = class NewsletterSenderController {
    constructor(senderService) {
        this.senderService = senderService;
    }
    async sendNewsletter(templateId) {
        return this.senderService.sendNewsletter(templateId);
    }
};
exports.NewsletterSenderController = NewsletterSenderController;
__decorate([
    (0, common_1.Post)(':templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsletterSenderController.prototype, "sendNewsletter", null);
exports.NewsletterSenderController = NewsletterSenderController = __decorate([
    (0, common_1.Controller)('send-newsletter'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [newsletter_sender_service_1.NewsletterSenderService])
], NewsletterSenderController);
//# sourceMappingURL=newsletter-send.controller.js.map