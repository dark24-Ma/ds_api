// src/infrastructure/repository/newsletter-template.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { NewsletterTemplateDocument } from './newsletter-template.schema';
import {
  NewsletterTemplateDocument,
  //   NewsletterTemplateModel,
} from '../newsletter-template.schema';

@Injectable()
export class NewsletterTemplateRepository {
  constructor(
    @InjectModel('NewsletterTemplate')
    private templateModel: Model<NewsletterTemplateDocument>,
  ) {}

  async create(templateData: any): Promise<NewsletterTemplateDocument> {
    const template = new this.templateModel(templateData);
    return template.save();
  }

  async findById(id: string): Promise<NewsletterTemplateDocument | null> {
    return this.templateModel.findById(id).exec();
  }

  async findAll(): Promise<NewsletterTemplateDocument[]> {
    return this.templateModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(
    id: string,
    updateData: any,
  ): Promise<NewsletterTemplateDocument | null> {
    return this.templateModel
      .findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<NewsletterTemplateDocument | null> {
    return this.templateModel.findByIdAndDelete(id).exec();
  }
}
