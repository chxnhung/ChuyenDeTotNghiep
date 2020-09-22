import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import {
  Allow,
  Ctx,
  RequestContext,
  ID,
  ProductService,
  Product,
  ProductVariant,
  ProductVariantService,
} from "@vendure/core";
import { Permission } from "@vendure/common/lib/generated-types";

import { TierPriceService } from "./tier-price.service";
import { TierPrice } from "../entities/tier-price.entity";
import { TierPriceInput } from "../plugin";
import { Translated } from "@vendure/core/dist/common/types/locale-types";

@Resolver()
export class TierPriceAdminResolver {
  constructor(
    private tierPriceService: TierPriceService,
    private productVariantService: ProductVariantService
  ) {}

  @Mutation()
  @Allow(Permission.UpdateCatalog)
  async updateProductVariantTierPrices(
    @Ctx() ctx: RequestContext,
    @Args()
    args: {
      productVariantId: ID;
      discounts: TierPriceInput["discounts"];
    }
  ): Promise<Boolean> {
    const discounts = await this.tierPriceService.findAll({
      where: { productVariant: args.productVariantId },
    });

    if (discounts.length < args.discounts.length) {
      this.tierPriceService.create({
        productVariantId: args.productVariantId,
        discounts: args.discounts.slice(
          discounts.length,
          args.discounts.length
        ),
      });
    } else if (args.discounts.length < discounts.length) {
      this.tierPriceService.delete(
        discounts
          .slice(args.discounts.length, discounts.length)
          .map((d) => d.id)
      );
    }

    const updates = [];

    for (let i = 0; i < args.discounts.length; i++) {
      updates.push(
        this.tierPriceService.update(
          discounts[i].id,
          args.discounts[i].quantity,
          args.discounts[i].price
        )
      );
    }

    await Promise.all(updates);

    return true;
  }

  @Mutation()
  @Allow(Permission.UpdateCatalog)
  async updateProductVariantTierPricesBySku(
    @Ctx() ctx: RequestContext,
    @Args()
    args: {
      productVariantSku: string;
      discounts: TierPriceInput["discounts"];
    }
  ): Promise<Boolean> {
    const productVariantId = await this.tierPriceService.findProductVariantIdBySku(
      args.productVariantSku
    );

    let discounts = await this.tierPriceService.findAll({
      where: { productVariant: productVariantId },
    });

    if (discounts.length < args.discounts.length) {
      discounts = discounts.concat(
        await this.tierPriceService.create({
          productVariantId: productVariantId,
          discounts: args.discounts.slice(
            discounts.length,
            args.discounts.length
          ),
        })
      );
    } else if (args.discounts.length < discounts.length) {
      await this.tierPriceService.delete(
        discounts
          .slice(args.discounts.length, discounts.length)
          .map((d) => d.id)
      );
      //won't be accessed below so don't delete them from 'discounts'
    }

    const updates = [];

    for (let i = 0; i < args.discounts.length; i++) {
      updates.push(
        this.tierPriceService.update(
          discounts[i].id,
          args.discounts[i].quantity,
          args.discounts[i].price
        )
      );
    }

    await Promise.all(updates);

    return true;
  }

  @Query()
  async productTierPrices(
    @Ctx() ctx: RequestContext,
    @Args() args: { productId: ID }
  ): Promise<TierPrice[]> {
    return await this.tierPriceService.findByProductId(args.productId);
  }
}

@Resolver()
export class TierPriceShopResolver {
  constructor(private tierPriceService: TierPriceService) {}

  @Query()
  async productTierPrices(
    @Ctx() ctx: RequestContext,
    @Args() args: { productId: ID }
  ): Promise<TierPrice[]> {
    return await this.tierPriceService.findByProductId(args.productId);
  }
}

@Resolver("TierPrice")
export class TierPriceEntityResolver {
  constructor(private productVariantService: ProductVariantService) {}

  @ResolveField()
  async productVariant(
    @Ctx() ctx: RequestContext,
    @Parent() tierPrice: TierPrice
  ): Promise<Translated<ProductVariant>> {
    const productVariant = await this.productVariantService.findOne(
      ctx,
      tierPrice.productVariant.id
    );

    if (!productVariant) {
      throw new Error(
        `Invalid database records for tier price with the id ${tierPrice.id}`
      );
    }

    return productVariant;
  }
}
