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
  Response,
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
import * as fs from 'fs';
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

  @Get('free-access')
  async getFreeCourses() {
    return this.courseService.getFreeCourses();
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
  async downloadCourse(@Param('id') id: string, @Request() req) {
    // Si l'utilisateur est authentifié, utiliser son type d'utilisateur
    if (req.user && req.user.userType) {
      return this.courseService.downloadCourse(id, req.user.userType);
    }
    
    // Pour les utilisateurs non-authentifiés, utiliser une méthode spéciale pour vérifier
    // si le cours est en accès libre
    return this.courseService.downloadFreeCourse(id);
  }

  @Get(':id/view')
  async viewCourse(@Param('id') id: string, @Request() req, @Response() res) {
    try {
      // Vérifier si l'utilisateur est authentifié
      const userType = req.user?.userType || null;
      
      // Obtenir les informations du cours
      const courseData = await this.courseService.getCourseForViewing(id, userType);
      
      // Configurer les en-têtes pour empêcher le téléchargement
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Pour les PDFs, on peut utiliser une protection supplémentaire
      if (courseData.type === 'pdf') {
        // Stream le fichier PDF avec protection
        return res.sendFile(courseData.filePath, {
          headers: {
            'Content-Type': 'application/pdf',
          },
        });
      } 
      
      // Pour les vidéos, utiliser le streaming
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
            'Content-Type': 'video/mp4', // Ajuster selon le type de vidéo
          });
          
          return file.pipe(res);
        } else {
          res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4', // Ajuster selon le type de vidéo
          });
          
          return fs.createReadStream(courseData.filePath).pipe(res);
        }
      }
      
      // Cas par défaut
      return res.status(400).json({ message: "Type de ressource non supporté" });
      
    } catch (error) {
      console.error('Erreur lors de la visualisation du cours:', error);
      return res.status(error.status || 500).json({ 
        message: error.message || 'Erreur lors de la visualisation du cours' 
      });
    }
  }
}
