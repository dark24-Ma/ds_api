import { User } from '../../domain/entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private users;
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findByResetToken(token: string): Promise<User | null>;
}
