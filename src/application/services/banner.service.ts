import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BannerRepository } from '../../infrastructure/repository/banner.repository';
import { Banner } from '../../domain/entities/banner.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BannerService {
  constructor(private bannerRepository: BannerRepository) {}

  async create(bannerData: Partial<Banner>, imageFile?: Express.Multer.File): Promise<Banner> {
    if (imageFile) {
      bannerData.imageUrl = await this.saveImage(imageFile);
    }

    const banner = await this.bannerRepository.create(bannerData);
    return this.mapToEntity(banner);
  }

  async findAll(filters?: any): Promise<Banner[]> {
    const banners = await this.bannerRepository.findAll(filters);
    return banners.map(banner => this.mapToEntity(banner));
  }

  async findActiveBanners(): Promise<Banner[]> {
    const banners = await this.bannerRepository.findActiveBanners();
    return banners.map(banner => this.mapToEntity(banner));
  }

  async findById(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findById(id);
    if (!banner) {
      throw new NotFoundException('Bannière non trouvée');
    }
    return this.mapToEntity(banner);
  }

  async update(id: string, updateData: Partial<Banner>, imageFile?: Express.Multer.File): Promise<Banner> {
    const existingBanner = await this.bannerRepository.findById(id);
    if (!existingBanner) {
      throw new NotFoundException('Bannière non trouvée');
    }

    if (imageFile) {
      // Supprimer l'ancienne image si elle existe
      if (existingBanner.imageUrl) {
        await this.deleteImage(existingBanner.imageUrl);
      }
      updateData.imageUrl = await this.saveImage(imageFile);
    }

    const updatedBanner = await this.bannerRepository.update(id, updateData);
    return this.mapToEntity(updatedBanner);
  }

  async delete(id: string): Promise<void> {
    const banner = await this.bannerRepository.findById(id);
    if (!banner) {
      throw new NotFoundException('Bannière non trouvée');
    }

    // Supprimer l'image associée
    if (banner.imageUrl) {
      await this.deleteImage(banner.imageUrl);
    }

    await this.bannerRepository.delete(id);
  }

  async toggleStatus(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.toggleStatus(id);
    if (!banner) {
      throw new NotFoundException('Bannière non trouvée');
    }
    return this.mapToEntity(banner);
  }

  async trackClick(id: string): Promise<void> {
    const banner = await this.bannerRepository.findById(id);
    if (!banner) {
      return; // Ne pas lever d'erreur pour ne pas interrompre l'UX
    }
    await this.bannerRepository.trackClick(id);
  }

  async trackImpression(id: string): Promise<void> {
    const banner = await this.bannerRepository.findById(id);
    if (!banner) {
      return; // Ne pas lever d'erreur pour ne pas interrompre l'UX
    }
    await this.bannerRepository.trackImpression(id);
  }

  async updateOrder(banners: { id: string, displayOrder: number }[]): Promise<void> {
    await this.bannerRepository.updateOrder(banners);
  }

  private async saveImage(file: Express.Multer.File): Promise<string> {
    // Le fichier est déjà sauvegardé par la configuration Multer diskStorage
    // On retourne juste le nom du fichier
    return file.filename;
  }

  private async deleteImage(filename: string): Promise<void> {
    try {
      const filepath = path.join(process.cwd(), 'uploads', filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
    }
  }

  private mapToEntity(document: any): Banner {
    return {
      id: document._id.toString(),
      title: document.title,
      description: document.description,
      imageUrl: document.imageUrl,
      linkUrl: document.linkUrl,
      isActive: document.isActive,
      displayOrder: document.displayOrder,
      startDate: document.startDate,
      endDate: document.endDate,
      targetAudience: document.targetAudience,
      clickCount: document.clickCount,
      impressions: document.impressions,
      createdBy: document.createdBy,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
} 