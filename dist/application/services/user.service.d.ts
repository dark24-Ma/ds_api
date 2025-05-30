import { UserRepository } from '../../infrastructure/repository/user.repository';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    updateUser(userId: string, updateData: any): Promise<{
        _id: string;
        name: string;
        email: string;
        userType: string;
    }>;
}
