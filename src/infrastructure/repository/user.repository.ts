import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  private users: User[] = [];

  async save(user: User): Promise<User> {
    // this.users.push(user);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.userModel.findOne({ resetToken: token }).exec();
  }

  async updateResetToken(
    userEmail: string,
    resetData: { resetToken: string; resetTokenExpiration: Date },
  ) {
    return this.userModel
      .findOneAndUpdate(
        { email: userEmail },
        {
          resetToken: resetData.resetToken,
          // resetTokenExpiration: resetData.resetTokenExpiration,
        },
        { new: true }, // Cette option retourne le document mis à jour
      )
      .exec();
  }

  async updatePassword(userToken: string, newPassword: string) {
    return this.userModel
      .findOneAndUpdate({ resetToken: userToken }, { password: newPassword })
      .exec();
  }
}
