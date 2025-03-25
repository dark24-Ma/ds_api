import { User } from 'src/domain/entities/user.entity';
export type UserDocument = User & Document;
export declare class UserSchema extends User {
    name: string;
    email: string;
    firstname: string;
    password: string;
}
export declare const userModel: import("mongoose").Schema<UserSchema, import("mongoose").Model<UserSchema, any, any, any, import("mongoose").Document<unknown, any, UserSchema> & UserSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSchema, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserSchema>> & import("mongoose").FlatRecord<UserSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
