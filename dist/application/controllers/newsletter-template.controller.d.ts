import { NewsletterTemplateService } from '../services/newsletter-template.service';
export declare class NewsletterTemplateController {
    private readonly templateService;
    constructor(templateService: NewsletterTemplateService);
    createTemplate(templateData: any): Promise<{
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
    getTemplateById(id: string): Promise<{
        id: unknown;
        name: string;
        subject: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
