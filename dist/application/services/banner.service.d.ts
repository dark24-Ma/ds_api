import { BannerRepository } from '../../infrastructure/repository/banner.repository';
import { Banner } from '../../domain/entities/banner.entity';
export declare class BannerService {
    private bannerRepository;
    constructor(bannerRepository: BannerRepository);
    create(bannerData: Partial<Banner>, imageFile?: Express.Multer.File): Promise<Banner>;
    findAll(filters?: any): Promise<Banner[]>;
    findActiveBanners(): Promise<Banner[]>;
    findById(id: string): Promise<Banner>;
    update(id: string, updateData: Partial<Banner>, imageFile?: Express.Multer.File): Promise<Banner>;
    delete(id: string): Promise<void>;
    toggleStatus(id: string): Promise<Banner>;
    trackClick(id: string): Promise<void>;
    trackImpression(id: string): Promise<void>;
    updateOrder(banners: {
        id: string;
        displayOrder: number;
    }[]): Promise<void>;
    private saveImage;
    private deleteImage;
    private mapToEntity;
}
