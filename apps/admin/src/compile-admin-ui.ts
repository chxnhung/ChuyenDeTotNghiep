import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';
import { ReviewsPlugin } from '@bavaan/vendure-reviews-plugin';
import { ProductRecommendationsPlugin } from '@bavaan/vendure-product-recommendations-plugin';
import { TierPricePlugin } from '@bavaan/vendure-tier-price-plugin';
if (require.main === module) {
    // Called directly from command line
    customAdminUi({ recompile: true, devMode: false }).compile?.().then(() => {
        process.exit(0);
    });
}

export function customAdminUi(options: { recompile: boolean; devMode: boolean; }) {
    const compiledAppPath = path.join(__dirname, '../admin-ui');
    if (options.recompile) {
        return compileUiExtensions({
            outputPath: compiledAppPath,
            extensions: [ ReviewsPlugin.uiExtensions, ProductRecommendationsPlugin.uiExtensions, TierPricePlugin.uiExtensions],
            devMode: options.devMode,
        });
    } else {
        return {
            path: path.join(compiledAppPath, 'dist'),
        };
    }
}