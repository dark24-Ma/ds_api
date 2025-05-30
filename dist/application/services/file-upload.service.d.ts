import { UploadedFile } from './course.service';
export declare class FileUploadService {
    private readonly uploadDir;
    constructor();
    saveFile(file: UploadedFile): Promise<string>;
    removeFile(filePath: string): Promise<void>;
}
