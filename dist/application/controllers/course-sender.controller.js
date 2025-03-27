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
exports.CourseSenderController = void 0;
const common_1 = require("@nestjs/common");
const course_sender_service_1 = require("../services/course-sender.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let CourseSenderController = class CourseSenderController {
    constructor(senderService) {
        this.senderService = senderService;
    }
    async sendCourse(courseId) {
        return this.senderService.sendCourseToSubscribers(courseId);
    }
};
exports.CourseSenderController = CourseSenderController;
__decorate([
    (0, common_1.Post)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseSenderController.prototype, "sendCourse", null);
exports.CourseSenderController = CourseSenderController = __decorate([
    (0, common_1.Controller)('send-course'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [course_sender_service_1.CourseSenderService])
], CourseSenderController);
//# sourceMappingURL=course-sender.controller.js.map