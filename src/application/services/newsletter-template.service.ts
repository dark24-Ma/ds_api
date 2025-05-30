// src/application/services/newsletter-template.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsletterTemplateRepository } from '../../infrastructure/repository/newsletter-template.repository';

@Injectable()
export class NewsletterTemplateService {
  constructor(private templateRepository: NewsletterTemplateRepository) {}

  async createTemplate(templateData: any) {
    const template = await this.templateRepository.create(templateData);
    return {
      id: template._id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  async getTemplateById(id: string) {
    const template = await this.templateRepository.findById(id);
    if (!template) {
      throw new NotFoundException('Template non trouvé');
    }

    return {
      id: template._id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  async getAllTemplates() {
    const templates = await this.templateRepository.findAll();
    return templates.map((template) => ({
      id: template._id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    }));
  }

  async updateTemplate(id: string, updateData: any) {
    const template = await this.templateRepository.update(id, updateData);
    if (!template) {
      throw new NotFoundException('Template non trouvé');
    }

    return {
      id: template._id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  async deleteTemplate(id: string) {
    const template = await this.templateRepository.delete(id);
    if (!template) {
      throw new NotFoundException('Template non trouvé');
    }
    return { message: 'Template supprimé avec succès' };
  }
}
