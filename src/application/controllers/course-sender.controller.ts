// src/application/controllers/course-sender.controller.ts
import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { CourseSenderService } from '../services/course-sender.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('send-course')
@UseGuards(JwtAuthGuard)
export class CourseSenderController {
  constructor(private readonly senderService: CourseSenderService) {}

  @Post(':courseId')
  async sendCourse(@Param('courseId') courseId: string) {
    return this.senderService.sendCourseToSubscribers(courseId);
  }
}
