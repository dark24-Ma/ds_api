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
            text: `
      Bonjour ${name},

      Nous sommes ravis de vous accueillir sur DS EDUCATION !
      
      Votre inscription a été effectuée avec succès. Vous pouvez dès maintenant profiter de tous nos services.
      
      Si vous avez des questions, n'hésitez pas à nous contacter.
      
      Cordialement,
      L'équipe DS EDUCATION
    `,
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Bienvenue sur DS EDUCATION</h1>
        </div>
        
        <div style="padding: 20px; background-color: white; border-radius: 5px; margin-top: 20px;">
          <p style="color: #666;">Bonjour ${name},</p>
          
          <p style="color: #666; line-height: 1.6;">
            Nous sommes ravis de vous accueillir sur DS EDUCATION !
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; line-height: 1.6;">
              Votre inscription a été effectuée avec succès. 
              Vous pouvez dès maintenant profiter de tous nos services.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://votre-site.com/login" 
               style="background-color: #007bff; 
                      color: white; 
                      padding: 12px 25px; 
                      text-decoration: none; 
                      border-radius: 5px;
                      display: inline-block;">
              Accéder à mon compte
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Si vous avez des questions ou besoin d'aide, notre équipe de support est là pour vous aider.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
          <p>Cet e-mail a été envoyé automatiquement, merci de ne pas y répondre.</p>
          <p>© ${new Date().getFullYear()} DS EDUCATION. Tous droits réservés.</p>
        </div>
      </div>
    `,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendPasswordResetEmail(to, resetLink) {
        const mailOptions = {
            from: '"DS EDUCATION" <your-email@example.com>',
            to,
            subject: 'Réinitialisation de votre mot de passe',
            text: `
      Bonjour,

      Vous avez demandé la réinitialisation de votre mot de passe.
      
      Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :
      ${resetLink}
      
      Ce lien est valable pendant 1 heure.
      
      Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail.
      
      Cordialement,
      L'équipe de votre App
    `,
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Réinitialisation de mot de passe</h1>
        </div>
        
        <div style="padding: 20px; background-color: white; border-radius: 5px; margin-top: 20px;">
          <p style="color: #666;">Bonjour,</p>
          
          <p style="color: #666; line-height: 1.6;">
            Vous avez demandé la réinitialisation de votre mot de passe.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #007bff; 
                      color: white; 
                      padding: 12px 25px; 
                      text-decoration: none; 
                      border-radius: 5px;
                      display: inline-block;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, 
            vous pouvez ignorer cet e-mail en toute sécurité.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :
          </p>
          
          <p style="background-color: #f8f9fa; 
                    padding: 10px; 
                    border-radius: 4px; 
                    font-size: 12px;
                    word-break: break-all;">
            ${resetLink}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
          <p>Cet e-mail a été envoyé automatiquement, merci de ne pas y répondre.</p>
          <p>© ${new Date().getFullYear()} Votre App. Tous droits réservés.</p>
        </div>
      </div>
    `,
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