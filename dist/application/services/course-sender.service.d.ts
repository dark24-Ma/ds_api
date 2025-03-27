import { CourseService } from './course.service';
import { EmailService } from './email.service';
import { NewsletterService } from './newsletter.service';
export declare class CourseSenderService {
    private courseService;
    private emailService;
    private newsletterService;
    constructor(courseService: CourseService, emailService: EmailService, newsletterService: NewsletterService);
    sendCourseToSubscribers(courseId: string): Promise<{
        totalSent: number;
        totalFailed: number;
        details: any[];
    }>;
}
