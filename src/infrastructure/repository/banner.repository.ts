import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerDocument } from '../banner.schema';
import { Banner } from '../../domain/entities/banner.entity';

@Injectable()
export class BannerRepository {
  constructor(
    @InjectModel('Banner') private bannerModel: Model<BannerDocument>,
  ) {}

  async create(bannerData: Partial<Banner>): Promise<BannerDocument> {
    const newBanner = new this.bannerModel(bannerData);
    return newBanner.save();
  }

  async findAll(filters?: any): Promise<BannerDocument[]> {
    const query = this.bannerModel.find();
    
    if (filters) {
      if (filters.isActive !== undefined) {
        query.where('isActive', filters.isActive);
      }
      if (filters.targetAudience) {
        query.where('targetAudience', filters.targetAudience);
      }
      if (filters.search) {
        query.where({
          $or: [
            { title: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } }
          ]
        });
      }
    }
    
    return query.sort({ displayOrder: 1, createdAt: -1 }).exec();
  }

  async findActiveBanners(): Promise<BannerDocument[]> {
    const now = new Date();
    return this.bannerModel.find({
      isActive: true,
      $and: [
        {
          $or: [
            { startDate: { $exists: false } },
            { startDate: { $lte: now } }
          ]
        },
        {
          $or: [
            { endDate: { $exists: false } },
            { endDate: { $gte: now } }
          ]
        }
      ]
    }).sort({ displayOrder: 1 }).exec();
  }

  async findById(id: string): Promise<BannerDocument> {
    return this.bannerModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Banner>): Promise<BannerDocument> {
    return this.bannerModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.bannerModel.findByIdAndDelete(id).exec();
  }

  async toggleStatus(id: string): Promise<BannerDocument> {
    const banner = await this.findById(id);
    if (!banner) {
      throw new Error('Banner not found');
    }
    return this.update(id, { isActive: !banner.isActive });
  }

  async trackClick(id: string): Promise<void> {
    await this.bannerModel.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } }
    ).exec();
  }

  async trackImpression(id: string): Promise<void> {
    await this.bannerModel.findByIdAndUpdate(
      id,
      { $inc: { impressions: 1 } }
    ).exec();
  }

  async updateOrder(banners: { id: string, displayOrder: number }[]): Promise<void> {
    const updates = banners.map(banner => ({
      updateOne: {
        filter: { _id: banner.id },
        update: { displayOrder: banner.displayOrder }
      }
    }));
    
    await this.bannerModel.bulkWrite(updates);
  }
} 