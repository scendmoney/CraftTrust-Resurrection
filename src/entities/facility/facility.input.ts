import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { FacilityModel } from './facility.model';
import { IsOptional, Max, Min } from 'class-validator';
import { Social } from '@entities/embedded/social';
import { AddressData } from '@entities/embedded/address';

@InputType()
export class UpdateSocialInput extends PartialType(Social, InputType) {}

@InputType()
export class AddressDataInput extends PartialType(AddressData, InputType) {}

@InputType({ description: 'Input data for update profile facility' })
export class UpdateFacilityDTO extends PartialType(
  PickType(
    FacilityModel,
    ['displayName', 'description', 'phoneNumber', 'email', 'campaignEmail'],
    InputType,
  ),
  InputType,
) {
  @Field(() => String, { nullable: true })
  userContactId?: string;

  @Field(() => UpdateSocialInput, { nullable: true })
  socials?: UpdateSocialInput;

  @Field(() => AddressDataInput, { nullable: true })
  address?: AddressDataInput;
}

@InputType({ description: 'Input data for updating the buyer by cultivator' })
export class UpdateBuyerByCultivatorInput extends PickType(
  FacilityModel,
  ['id'],
  InputType,
) {
  @Field(() => Boolean, { nullable: true })
  isNetActivated?: boolean;

  @IsOptional()
  @Min(1)
  @Max(365)
  @Field(() => Number, { nullable: true })
  netDays?: number;

  @IsOptional()
  @Min(1)
  @Field(() => Number, { nullable: true })
  netBalance?: number;
}
@InputType({ description: 'Input Remove Relation Cultivator To Buyer' })
export class RemoveRelationCultivatorToBuyerInput {
  @Field(() => String, { nullable: false })
  facilityId: string;
}

@InputType({ description: 'Create Chat Facility To Facility' })
export class CreateChatFacilityToFacilityInput {
  @Field(() => String, { nullable: false })
  facilityId: string;
}
