import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity, ProductVariant } from "@vendure/core";
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class TierPrice extends VendureEntity {
  constructor(input?: DeepPartial<TierPrice>) {
    super(input);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ProductVariant, {
    onDelete: "CASCADE",
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  productVariant: ProductVariant;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "float" })
  price: number;
}
