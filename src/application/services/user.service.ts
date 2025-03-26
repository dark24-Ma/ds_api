// src/application/services/user.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async updateUser(userId: string, updateData: any) {
    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateData.email,
      );
      if (existingUser) {
        throw new ConflictException('Cet email est déjà utilisé');
      }
    }

    // Si le mot de passe est fourni, le hasher
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await this.userRepository.update(userId, updateData);

    // Retourner l'utilisateur mis à jour sans le mot de passe
    return {
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
    };
  }
}
