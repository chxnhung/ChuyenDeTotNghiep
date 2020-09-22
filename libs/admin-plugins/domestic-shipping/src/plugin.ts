import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { dosmeticShippingEligibilityChecker } from './services/dosmetic-shipping-eligibility-checker';

/**
 * This plugin implements the Dosmetic Shipping Method.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [],
    configuration: config => {
        config.shippingOptions.shippingEligibilityCheckers?.push(dosmeticShippingEligibilityChecker);
        return config;
    }
})
export class DomesticShippingPlugin {}
