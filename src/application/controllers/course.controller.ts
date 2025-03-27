// src/application/controllers/course.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  //   ParseFilePipe,
  //   Optional,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseService, UploadedFile } from '../services/course.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { ResourceType } from '../../infrastructure/repository/course.schema';
// import { ResourceType } from 'src/infrastructure/course.schema';
import { UserType } from '../../domain/enums/user-type.enum';
import * as path from 'path';
// import { UploadedFile } from '../../types/uploaded-file.interface';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = path.extname(file.originalname);
            cb(null, `${uniqueSuffix}${extension}`);
          },
        }),
      },
    ),
  )
  async createCourse(
    @Body() courseData: any,
    @UploadedFiles()
    files: { file?: UploadedFile[]; thumbnail?: UploadedFile[] },
    @Request() req,
  ) {
    try {
      // Ajouter l'ID de l'utilisateur créateur si disponible
      if (req.user && req.user.userId) {
        courseData.createdBy = req.user.userId;
      }

      const file = files?.file?.[0];
      const thumbnail = files?.thumbnail?.[0];

      // Log détaillé pour le debug
      console.log(
        'File received:',
        file
          ? {
              filename: file.filename,
              path: file.path,
              mimetype: file.mimetype,
            }
          : 'No',
      );

      return await this.courseService.createCourse(courseData, file, thumbnail);
    } catch (error) {
      console.error('Error in createCourse controller:', error);
      throw new BadRequestException(
        `Erreur lors de la création du cours: ${error.message}`,
      );
    }
  }

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get('type/:userType')
  async getCoursesByUserType(@Param('userType') userType: UserType) {
    return this.courseService.getCoursesForUserType(userType);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  async updateCourse(
    @Param('id') id: string,
    @Body() updateData: any,
    @UploadedFiles()
    files: { file?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
  ) {
    return this.courseService.updateCourse(
      id,
      updateData,
      files.file ? files.file[0] : null,
      files.thumbnail ? files.thumbnail[0] : null,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  async downloadCourse(@Param('id') id: string, @Request() req) {
    return this.courseService.downloadCourse(id, req.user.userType);
  }
}
