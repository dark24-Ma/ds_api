import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/domain/entities/user.entity';

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
}

export const userModel = SchemaFactory.createForClass(UserSchema);
