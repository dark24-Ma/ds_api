// src/infrastructure/repository/newsletter.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsletterDocument } from '../newsletter.schema';

@Injectable()
export class NewsletterRepository {
  constructor(
    @InjectModel('Newsletter')
    private newsletterModel: Model<NewsletterDocument>,
  ) {}

  async subscribe(email: string): Promise<NewsletterDocument> {
    const newsletter = new this.newsletterModel({
      email,
      isSubscribed: true,
      subscribedAt: new Date(),
    });
    return newsletter.save();
  }

  async unsubscribe(email: string): Promise<NewsletterDocument | null> {
    return this.newsletterModel
      .findOneAndUpdate(
        { email },
        {
          isSubscribed: false,
          unsubscribedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }

  async findByEmail(email: string): Promise<NewsletterDocument | null> {
    return this.newsletterModel.findOne({ email }).exec();
  }

  async getAllSubscribed(): Promise<NewsletterDocument[]> {
    return this.newsletterModel.find({ isSubscribed: true }).exec();
  }
}
