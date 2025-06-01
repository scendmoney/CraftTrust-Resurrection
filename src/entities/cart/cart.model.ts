import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Relation,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Dates } from '@entities/embedded/date';
import { FacilityModel } from '@entities/facility/facility.model';
import { CartItemModel } from '@entities/cart_item/cart_item.model';
import { NetInfo } from './embedded/net_info';

@Index(['facilityBuyer'])
@Index(['facilityCultivator'])
@ObjectType()
@Entity('cart')
export class CartModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => Float, { nullable: false, description: 'fee' })
  @Column({
    type: 'numeric',
    name: 'fee',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  fee: number;

  @Field(() => Float, { nullable: false, description: 'cost products' })
  @Column({
    type: 'numeric',
    name: 'cost_products',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  costProducts: number;

  @Field(() => Float, { nullable: false, description: 'total price' })
  @Column({
    type: 'numeric',
    name: 'total',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  total: number;

  @Field(() => [CartItemModel], { nullable: false })
  @OneToMany(() => CartItemModel, (item) => item.cart, {
    lazy: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  cartItems: Relation<CartItemModel[]>;
  __cartItems__: Relation<CartItemModel[]>;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'facility_buyer_id', referencedColumnName: 'id' })
  facilityBuyer: Relation<FacilityModel>;
  __facilityBuyer__: Relation<FacilityModel>;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'facility_cultivator_id', referencedColumnName: 'id' })
  facilityCultivator: Relation<FacilityModel>;
  __facilityCultivator__: Relation<FacilityModel>;

  // Resolve Fields
  @Field(() => NetInfo, {
    nullable: true,
  })
  @Column(() => NetInfo, { prefix: false })
  netInfo?: NetInfo;
}
