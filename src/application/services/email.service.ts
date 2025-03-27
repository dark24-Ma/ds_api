import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

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

  async sendWelcomeEmail(to: string, name: string) {
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

  async sendPasswordResetEmail(to: string, resetLink: string) {
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
          <p>© ${new Date().getFullYear()} DS EDUCATION. Tous droits réservés.</p>
        </div>
      </div>
    `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendNewsletterWelcome(to: string) {
    const mailOptions = {
      from: '"DS EDUCATION" <lirsitogo2021@gmail.com>',
      to,
      subject: 'Bienvenue à notre Newsletter !',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Merci de votre inscription !</h1>
        </div>
        
        <div style="padding: 20px; background-color: white; border-radius: 5px; margin-top: 20px;">
          <p style="color: #666;">Bonjour,</p>
          
          <p style="color: #666; line-height: 1.6;">
            Merci de vous être inscrit à notre newsletter. Vous recevrez désormais nos dernières actualités et mises à jour.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Pour vous désabonner, cliquez sur ce lien : 
            <a href="http://votre-site.com/unsubscribe?email=${to}">Se désabonner</a>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} DS EDUCATION. Tous droits réservés.</p>
        </div>
      </div>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email de bienvenue newsletter envoyé avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      throw new Error(
        "Erreur lors de l'envoi de l'email de bienvenue newsletter",
      );
    }
  }

  async sendNewsletterToSubscriber(
    to: string,
    subject: string,
    htmlContent: string,
  ) {
    const mailOptions = {
      from: '"DS EDUCATION" <lirsitogo2021@gmail.com>',
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Newsletter envoyée avec succès à ${to}`);
    } catch (error) {
      console.error(`Erreur lors de l'envoi de la newsletter à ${to}:`, error);
      throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
    }
  }
}
