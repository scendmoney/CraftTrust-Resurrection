import {
  Field,
  GraphQLISODateTime,
  HideField,
  ObjectType,
} from '@nestjs/graphql';
import {
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Dates' })
export class Dates {
  @BeforeUpdate()
  updateAddress() {
    this.updatedDate = new Date();
  }

  @Field(() => GraphQLISODateTime, { nullable: false })
  @CreateDateColumn({
    name: 'created_date',
    nullable: false,
    type: 'timestamptz',
  })
  createdDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  @UpdateDateColumn({
    name: 'updated_date',
    nullable: false,
    type: 'timestamptz',
  })
  updatedDate: Date;

  @HideField()
  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamptz' })
  deletedDate?: Date;
}

@ObjectType({ isAbstract: true, description: 'Dates' })
export class DatesMS {
  @Field(() => String, { nullable: false })
  createdDate: Date;

  @Field(() => String, { nullable: false })
  updatedDate: Date;

  @HideField()
  deletedDate?: Date;
}
