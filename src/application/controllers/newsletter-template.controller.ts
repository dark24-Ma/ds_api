// src/application/controllers/newsletter-template.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NewsletterTemplateService } from '../services/newsletter-template.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('newsletter-templates')
@UseGuards(JwtAuthGuard)
export class NewsletterTemplateController {
  constructor(private readonly templateService: NewsletterTemplateService) {}

  @Post()
  async createTemplate(@Body() templateData: any) {
    return this.templateService.createTemplate(templateData);
  }

  @Get()
  async getAllTemplates() {
    return this.templateService.getAllTemplates();
  }

  @Get(':id')
  async getTemplateById(@Param('id') id: string) {
    return this.templateService.getTemplateById(id);
  }

  @Put(':id')
  async updateTemplate(@Param('id') id: string, @Body() updateData: any) {
    return this.templateService.updateTemplate(id, updateData);
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string) {
    return this.templateService.deleteTemplate(id);
  }
}
