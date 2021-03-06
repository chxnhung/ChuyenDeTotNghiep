
import gql from 'graphql-tag';

import { CART_FRAGMENT } from '../fragments.graphql';

export const ADD_PAYMENT = gql`
    mutation AddPayment($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;