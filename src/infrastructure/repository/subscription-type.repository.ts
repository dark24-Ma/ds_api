import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionTypeDocument } from '../subscription-type.schema';

@Injectable()
export class SubscriptionTypeRepository {
  constructor(
    @InjectModel('SubscriptionType')
    private subscriptionTypeModel: Model<SubscriptionTypeDocument>,
  ) {}

  async create(subscriptionTypeData: any): Promise<SubscriptionTypeDocument> {
    const subscriptionType = new this.subscriptionTypeModel(
      subscriptionTypeData,
    );
    return subscriptionType.save();
  }

  async findById(id: string): Promise<SubscriptionTypeDocument | null> {
    return this.subscriptionTypeModel.findById(id).exec();
  }

  async findAll(): Promise<SubscriptionTypeDocument[]> {
    return this.subscriptionTypeModel.find().exec();
  }

  async update(
    id: string,
    updateData: any,
  ): Promise<SubscriptionTypeDocument | null> {
    return this.subscriptionTypeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<SubscriptionTypeDocument | null> {
    return this.subscriptionTypeModel.findByIdAndDelete(id).exec();
  }
}
