import { CourseSenderService } from '../services/course-sender.service';
export declare class CourseSenderController {
    private readonly senderService;
    constructor(senderService: CourseSenderService);
    sendCourse(courseId: string): Promise<{
        totalSent: number;
        totalFailed: number;
        details: any[];
    }>;
}
