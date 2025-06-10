import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSubscriptionDocument } from '../user-subscription.schema';

@Injectable()
export class UserSubscriptionRepository {
  constructor(
    @InjectModel('UserSubscription')
    private userSubscriptionModel: Model<UserSubscriptionDocument>,
  ) {}

  async create(userSubscriptionData: any): Promise<UserSubscriptionDocument> {
    const userSubscription = new this.userSubscriptionModel(
      userSubscriptionData,
    );
    return userSubscription.save();
  }

  async findByUserId(userId: string): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findOne({ userId })
      .sort({ createdAt: -1 }) // Retourner le plus récent
      .exec();
  }

  async update(
    userId: string,
    updateData: any,
  ): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findOneAndUpdate({ userId }, updateData, { new: true })
      .exec();
  }

  async delete(userId: string): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel.findOneAndDelete({ userId }).exec();
  }

  async getActiveSubscriptions(): Promise<UserSubscriptionDocument[]> {
    return this.userSubscriptionModel
      .find({ isActive: true, endDate: { $gte: new Date() } })
      .exec();
  }

  async findAll(): Promise<UserSubscriptionDocument[]> {
    return this.userSubscriptionModel.find().exec();
  }

  async findWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<UserSubscriptionDocument[]> {
    const skip = (page - 1) * limit;
    return this.userSubscriptionModel.find().skip(skip).limit(limit).exec();
  }

  async count(): Promise<number> {
    return this.userSubscriptionModel.countDocuments().exec();
  }

  async findActiveByUserId(userId: string): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findOne({ 
        userId: userId,
        isActive: true,
        endDate: { $gte: new Date() }
      })
      .exec();
  }

  async findById(subscriptionId: string): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel.findById(subscriptionId).exec();
  }

  async updateById(subscriptionId: string, updateData: any): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findByIdAndUpdate(subscriptionId, updateData, { new: true })
      .exec();
  }

  async findActiveSubscriptions(): Promise<UserSubscriptionDocument[]> {
    return this.userSubscriptionModel
      .find({ isActive: true })
      .exec();
  }

  async findActiveByUserIdAndType(userId: string, subscriptionTypeId: string): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findOne({ 
        userId: userId,
        subscriptionTypeId: subscriptionTypeId,
        isActive: true,
        endDate: { $gte: new Date() }
      })
      .exec();
  }

  async findByUserAndTypeInDateRange(
    userId: string, 
    subscriptionTypeId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<UserSubscriptionDocument | null> {
    return this.userSubscriptionModel
      .findOne({
        userId: userId,
        subscriptionTypeId: subscriptionTypeId,
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      })
      .exec();
  }

  async findAllByUserId(userId: string): Promise<UserSubscriptionDocument[]> {
    return this.userSubscriptionModel
      .find({ userId })
      .sort({ createdAt: -1 }) // Du plus récent au plus ancien
      .exec();
  }
}
