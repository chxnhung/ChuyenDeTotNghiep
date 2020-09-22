import {
  VendurePlugin,
  PluginCommonModule,
  PromotionCondition,
  LanguageCode,
  PromotionOrderAction,
  ID,
} from "@vendure/core";
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { TierPrice } from "./entities/tier-price.entity";
import {
  TierPriceAdminResolver,
  TierPriceShopResolver,
  TierPriceEntityResolver,
} from "./graphql/tier-price.resolver";
import { TierPriceService } from "./graphql/tier-price.service";
import path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

export type TierPriceInput = {
  productVariantId: ID;
  discounts: { quantity: number; price: number }[];
};

const always = new PromotionCondition({
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Always",
    },
  ],
  code: "always",
  args: {},
  check(order, args) {
    return true;
  },
  priorityValue: 10,
});

const applyTierPrice = new PromotionOrderAction({
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Apply tier price configured elsewhere",
    },
  ],
  code: "tier_price",
  args: {},
  execute(order, args, { hasFacetValues }) {
    //TODO
    return 0;
  },
});

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [TierPrice],
  providers: [TierPriceService],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [TierPriceAdminResolver, TierPriceEntityResolver],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [TierPriceShopResolver, TierPriceEntityResolver],
  },
  configuration: (config) => {
    if (!config.promotionOptions.promotionActions) {
      config.promotionOptions.promotionActions = [];
    }

    if (!config.promotionOptions.promotionConditions) {
      config.promotionOptions.promotionConditions = [];
    }

    config.promotionOptions.promotionConditions.push(always);

    config.promotionOptions.promotionActions.push(applyTierPrice);

    config.customFields.ProductVariant.push({
      name: "tierPriceEnabled",
      type: "boolean",
      label: [{ languageCode: LanguageCode.en, value: "Has tier prices" }],
    });

    return config;
  },
})
export class TierPricePlugin {
  static uiExtensions: AdminUiExtension = {
      extensionPath: path.join(__dirname, 'ui'),
      ngModules: [
          {
              type: 'shared' as const,
              ngModuleFileName: 'tier-price-input.module.ts',
              ngModuleName: 'TierPriceInputModule',
          }
      ],
  };
}
