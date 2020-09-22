import path from 'path';
import fs from 'fs';
import { DefaultSearchPlugin, examplePaymentHandler, VendureConfig } from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { VendorPlugin } from '@bavaan/vendure-vendor-plugin';
import { SocialAuthPlugin } from '@bavaan/vendure-social-auth-plugin';
import { ReviewsPlugin } from '@bavaan/vendure-reviews-plugin';
import { ProductRecommendationsPlugin } from '@bavaan/vendure-product-recommendations-plugin';
import { TierPricePlugin } from '@bavaan/vendure-tier-price-plugin';
import { BraintreePlugin } from '@bavaan/vendure-braintree-payment-plugin';
import { DomesticShippingPlugin } from '@bavaan/vendure-domestic-shipping-plugin';

import { customAdminUi } from './compile-admin-ui';

const IS_PROD = path.basename(__dirname) === 'dist';

export const config: VendureConfig = {
    apiOptions: {
        hostname: '0.0.0.0',
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        adminApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        adminApiDebug: true,
        shopApiPlayground: {
            settings: { 'request.credentials': 'include' },
        },
        shopApiDebug: true,
    },
    authOptions: {
        sessionSecret: 'jysakgzhw6',
    },
    dbConnectionOptions: {
        type: 'sqlite',
        synchronize: false,
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
        migrations: [getMigrationsPath()],
    },
    /*
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: true, // turn this off for production
        logging: false,
        database: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'admin',
        password: 'secret',
        migrations: [getMigrationsPath()],
    },*/
    paymentOptions: {
        paymentMethodHandlers: [examplePaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: '//swarajshop.staging.com/assets',
            port: 3001,
        }),
        DefaultSearchPlugin,
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            mailboxPort: 3003,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
            },
        }),
        AdminUiPlugin.init({
            hostname: '0.0.0.0',
            apiHost: "swarajshop.staging.com",
            port: 3002,
            app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
        }),
        VendorPlugin.init({
            port: 4200,
        }),
        SocialAuthPlugin.init({
            google: {
                strategyName: 'google',
                clientId: 'xxxx'
            },
            facebook: {
                strategyName: 'facebook',
                apiVersion: 'v6.0',
                appId: 'xxxx',
                appSecret: 'xxxx',
            }
        }),
        ReviewsPlugin,
        ProductRecommendationsPlugin,
        TierPricePlugin,
        BraintreePlugin,
        DomesticShippingPlugin
    ],
};

function getMigrationsPath() {
    const devMigrationsPath = path.join(__dirname, '../migrations');
    const distMigrationsPath = path.join(__dirname, 'migrations');

    return fs.existsSync(distMigrationsPath)
        ? path.join(distMigrationsPath, '*.js')
        : path.join(devMigrationsPath, '*.ts');
}
