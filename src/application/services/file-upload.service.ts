import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { UploadedFile } from './course.service';
// import { UploadedFile } from '../../types/uploaded-file.interface';

// Interface pour le fichier uploadé

@Injectable()
export class FileUploadService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: UploadedFile): Promise<string> {
    // Vérifier si le fichier existe
    if (!file) {
      throw new BadRequestException('Fichier invalide ou manquant');
    }

    // Si le fichier a déjà été enregistré sur le disque par Multer
    if (file.path) {
      // On retourne simplement le chemin relatif
      const relativePath = file.path
        .replace(process.cwd(), '')
        .replace(/\\/g, '/');
      return relativePath;
    }

    // Ancienne méthode (si le fichier a un buffer)
    if (file.buffer && file.originalname) {
      // Générer un nom de fichier unique
      const fileHash = crypto.randomBytes(16).toString('hex');
      const extension = path.extname(file.originalname);
      const fileName = `${fileHash}${extension}`;
      const filePath = path.join(this.uploadDir, fileName);

      // Écrire le fichier
      fs.writeFileSync(filePath, file.buffer);

      // Retourner le chemin relatif
      return `/uploads/${fileName}`;
    }

    throw new BadRequestException('Format de fichier non reconnu');
  }

  async removeFile(filePath: string): Promise<void> {
    if (!filePath) return;

    // Normaliser le chemin
    const normalizedPath = filePath.startsWith('/')
      ? path.join(process.cwd(), filePath.substring(1))
      : path.join(process.cwd(), filePath);

    if (fs.existsSync(normalizedPath)) {
      fs.unlinkSync(normalizedPath);
    }
  }
}
