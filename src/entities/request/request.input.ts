import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import { RequestFacilityRoleEnum, RequestStatusEnum } from './request.enum';
import { GetIdDTO } from '@common/query/query.dto';

@InputType()
export class SendContactUsInput {
  @Field(() => String, {
    nullable: false,
    description: 'name',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Company Name',
  })
  companyName?: string;

  @IsOptional()
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: true,
    description: 'phone',
  })
  phone?: string;

  @IsEmail()
  @Field(() => String, {
    nullable: false,
    description: 'email',
  })
  email: string;

  @Field(() => String, {
    nullable: false,
    description: 'message',
  })
  message: string;
}

@InputType()
export class RequestNewFacilityInput {
  @Field(() => String, {
    nullable: false,
    description: 'name',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Company Name',
  })
  companyName?: string;

  @Field(() => String, {
    nullable: false,
    description: 'phone',
  })
  phone: string;

  @IsEmail()
  @Field(() => String, {
    nullable: false,
    description: 'email',
  })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'license Number',
  })
  licenseNumber?: string;

  @Field(() => RequestFacilityRoleEnum, {
    nullable: false,
    description: 'facility role',
  })
  facilityRole: RequestFacilityRoleEnum;
}

@InputType()
export class UpdateRequestInput extends GetIdDTO {
  @Field(() => RequestStatusEnum, {
    nullable: false,
    description: 'status',
  })
  status: RequestStatusEnum;
}

@InputType()
export class RejectRequestInput extends GetIdDTO {
  @Field(() => String, {
    nullable: true,
    description: 'Message Reject',
  })
  messageReject?: string;
}
