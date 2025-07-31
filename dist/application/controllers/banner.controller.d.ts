import { BannerService } from '../services/banner.service';
import { Banner } from '../../domain/entities/banner.entity';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(createBannerDto: any, file: Express.Multer.File): Promise<Banner>;
    findAll(filters: any): Promise<Banner[]>;
    findActiveBanners(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    update(id: string, updateBannerDto: any, file?: Express.Multer.File): Promise<Banner>;
    remove(id: string): Promise<{
        message: string;
    }>;
    toggleStatus(id: string): Promise<Banner>;
    trackClick(id: string): Promise<{
        message: string;
    }>;
    trackImpression(id: string): Promise<{
        message: string;
    }>;
    updateOrder(orderData: {
        banners: {
            id: string;
            displayOrder: number;
        }[];
    }): Promise<{
        message: string;
    }>;
}
