import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import { shopApiExtensions } from './graphql/api-extensions';
import { braintreePaymentMethodHandler } from './services/braintree-payment-method';
import { BraintreeResolver } from './graphql/braintree.resolver';

/**
 * This plugin implements the Braintree (https://www.braintreepayments.com/) payment provider.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [],
    configuration: config => {
        config.paymentOptions.paymentMethodHandlers.push(braintreePaymentMethodHandler);
        return config;
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [BraintreeResolver],
    },
})
export class BraintreePlugin {}
