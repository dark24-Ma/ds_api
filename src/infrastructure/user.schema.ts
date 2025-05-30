import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/domain/entities/user.entity';
import { UserType } from 'src/domain/enums/user-type.enum';

export type UserDocument = User & Document;
@Schema()
export class UserSchema extends User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  resetToken: string;

  @Prop({ type: String, enum: UserType, default: UserType.CLIENT })
  userType: UserType;

  @Prop({ required: false })
  phonenumber: string;
}

export const userModel = SchemaFactory.createForClass(UserSchema);
