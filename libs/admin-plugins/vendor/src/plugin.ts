// @ts-check
import { Type } from '@vendure/common/lib/shared-types';
import {
    createProxyHandler,
    PluginCommonModule,
    RuntimeVendureConfig,
    VendurePlugin,
} from '@vendure/core';
/**
 * @description
 * Configuration options for the {@link VendorPlugin}.
 *
 * @docsCategory VendorPlugin
 */
export interface VendorPluginOptions {
    /**
     * @description
     * The port on which the server will listen. If not
     */
    port: number;
    /**
     * @description
     * The hostname of the server serving the static admin ui files.
     *
     * @default 'localhost'
     */
    hostname?: string;
    /**
     * @description
     * The hostname of the Vendure server which the admin ui will be making API calls
     * to. If set to "auto", the admin ui app will determine the hostname from the
     * current location (i.e. `window.location.hostname`).
     *
     * @deprecated Use the adminUiConfig property instead
     * @default 'auto'
     */
    apiHost?: string | 'auto';
    /**
     * @description
     * The port of the Vendure server which the admin ui will be making API calls
     * to. If set to "auto", the admin ui app will determine the port from the
     * current location (i.e. `window.location.port`).
     *
     * @deprecated Use the adminUiConfig property instead
     * @default 'auto'
     */
    apiPort?: number | 'auto';
}
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [],
    configuration: config => VendorPlugin.configure(config),
})
export class VendorPlugin {
    private static options: VendorPluginOptions;
    /**
     * @description
     * Set the plugin options
     */
    static init(options: VendorPluginOptions): Type<VendorPlugin> {
        this.options = options;
        return VendorPlugin;
    }
    /** @internal */
    static async configure(config: RuntimeVendureConfig): Promise<RuntimeVendureConfig> {
        config.apiOptions.middleware.push({
            handler: createProxyHandler({
                hostname: this.options.hostname,
                port: this.options.port,
                route: 'vendor',
                label: 'Vendor UI',
                basePath: 'admin',
            }),
            route: '/vendor',
        });
        return config;
    }
}