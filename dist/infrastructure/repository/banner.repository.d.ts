import { Model } from 'mongoose';
import { BannerDocument } from '../banner.schema';
import { Banner } from '../../domain/entities/banner.entity';
export declare class BannerRepository {
    private bannerModel;
    constructor(bannerModel: Model<BannerDocument>);
    create(bannerData: Partial<Banner>): Promise<BannerDocument>;
    findAll(filters?: any): Promise<BannerDocument[]>;
    findActiveBanners(): Promise<BannerDocument[]>;
    findById(id: string): Promise<BannerDocument>;
    update(id: string, updateData: Partial<Banner>): Promise<BannerDocument>;
    delete(id: string): Promise<void>;
    toggleStatus(id: string): Promise<BannerDocument>;
    trackClick(id: string): Promise<void>;
    trackImpression(id: string): Promise<void>;
    updateOrder(banners: {
        id: string;
        displayOrder: number;
    }[]): Promise<void>;
}
