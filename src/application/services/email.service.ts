import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true, // true pour 465, false pour d'autres ports
      auth: {
        user: 'lirsitogo2021@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'phlelzqtfdpuvalx', // Remplacez par votre mot de passe
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: '"DS EDUCATION" <your-email@example.com>', // Adresse de l'expéditeur
      to,
      subject: 'Bienvenue sur notre application !',
      text: `Bonjour ${name},\n\nMerci de vous être inscrit sur notre application !\n\nCordialement,\nL'équipe de votre application`,
      html: `<p>Bonjour ${name},</p><p>Merci de vous être inscrit sur notre application !</p><p>Cordialement,<br>L'équipe de votre application</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  // src/application/services/email.service.ts
  async sendPasswordResetEmail(to: string, resetLink: string) {
    const mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
      html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
