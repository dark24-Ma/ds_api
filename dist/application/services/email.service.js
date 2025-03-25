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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'lirsitogo2021@gmail.com',
                pass: 'phlelzqtfdpuvalx',
            },
        });
    }
    async sendWelcomeEmail(to, name) {
        const mailOptions = {
            from: '"DS EDUCATION" <your-email@example.com>',
            to,
            subject: 'Bienvenue sur notre application !',
            text: `Bonjour ${name},\n\nMerci de vous être inscrit sur notre application !\n\nCordialement,\nL'équipe de votre application`,
            html: `<p>Bonjour ${name},</p><p>Merci de vous être inscrit sur notre application !</p><p>Cordialement,<br>L'équipe de votre application</p>`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendPasswordResetEmail(to, resetLink) {
        const mailOptions = {
            from: '"DS EDUCATION" <your-email@example.com>',
            to,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
            html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map