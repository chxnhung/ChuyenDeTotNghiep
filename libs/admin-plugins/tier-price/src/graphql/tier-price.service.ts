import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection, In } from "typeorm";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { ID, assertFound, Product, ProductVariant } from "@vendure/core";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import { TierPrice } from "../entities/tier-price.entity";
import { TierPriceInput } from "../plugin";

@Injectable()
export class TierPriceService {
  constructor(@InjectConnection() private connection: Connection) {}

  findAll(
    options: FindManyOptions<TierPrice> | undefined
  ): Promise<TierPrice[]> {
    return this.connection.getRepository(TierPrice).find(options);
  }

  findByProductVariantSku(productVariantSku: string): Promise<TierPrice[]> {
    return this.connection
      .getRepository(TierPrice)
      .createQueryBuilder("tierPrice")
      .leftJoinAndSelect("tierPrice.productVariant", "productVariant")
      .where("productVariant.sku = :sku", { sku: productVariantSku })
      .getMany();
  }

  findByProductId(productId: ID): Promise<TierPrice[]> {
    return this.connection
      .getRepository(TierPrice)
      .createQueryBuilder("tierPrice")
      .leftJoinAndSelect("tierPrice.productVariant", "productVariant")
      .where("productVariant.productId = :productId", { productId })
      .getMany();
  }

  async findProductVariantIdBySku(sku: string): Promise<ID> {
    return assertFound(
      this.connection.getRepository(ProductVariant).findOne({ where: { sku } })
    ).then((v) => {
      return v.id;
    });
  }

  findOne(recommendationId: ID): Promise<TierPrice | undefined> {
    return this.connection
      .getRepository(TierPrice)
      .findOne(recommendationId, { loadEagerRelations: true });
  }

  async create(input: TierPriceInput): Promise<TierPrice[]> {
    const discounts = [];

    for (const d of input.discounts) {
      const discount = new TierPrice({
        productVariant: await this.connection
          .getRepository(Product)
          .findOne(input.productVariantId),
        quantity: d.quantity,
        price: d.price,
      });

      discounts.push(
        assertFound(this.connection.getRepository(TierPrice).save(discount))
      );
    }

    return Promise.all(discounts);
  }

  async update(id: number, quantity: number, price: number) {
    return this.connection
      .getRepository(TierPrice)
      .update({ id }, { quantity, price });
  }

  async delete(ids: ID[]): Promise<DeletionResponse> {
    try {
      await this.connection
        .createQueryBuilder()
        .delete()
        .from(TierPrice)
        .where({ id: In(ids) })
        .execute();

      return {
        result: DeletionResult.DELETED,
      };
    } catch (e) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }
}
