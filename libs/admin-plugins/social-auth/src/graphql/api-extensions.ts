import { gql } from 'apollo-server-core';

export const shopApiExtensions = gql`
    extend type Mutation {
        loginExternal(strategy: String!, token: String!): LoginResult!
    }
`;