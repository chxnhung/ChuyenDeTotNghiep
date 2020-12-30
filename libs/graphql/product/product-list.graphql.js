import gql from 'graphql-tag';

import { ASSET_FRAGMENT } from '../fragments.graphql';

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                slug
                sku
                productName
                description
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
            totalItems
            facetValues {
                count
                facetValue {
                    id
                    name
                    facet {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_TOP_SELLERS = gql`
    query GetTopSellers {
        search(input: {
            take: 10,
            groupByProduct: true,
            sort: {
                price: ASC
            }
            skip: 10
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_COLLECTION = gql`
    query GetCollection($id: ID, $slug: String) {
        collection(id: $id, slug: $slug) {
            id
            name
            slug
            description
            featuredAsset {
                ...Asset
            }
            breadcrumbs {
                id
                slug
                name
            }
            children {
                id
                slug
                featuredAsset {
                    ...Asset
                }
                name
            }
        }
    }
    ${ASSET_FRAGMENT}
`;



export const GET_PRODUCT_DEAL_OF_THE_WEEK = gql`
    query GetProductDealOfTheWeek {
        search(input: {
            take: 10,
            groupByProduct: true,
            sort: {
                price: ASC
            }
            skip: 20
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_PRODUCT_ARRIVALS = gql`
    query GetProductArrivals {
        search(input: {
            take: 10,
            groupByProduct: true,
            sort: {
                price: ASC
            }
            skip: 30
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_PRODUCT_ON_SALE = gql`
    query GetProductOnSale {
        search(input: {
            take: 5,
            groupByProduct: true,
            sort: {
                price: ASC
            }
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_PRODUCT_LASTEST = gql`
    query GetProductLatest {
        search(input: {
            take: 5,
            groupByProduct: true,
            sort: {
                price: ASC
            }
            skip: 40
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_PRODUCT_NEWS = gql`
    query GetProductNews {
        search(input: {
            take: 5,
            groupByProduct: true,
            sort: {
                price: ASC
            }
            skip: 5
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const GET_PRODUCT_FEATURED = gql`
    query GetProductFeature {
        search(input: {
            take: 10,
            groupByProduct: true,
            sort: {
                price: ASC
            }
        }) {
            items {
                productId
                slug
                sku
                description
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

export const SEARCH_PRODUCT_WITH_NAME = gql`
  query searchProductWithName($options: ProductListOptions!) {
    products(options: $options) {
      items {
        slug
        id
        name
        description
        variants {
          id
          name
          price
          priceWithTax
          sku
          currencyCode
        }
        featuredAsset {
          ...Asset
        }
        assets {
          ...Asset
        }
        collections {
          id
          name
          slug
          featuredAsset {
            ...Asset
          }
          breadcrumbs {
            id
            name
          }
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;