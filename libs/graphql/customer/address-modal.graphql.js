import gql from 'graphql-tag';

import { ADDRESS_FRAGMENT } from '../fragments.graphql';

export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;