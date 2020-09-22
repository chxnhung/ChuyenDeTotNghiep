import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`
  type TierPrice {
    productVariant: ProductVariant!
    quantity: Int!
    price: Float!
  }

  input TierPriceInput {
    quantity: Int!
    price: Float!
  }

  extend type Query {
    productTierPrices(productId: ID!): [TierPrice!]!
  }

  extend type Mutation {
    updateProductVariantTierPrices(
      productVariantId: ID!
      discounts: [TierPriceInput!]!
    ): Boolean!
    updateProductVariantTierPricesBySku(
      productVariantSku: String!
      discounts: [TierPriceInput!]!
    ): Boolean!
  }
`;

export const shopApiExtensions = gql`
  type TierPrice {
    productVariant: ProductVariant!
    quantity: Int!
    price: Float!
  }
  extend type Query {
    productTierPrices(productId: ID!): [TierPrice!]!
  }
`;