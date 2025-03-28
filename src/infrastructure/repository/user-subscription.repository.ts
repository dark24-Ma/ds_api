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
    return this.userSubscriptionModel.findOne({ userId }).exec();
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
}
