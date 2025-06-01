import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
  Relation,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AssetFileTypeEnum } from './asset.enum';
import { Dates } from '@entities/embedded/date';
import { ProductModel } from '@entities/product/product.model';

@ObjectType()
@Entity('asset')
@Index(['id', 'hashname'], { unique: true })
export class AssetModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => AssetFileTypeEnum, { nullable: false })
  @Column({
    type: 'enum',
    enum: AssetFileTypeEnum,
    name: 'type',
    default: AssetFileTypeEnum.logo,
  })
  type: AssetFileTypeEnum;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    name: 'hashname',
    length: 100,
  })
  hashname: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    name: 'filename',
    length: 150,
  })
  filename: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    length: 100,
    name: 'mimetype',
  })
  mimetype: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  download?: string;

  @HideField()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'path',
  })
  path: string;

  @Field(() => Int, { nullable: false, description: 'Size' })
  @Column({
    type: 'integer',
    name: 'size',
    default: 0,
  })
  size: number;

  @Field(() => Int, { nullable: true, description: 'width' })
  @Column({
    type: 'integer',
    name: 'width',
    default: 0,
  })
  width?: number;

  @Field(() => Int, { nullable: true, description: 'height' })
  @Column({
    type: 'integer',
    name: 'height',
    default: 0,
  })
  height?: number;

  @Field(() => String, { nullable: true, description: 'ipfs' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'ipfs',
  })
  ipfs?: string;

  @Field(() => ProductModel, { nullable: true })
  @ManyToOne(() => ProductModel, (product) => product.assets, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Relation<ProductModel>;
}
