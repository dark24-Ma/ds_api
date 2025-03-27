"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let FileUploadService = class FileUploadService {
    constructor() {
        this.uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async saveFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('Fichier invalide ou manquant');
        }
        if (file.path) {
            const relativePath = file.path
                .replace(process.cwd(), '')
                .replace(/\\/g, '/');
            return relativePath;
        }
        if (file.buffer && file.originalname) {
            const fileHash = crypto.randomBytes(16).toString('hex');
            const extension = path.extname(file.originalname);
            const fileName = `${fileHash}${extension}`;
            const filePath = path.join(this.uploadDir, fileName);
            fs.writeFileSync(filePath, file.buffer);
            return `/uploads/${fileName}`;
        }
        throw new common_1.BadRequestException('Format de fichier non reconnu');
    }
    async removeFile(filePath) {
        if (!filePath)
            return;
        const normalizedPath = filePath.startsWith('/')
            ? path.join(process.cwd(), filePath.substring(1))
            : path.join(process.cwd(), filePath);
        if (fs.existsSync(normalizedPath)) {
            fs.unlinkSync(normalizedPath);
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map