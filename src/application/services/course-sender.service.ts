// src/application/services/course-sender.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { EmailService } from './email.service';
import { NewsletterService } from './newsletter.service';

@Injectable()
export class CourseSenderService {
  constructor(
    private courseService: CourseService,
    private emailService: EmailService,
    private newsletterService: NewsletterService,
  ) {}

  async sendCourseToSubscribers(courseId: string) {
    // Récupérer le cours
    const course = await this.courseService.getCourseById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Récupérer tous les abonnés
    const subscribers = await this.newsletterService.getAllSubscribed();

    // Envoyer l'email à chaque abonné
    const results = [];
    for (const subscriber of subscribers) {
      try {
        await this.emailService.sendCourseEmail(
          subscriber.email,
          course.title,
          course.description,
          course.resourceUrl,
          course.resourceType,
        );
        results.push({ email: subscriber.email, success: true });
      } catch (error) {
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
}
