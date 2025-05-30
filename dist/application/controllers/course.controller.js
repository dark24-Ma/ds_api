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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const course_service_1 = require("../services/course.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const user_type_enum_1 = require("../../domain/enums/user-type.enum");
const path = require("path");
const fs = require("fs");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(courseData, files, req) {
        try {
            if (req.user && req.user.userId) {
                courseData.createdBy = req.user.userId;
            }
            const file = files?.file?.[0];
            const thumbnail = files?.thumbnail?.[0];
            console.log('File received:', file
                ? {
                    filename: file.filename,
                    path: file.path,
                    mimetype: file.mimetype,
                }
                : 'No');
            return await this.courseService.createCourse(courseData, file, thumbnail);
        }
        catch (error) {
            console.error('Error in createCourse controller:', error);
            throw new common_1.BadRequestException(`Erreur lors de la création du cours: ${error.message}`);
        }
    }
    async getAllCourses() {
        return this.courseService.getAllCourses();
    }
    async getFreeCourses() {
        return this.courseService.getFreeCourses();
    }
    async getCoursesByUserType(userType) {
        return this.courseService.getCoursesForUserType(userType);
    }
    async getCourseById(id) {
        return this.courseService.getCourseById(id);
    }
    async updateCourse(id, updateData, files) {
        return this.courseService.updateCourse(id, updateData, files.file ? files.file[0] : null, files.thumbnail ? files.thumbnail[0] : null);
    }
    async deleteCourse(id) {
        return this.courseService.deleteCourse(id);
    }
    async downloadCourse(id, req) {
        if (req.user && req.user.userType) {
            return this.courseService.downloadCourse(id, req.user.userType);
        }
        return this.courseService.downloadFreeCourse(id);
    }
    async viewCourse(id, req, res) {
        try {
            const userType = req.user?.userType || null;
            const courseData = await this.courseService.getCourseForViewing(id, userType);
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            if (courseData.type === 'pdf') {
                return res.sendFile(courseData.filePath, {
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                });
            }
            if (courseData.type === 'video') {
                const stat = await fs.promises.stat(courseData.filePath);
                const fileSize = stat.size;
                const range = req.headers.range;
                if (range) {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = (end - start) + 1;
                    const file = fs.createReadStream(courseData.filePath, { start, end });
                    res.writeHead(206, {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4',
                    });
                    return file.pipe(res);
                }
                else {
                    res.writeHead(200, {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                    });
                    return fs.createReadStream(courseData.filePath).pipe(res);
                }
            }
            return res.status(400).json({ message: "Type de ressource non supporté" });
        }
        catch (error) {
            console.error('Erreur lors de la visualisation du cours:', error);
            return res.status(error.status || 500).json({
                message: error.message || 'Erreur lors de la visualisation du cours'
            });
        }
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const extension = path.extname(file.originalname);
                cb(null, `${uniqueSuffix}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)('free-access'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getFreeCourses", null);
__decorate([
    (0, common_1.Get)('type/:userType'),
    __param(0, (0, common_1.Param)('userType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesByUserType", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "downloadCourse", null);
__decorate([
    (0, common_1.Get)(':id/view'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "viewCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map