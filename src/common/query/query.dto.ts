import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  SortDirectionEnum,
} from '../../enums/common';

@InputType()
export class SortDTO {
  @Field(() => String, { nullable: false })
  columnName: string;

  @Field(() => SortDirectionEnum, { nullable: false })
  direction: SortDirectionEnum;
}

@InputType()
export class PaginateDTO {
  @Min(0)
  @Field(() => Int, { nullable: false })
  skip: number;

  @Min(0)
  @Field(() => Int, { nullable: false })
  take: number;
}

@ObjectType()
export class PaginateModel {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => Int, { nullable: false })
  total: number;
}

@InputType()
export class FilterDTO {
  @Field(() => String, { nullable: false })
  columnName: string;

  @Field(() => FilterOperationEnum, { nullable: false })
  operation: FilterOperationEnum;

  @Field(() => FilterFieldTypeEnum, { nullable: false })
  type: FilterFieldTypeEnum;

  @Field(() => [String], { nullable: false })
  value: string[];
}

@InputType()
export class FilterGetDTO {
  @Field(() => PaginateDTO, {
    nullable: true,
    description: 'parameters for pagination',
  })
  paginate?: PaginateDTO;

  @Field(() => [SortDTO], {
    nullable: true,
    description: 'parameters for sort',
  })
  sorts?: SortDTO[];

  @Field(() => [FilterDTO], {
    nullable: true,
    description: 'parameters for filtering',
  })
  filters?: FilterDTO[];
}

@InputType()
export class GetIdDTO {
  @Field(() => Int, {
    nullable: true,
    description: 'ID',
  })
  id: number;
}

@InputType()
export class GetIdStringDTO {
  @Field(() => String, {
    nullable: false,
    description: 'ID',
  })
  id: string;
}
