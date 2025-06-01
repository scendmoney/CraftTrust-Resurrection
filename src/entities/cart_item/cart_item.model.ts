import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Relation,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Dates } from '@entities/embedded/date';
import { CartModel } from '@entities/cart/cart.model';
import { ProductModel } from '@entities/product/product.model';

@ObjectType()
@Entity('cart_item')
export class CartItemModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

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

  @Field(() => ProductModel, { nullable: false })
  @ManyToOne(() => ProductModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Relation<ProductModel>;
  __product__: Relation<ProductModel>;

  @Field(() => CartModel, { nullable: false })
  @ManyToOne(() => CartModel, (item) => item.cartItems, {
    lazy: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Relation<CartModel>;
  __cart__: Relation<CartModel>;
}
