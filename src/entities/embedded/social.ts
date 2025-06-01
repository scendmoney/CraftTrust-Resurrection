import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Social' })
export class Social {
  @IsOptional()
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'site',
    default: '',
  })
  site?: string;

  @IsOptional()
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'youtube',
    default: '',
  })
  youtube?: string;

  @IsOptional()
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'facebook',
    default: '',
  })
  facebook?: string;

  @IsOptional()
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'twitter_x',
    default: '',
  })
  twitterX?: string;

  @IsOptional()
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'instagram',
    default: '',
  })
  instagram?: string;
}
