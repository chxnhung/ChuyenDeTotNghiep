import { LanguageCode } from '@vendure/common/lib/generated-types';
import { Logger, ShippingEligibilityChecker } from '@vendure/core';

export const dosmeticShippingEligibilityChecker = new ShippingEligibilityChecker({
    code: 'dosmetic-shipping-eligibility-checker',
    description: [{ languageCode: LanguageCode.en, value: 'Checks that the order is dosmetic shipping' }],
    args: {
        orderMinimum: { type: 'int', config: { inputType: 'money' } },
        orderMaximum: { type: 'int', config: { inputType: 'percentage' } },
    },
    check: (order, args) => {
        return order.total >= args.orderMinimum;
    },
});