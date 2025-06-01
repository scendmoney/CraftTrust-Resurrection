import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserModel } from '../user.model';
import { IsEmail } from 'class-validator';
import { AdminData } from '@entities/embedded/admin_data';

@InputType()
export class AdminLoginInput {
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class CreateAdminInput extends PickType(UserModel, ['role'], InputType) {
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;
}

@InputType()
export class UpdateAdminProfileDataInput extends PickType(
  AdminData,
  ['isNotificationJoinFacility', 'isNotificationContactUs'],
  InputType,
) {}

@InputType()
export class UpdateAdminProfileInput extends PartialType(
  PickType(
    UserModel,
    ['phoneNumber', 'fullName', 'isBlocked', 'email'],
    InputType,
  ),
  InputType,
) {
  @Field(() => UpdateAdminProfileDataInput, { nullable: false })
  adminData: UpdateAdminProfileDataInput;

  @Field(() => String, { nullable: false })
  adminId: string;
}
