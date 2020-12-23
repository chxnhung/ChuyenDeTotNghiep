import { VendurePlugin, PluginCommonModule, ID, LanguageCode} from "@vendure/core";
import { adminApiExtensions, shopApiExtensions } from './graphql/api-extensions';
import { ProductRecommendation, RecommendationType} from "./entities/product-recommendation.entity";
import { ProductRecommendationAdminResolver, ProductRecommendationShopResolver, ProductRecommendationEntityResolver} from "./graphql/product-recommendations.resolver";
import { ProductRecommendationService } from "./graphql/product-recommendations.service";
import path from 'path';
import { AdminUiExtension } from '@bavaan/ui-devkit/compiler';

export type ProductRecommendationInput = {
  product: ID;
  recommendation: ID;
  type: RecommendationType;
};

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ProductRecommendation],
  providers: [ProductRecommendationService],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [
      ProductRecommendationAdminResolver,
      ProductRecommendationEntityResolver,
    ],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [
      ProductRecommendationShopResolver,
      ProductRecommendationEntityResolver,
    ],
  },
  configuration: (config) => {
    config.customFields.Product.push({
      type: "boolean",
      name: "productRecommendationsEnabled",
      label: [
        { languageCode: LanguageCode.en, value: "Has product recommendations" },
      ],
    });
    return config;
  },
})
export class ProductRecommendationsPlugin {
  static uiExtensions: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'shared' as const,
        ngModuleFileName: "product-recommendations-input.module.ts",
        ngModuleName: "ProductRecommendationsInputModule",
      }
    ],
  };
}
