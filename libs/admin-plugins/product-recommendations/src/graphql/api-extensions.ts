import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
  }

  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }

  extend type Mutation {
    updateCrossSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
    updateUpSellingProducts(productId: ID!, productIds: [ID!]!): Boolean!
  }
`;

export const shopApiExtensions = gql`
  enum RecommendationType {
    CROSSSELL
    UPSELL
  }

  type ProductRecommendation {
    product: Product!
    recommendation: Product!
    type: RecommendationType!
  }
  extend type Query {
    productRecommendations(productId: ID!): [ProductRecommendation!]!
  }
`;
