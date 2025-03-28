import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CourseRepository } from '../../infrastructure/repository/course.repository';
import { FileUploadService } from './file-upload.service';
import { UserSubscriptionService } from './user-subscription.service';
// import { ResourceType } from '../../infrastructure/repository/course.schema';
// import { ResourceType } from 'src/domain/enums/course.enum';
import { UserType } from '../../domain/enums/user-type.enum';
// import { UploadedFile } from '../../types/uploaded-file.interface';

export interface UploadedFile {
  // Propriétés du buffer (memory storage)
  buffer?: Buffer;
  originalname?: string;
  mimetype?: string;

  // Propriétés du disk storage
  filename?: string;
  path?: string;
  destination?: string;
  fieldname?: string;
  encoding?: string;
  size?: number;
}

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: CourseRepository,
    private fileUploadService: FileUploadService,
    private userSubscriptionService: UserSubscriptionService,
  ) {}

  async createCourse(
    courseData: any,
    file?: UploadedFile,
    thumbnail?: UploadedFile,
  ) {
    // Logs pour le débogage
    console.log(
      'CreateCourse - File info:',
      file
        ? {
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
          }
        : 'No file',
    );

    let resourceUrl = courseData.resourceUrl;

    // Vérifier si le fichier est présent quand il devrait l'être
    if (courseData.resourceType !== 'link' && !file && !resourceUrl) {
      throw new BadRequestException(
        'Un fichier ou une URL est requise pour ce type de ressource',
      );
    }

    // Si un fichier est fourni, le sauvegarder
    if (file) {
      try {
        resourceUrl = await this.fileUploadService.saveFile(file);
        console.log('File saved with path:', resourceUrl);
      } catch (error) {
        console.error('Error saving file:', error);
        throw new BadRequestException(
          `Erreur lors de l'upload du fichier: ${error.message}`,
        );
      }
    }

    // Si une vignette est fournie, la sauvegarder
    let thumbnailUrl = courseData.thumbnailUrl;
    if (thumbnail) {
      try {
        thumbnailUrl = await this.fileUploadService.saveFile(thumbnail);
        console.log('Thumbnail saved with path:', thumbnailUrl);
      } catch (error) {
        console.error('Error saving thumbnail:', error);
      }
    }

    // Créer le cours
    const course = await this.courseRepository.create({
      ...courseData,
      resourceUrl,
      thumbnailUrl,
    });

    return this.formatCourseResponse(course);
  }

  async getCourseById(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    return this.formatCourseResponse(course);
  }

  async getAllCourses() {
    const courses = await this.courseRepository.findAll();
    return courses.map((course) => this.formatCourseResponse(course));
  }

  async getCoursesForUserType(userType: UserType) {
    const courses = await this.courseRepository.findByUserType(userType);
    return courses.map((course) => this.formatCourseResponse(course));
  }

  async updateCourse(
    id: string,
    updateData: any,
    file?: UploadedFile,
    thumbnail?: UploadedFile,
  ) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    let resourceUrl = updateData.resourceUrl || course.resourceUrl;
    let thumbnailUrl = updateData.thumbnailUrl || course.thumbnailUrl;

    // Si un nouveau fichier est fourni
    if (file) {
      // Supprimer l'ancien fichier si c'est un fichier uploadé
      if (course.resourceUrl && course.resourceUrl.startsWith('/uploads/')) {
        await this.fileUploadService.removeFile(course.resourceUrl);
      }
      resourceUrl = await this.fileUploadService.saveFile(file);
    }

    // Si une nouvelle vignette est fournie
    if (thumbnail) {
      // Supprimer l'ancienne vignette si c'est un fichier uploadé
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

  async deleteCourse(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Supprimer les fichiers associés
    if (course.resourceUrl && course.resourceUrl.startsWith('/uploads/')) {
      await this.fileUploadService.removeFile(course.resourceUrl);
    }

    if (course.thumbnailUrl && course.thumbnailUrl.startsWith('/uploads/')) {
      await this.fileUploadService.removeFile(course.thumbnailUrl);
    }

    await this.courseRepository.delete(id);
    return { message: 'Cours supprimé avec succès' };
  }

  async downloadCourse(id: string, userType: UserType) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Vérifier si l'utilisateur a accès au cours
    if (
      course.accessibleTo.length > 0 &&
      !course.accessibleTo.includes(userType)
    ) {
      throw new ForbiddenException("Vous n'avez pas accès à ce cours");
    }

    // Incrémenter le compteur de téléchargements
    await this.courseRepository.incrementDownloadCount(id);

    return {
      url: course.resourceUrl,
      title: course.title,
      type: course.resourceType,
    };
  }

  async canAccessCourse(userId: string, courseId: string): Promise<boolean> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Si le cours n'a pas de restrictions d'abonnement
    if (course.requiredSubscriptionTypes.length === 0) {
      return true;
    }

    // Vérifier l'abonnement de l'utilisateur
    try {
      const userSubscription =
        await this.userSubscriptionService.getUserSubscription(userId);

      // Vérifier si l'abonnement de l'utilisateur est valide
      if (userSubscription.isActive && new Date() <= userSubscription.endDate) {
        // Vérifier si l'abonnement donne accès à ce cours
        return course.requiredSubscriptionTypes.includes(
          userSubscription.subscriptionTypeId,
        );
      }
    } catch (error) {
      // Si l'utilisateur n'a pas d'abonnement
      return false;
    }

    return false;
  }

  private formatCourseResponse(course) {
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
}
