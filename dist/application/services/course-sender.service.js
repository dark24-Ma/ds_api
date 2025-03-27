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
exports.CourseSenderService = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const email_service_1 = require("./email.service");
const newsletter_service_1 = require("./newsletter.service");
let CourseSenderService = class CourseSenderService {
    constructor(courseService, emailService, newsletterService) {
        this.courseService = courseService;
        this.emailService = emailService;
        this.newsletterService = newsletterService;
    }
    async sendCourseToSubscribers(courseId) {
        const course = await this.courseService.getCourseById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        const subscribers = await this.newsletterService.getAllSubscribed();
        const results = [];
        for (const subscriber of subscribers) {
            try {
                await this.emailService.sendCourseEmail(subscriber.email, course.title, course.description, course.resourceUrl, course.resourceType);
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
exports.CourseSenderService = CourseSenderService;
exports.CourseSenderService = CourseSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        email_service_1.EmailService,
        newsletter_service_1.NewsletterService])
], CourseSenderService);
//# sourceMappingURL=course-sender.service.js.map