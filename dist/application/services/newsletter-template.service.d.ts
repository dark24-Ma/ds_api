import { NewsletterTemplateRepository } from '../../infrastructure/repository/newsletter-template.repository';
export declare class NewsletterTemplateService {
    private templateRepository;
    constructor(templateRepository: NewsletterTemplateRepository);
    createTemplate(templateData: any): Promise<{
        id: unknown;
        name: string;
        subject: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTemplateById(id: string): Promise<{
        id: unknown;
        name: string;
        subject: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllTemplates(): Promise<{
        id: unknown;
        name: string;
        subject: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateTemplate(id: string, updateData: any): Promise<{
        id: unknown;
        name: string;
        subject: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteTemplate(id: string): Promise<{
        message: string;
    }>;
}
