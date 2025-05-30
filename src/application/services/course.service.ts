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
import * as path from 'path';

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

  async getFreeCourses() {
    const courses = await this.courseRepository.findByFreeAccess();
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

    // Si le cours est en accès libre, autoriser le téléchargement
    if (course.isFreeAccess) {
      // Incrémenter le compteur de téléchargements
      await this.courseRepository.incrementDownloadCount(id);
      
      return {
        url: course.resourceUrl,
        title: course.title,
        type: course.resourceType,
      };
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

  async downloadFreeCourse(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Vérifier si le cours est en accès libre
    if (!course.isFreeAccess) {
      throw new ForbiddenException("Ce cours n'est pas en accès libre, veuillez vous connecter");
    }

    // Incrémenter le compteur de téléchargements
    await this.courseRepository.incrementDownloadCount(id);

    return {
      url: course.resourceUrl,
      title: course.title,
      type: course.resourceType,
    };
  }

  async getCourseForViewing(id: string, resourceId: string | null, userType: UserType | null) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Vérifier si l'utilisateur a accès au cours
    if (!course.isFreeAccess) {
      // Si le cours n'est pas en accès libre, vérifier si l'utilisateur est authentifié
      if (!userType) {
        throw new ForbiddenException("Vous devez être connecté pour accéder à ce cours");
      }

      // Vérifier si l'utilisateur a le type requis pour accéder au cours
      if (course.accessibleTo.length > 0 && !course.accessibleTo.includes(userType)) {
        throw new ForbiddenException("Vous n'avez pas accès à ce cours");
      }
    }

    // Incrémenter le compteur de vues
    await this.courseRepository.incrementViewCount(id);

    // Détermine quelle ressource doit être visualisée
    let resourceUrl = '';
    let resourceType = '';
    let resourceTitle = '';
    
    // Si on a un ID de ressource spécifique, on cherche cette ressource
    if (resourceId && course.resources && course.resources.length > 0) {
      const resource = course.resources.find(r => r.id === resourceId);
      if (!resource) {
        throw new NotFoundException('Ressource non trouvée dans ce cours');
      }
      resourceUrl = resource.resourceUrl;
      resourceType = resource.resourceType;
      resourceTitle = resource.title;
    } 
    // Sinon, on utilise la ressource principale du cours ou la première ressource disponible
    else if (course.resourceUrl) {
      resourceUrl = course.resourceUrl;
      resourceType = course.resourceType;
      resourceTitle = course.title;
    } 
    // Si on n'a pas de resourceId mais qu'on a des ressources, on prend la première
    else if (course.resources && course.resources.length > 0) {
      const firstResource = course.resources[0];
      resourceUrl = firstResource.resourceUrl;
      resourceType = firstResource.resourceType;
      resourceTitle = firstResource.title;
    }
    else {
      throw new BadRequestException("Aucune ressource disponible pour ce cours");
    }

    // Obtenir le chemin absolu du fichier
    let filePath = '';
    
    // Si l'URL est relative (commence par /uploads/)
    if (resourceUrl.startsWith('/uploads/')) {
      filePath = path.join(process.cwd(), resourceUrl.substring(1));
    } 
    // Si l'URL est absolue et commence par le répertoire du projet
    else if (resourceUrl.startsWith(process.cwd())) {
      filePath = resourceUrl;
    }
    // Si l'URL est un chemin relatif mais sans le slash au début
    else if (resourceUrl.startsWith('uploads/')) {
      filePath = path.join(process.cwd(), resourceUrl);
    }
    // Gestion des URLs externes (à implémenter si nécessaire)
    else {
      // Pour le moment, on lance une erreur pour les URLs externes
      console.error('URL non supportée pour la visualisation:', resourceUrl);
      throw new BadRequestException("Type d'URL non supporté pour la visualisation");
    }

    // Vérifier si le fichier existe
    try {
      const fs = require('fs');
      if (!fs.existsSync(filePath)) {
        console.error('Fichier non trouvé:', filePath);
        throw new NotFoundException('Fichier du cours non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du fichier:', error);
      throw new NotFoundException('Fichier du cours non trouvé ou inaccessible');
    }

    return {
      filePath,
      title: resourceTitle,
      type: resourceType,
    };
  }

  async canAccessCourse(userId: string, courseId: string): Promise<boolean> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    // Si le cours est en accès libre, accès autorisé pour tous
    if (course.isFreeAccess) {
      return true;
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

  // Méthode pour ajouter une ressource à un cours existant
  async addResourceToCourse(
    courseId: string, 
    resourceData: any, 
    file?: UploadedFile
  ) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    let resourceUrl = resourceData.resourceUrl;

    // Si un fichier est fourni, le sauvegarder
    if (file) {
      try {
        resourceUrl = await this.fileUploadService.saveFile(file);
        console.log('File saved with path:', resourceUrl);
      } catch (error) {
        console.error('Error saving file:', error);
        throw new BadRequestException(`Erreur lors de l'upload du fichier: ${error.message}`);
      }
    }

    // Créer la nouvelle ressource avec un ID unique
    const newResource = {
      id: `resource_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`, // Générer un ID unique
      title: resourceData.title,
      resourceType: resourceData.resourceType,
      resourceUrl,
      fileName: file ? file.originalname : undefined,
      duration: resourceData.duration || 0,
      order: resourceData.order || (course.resources ? course.resources.length : 0)
    };

    // Ajouter la ressource au cours
    if (!course.resources) {
      course.resources = [];
    }
    
    course.resources.push(newResource);

    // Mettre à jour le cours
    return this.courseRepository.update(courseId, { resources: course.resources });
  }

  // Méthode pour supprimer une ressource d'un cours
  async removeResourceFromCourse(courseId: string, resourceId: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    if (!course.resources || course.resources.length === 0) {
      throw new NotFoundException('Ce cours ne contient pas de ressources');
    }

    // Trouver l'index de la ressource à supprimer
    const resourceIndex = course.resources.findIndex(r => r.id === resourceId);
    if (resourceIndex === -1) {
      throw new NotFoundException('Ressource non trouvée dans ce cours');
    }

    // Supprimer le fichier associé si c'est un fichier uploadé
    const resource = course.resources[resourceIndex];
    if (resource.resourceUrl && resource.resourceUrl.startsWith('/uploads/')) {
      await this.fileUploadService.removeFile(resource.resourceUrl);
    }

    // Supprimer la ressource du tableau
    course.resources.splice(resourceIndex, 1);

    // Mettre à jour le cours
    return this.courseRepository.update(courseId, { resources: course.resources });
  }

  // Méthode pour mettre à jour l'ordre des ressources
  async updateResourcesOrder(courseId: string, resourcesOrder: { id: string, order: number }[]) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }

    if (!course.resources || course.resources.length === 0) {
      throw new BadRequestException('Ce cours ne contient pas de ressources');
    }

    // Mettre à jour l'ordre de chaque ressource
    resourcesOrder.forEach(item => {
      const resource = course.resources.find(r => r.id === item.id);
      if (resource) {
        resource.order = item.order;
      }
    });

    // Trier les ressources selon le nouvel ordre
    course.resources.sort((a, b) => a.order - b.order);

    // Mettre à jour le cours
    return this.courseRepository.update(courseId, { resources: course.resources });
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
      isFreeAccess: course.isFreeAccess,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      createdBy: course.createdBy,
      resources: course.resources ? course.resources.map(resource => ({
        id: resource._id || resource.id,
        title: resource.title,
        resourceType: resource.resourceType,
        resourceUrl: resource.resourceUrl,
        fileName: resource.fileName,
        duration: resource.duration,
        order: resource.order
      })).sort((a, b) => a.order - b.order) : []
    };
  }
}
