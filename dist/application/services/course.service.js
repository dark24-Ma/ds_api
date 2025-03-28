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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_repository_1 = require("../../infrastructure/repository/course.repository");
const file_upload_service_1 = require("./file-upload.service");
const user_subscription_service_1 = require("./user-subscription.service");
let CourseService = class CourseService {
    constructor(courseRepository, fileUploadService, userSubscriptionService) {
        this.courseRepository = courseRepository;
        this.fileUploadService = fileUploadService;
        this.userSubscriptionService = userSubscriptionService;
    }
    async createCourse(courseData, file, thumbnail) {
        console.log('CreateCourse - File info:', file
            ? {
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
            }
            : 'No file');
        let resourceUrl = courseData.resourceUrl;
        if (courseData.resourceType !== 'link' && !file && !resourceUrl) {
            throw new common_1.BadRequestException('Un fichier ou une URL est requise pour ce type de ressource');
        }
        if (file) {
            try {
                resourceUrl = await this.fileUploadService.saveFile(file);
                console.log('File saved with path:', resourceUrl);
            }
            catch (error) {
                console.error('Error saving file:', error);
                throw new common_1.BadRequestException(`Erreur lors de l'upload du fichier: ${error.message}`);
            }
        }
        let thumbnailUrl = courseData.thumbnailUrl;
        if (thumbnail) {
            try {
                thumbnailUrl = await this.fileUploadService.saveFile(thumbnail);
                console.log('Thumbnail saved with path:', thumbnailUrl);
            }
            catch (error) {
                console.error('Error saving thumbnail:', error);
            }
        }
        const course = await this.courseRepository.create({
            ...courseData,
            resourceUrl,
            thumbnailUrl,
        });
        return this.formatCourseResponse(course);
    }
    async getCourseById(id) {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        return this.formatCourseResponse(course);
    }
    async getAllCourses() {
        const courses = await this.courseRepository.findAll();
        return courses.map((course) => this.formatCourseResponse(course));
    }
    async getCoursesForUserType(userType) {
        const courses = await this.courseRepository.findByUserType(userType);
        return courses.map((course) => this.formatCourseResponse(course));
    }
    async updateCourse(id, updateData, file, thumbnail) {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        let resourceUrl = updateData.resourceUrl || course.resourceUrl;
        let thumbnailUrl = updateData.thumbnailUrl || course.thumbnailUrl;
        if (file) {
            if (course.resourceUrl && course.resourceUrl.startsWith('/uploads/')) {
                await this.fileUploadService.removeFile(course.resourceUrl);
            }
            resourceUrl = await this.fileUploadService.saveFile(file);
        }
        if (thumbnail) {
            if (course.thumbnailUrl && course.thumbnailUrl.startsWith('/uploads/')) {
                await this.fileUploadService.removeFile(course.thumbnailUrl);
            }
            thumbnailUrl = await this.fileUploadService.saveFile(thumbnail);
        }
        const updatedCourse = await this.courseRepository.update(id, {
            ...updateData,
            resourceUrl,
            thumbnailUrl,
        });
        return this.formatCourseResponse(updatedCourse);
    }
    async deleteCourse(id) {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        if (course.resourceUrl && course.resourceUrl.startsWith('/uploads/')) {
            await this.fileUploadService.removeFile(course.resourceUrl);
        }
        if (course.thumbnailUrl && course.thumbnailUrl.startsWith('/uploads/')) {
            await this.fileUploadService.removeFile(course.thumbnailUrl);
        }
        await this.courseRepository.delete(id);
        return { message: 'Cours supprimé avec succès' };
    }
    async downloadCourse(id, userType) {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        if (course.accessibleTo.length > 0 &&
            !course.accessibleTo.includes(userType)) {
            throw new common_1.ForbiddenException("Vous n'avez pas accès à ce cours");
        }
        await this.courseRepository.incrementDownloadCount(id);
        return {
            url: course.resourceUrl,
            title: course.title,
            type: course.resourceType,
        };
    }
    async canAccessCourse(userId, courseId) {
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Cours non trouvé');
        }
        if (course.requiredSubscriptionTypes.length === 0) {
            return true;
        }
        try {
            const userSubscription = await this.userSubscriptionService.getUserSubscription(userId);
            if (userSubscription.isActive && new Date() <= userSubscription.endDate) {
                return course.requiredSubscriptionTypes.includes(userSubscription.subscriptionTypeId);
            }
        }
        catch (error) {
            return false;
        }
        return false;
    }
    formatCourseResponse(course) {
        return {
            id: course._id,
            title: course.title,
            description: course.description,
            tags: course.tags,
            resourceType: course.resourceType,
            resourceUrl: course.resourceUrl,
            thumbnailUrl: course.thumbnailUrl,
            duration: course.duration,
            accessibleTo: course.accessibleTo,
            isFeatured: course.isFeatured,
            downloadCount: course.downloadCount,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            createdBy: course.createdBy,
        };
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository,
        file_upload_service_1.FileUploadService,
        user_subscription_service_1.UserSubscriptionService])
], CourseService);
//# sourceMappingURL=course.service.js.map