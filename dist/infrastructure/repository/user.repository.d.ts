import { User } from '../../domain/entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from '../user.schema';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private users;
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findByResetToken(token: string): Promise<User | null>;
    updateResetToken(userEmail: string, resetData: {
        resetToken: string;
        resetTokenExpiration: Date;
    }): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePassword(userToken: string, newPassword: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(userId: string, updateData: any): Promise<UserDocument | null>;
    findById(userId: string): Promise<UserDocument | null>;
}
