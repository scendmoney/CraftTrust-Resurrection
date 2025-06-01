import { Dates } from '@entities/embedded/date';
import { OrderModel } from '@entities/order/order.model';
import { ProductModel } from '@entities/product/product.model';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity('order_product')
export default class OrderProductModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => OrderModel, { nullable: false, description: 'Order' })
  @ManyToOne(() => OrderModel, (item) => item.products, {
    cascade: false,
    onDelete: 'NO ACTION',
    lazy: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order: Relation<OrderModel>;
  __order__: Relation<OrderModel>;

  @Field(() => ProductModel, { nullable: true, description: 'Product' })
  @ManyToOne(() => ProductModel, (item) => item.id, {
    cascade: true,
    onDelete: 'NO ACTION',
    lazy: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product?: Relation<ProductModel>;
  __product__: Relation<ProductModel>;

  @Field(() => ProductModel, { nullable: true, description: 'Parent product' })
  @ManyToOne(() => ProductModel, (item) => item.id, {
    cascade: true,
    onDelete: 'NO ACTION',
    lazy: true,
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_product_id',
    referencedColumnName: 'id',
  })
  parentProduct?: Relation<ProductModel>;
  __parentProduct__: Relation<ProductModel>;

  @Field(() => Float, { nullable: false, description: 'Product quantity' })
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'quantity',
    default: 0,
  })
  quantity: number;

  @Field(() => Float, { nullable: false, description: 'price' })
  @Column({
    type: 'numeric',
    name: 'price',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  price: number;

  @IsNumber()
  @Field(() => Float, { nullable: false, description: 'total' })
  @Column({
    type: 'numeric',
    name: 'total',
    comment: 'total',
    nullable: false,
    scale: 2,
    precision: 15,
  })
  total: number;
}
