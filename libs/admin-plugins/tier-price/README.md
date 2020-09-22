# Bavaan Product Review

A commerce plugin for [Bavaan Marketplace Platform](https://bavaan.com/) that allows customer can review product.

[![Build Status](https://travis-ci.com/bavaan/vendure-review-plugin.svg?branch=master)](#)
[![Coverage Status](https://coveralls.io/repos/github/bavaan/vendure-review-plugin/badge.svg?branch=master)](#)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#) 

## Table of Contents

- [Bavaan Product Review](#bavaan-product-review)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [GraphQL Extensions](#graphql-extensions)
    - [mutation submitProductReview](#mutation-submitproductreview)
  - [Entities](#entities)
  - [Admin UI Extensions](#admin-ui-extensions)
  - [Error Handling](#error-handling)
  - [License](#license)

## Prerequisites

Vendure Social Auth uses authentication tokens, issued on the client using the [Google Sign-In SDK](https://developers.google.com/identity/sign-in/web/sign-in) or the [Facebook Javascript SDK](https://developers.facebook.com/docs/javascript/). On the frontend, you have to guide the user through your application's authentication process, get their consent, and retrieve an access token before you can pass it to the plugin.

## Installation
1. If you haven't already, create your server as described in Vendure's [official docs](https://www.vendure.io/docs/getting-started/)

2. Install the package using [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) package manager:

```sh
npm install @bavaan/vendure-review-plugin
```
```sh
yarn add @bavaan/vendure-review-plugin
```

3. In your `vendure-config.ts` file, initialize the `SocialAuthPlugin` plugin inside the `VendureConfig` object's plugin array:

```typescript
import { ReviewPlugin } from '@bavaan/vendure-review-plugin';

export const config: VendureConfig = {
    plugins: [
       SocialAuthPlugin 
    ]
}
```

## Configuration
// TODO

## GraphQL Extensions
The current version of Vendure Reviews extends the existing schema with a new mutation:

### mutation submitProductReview
Start the Vendure server and then in the Shop API (http://localhost:3000/shop-api) try the following mutation:
```SDL
mutation {
  submitProductReview(input: {
    productId: 2
    summary: "Good tablet"
    body: "The screen is clear, bright and sharp!"
    rating: 5
    authorName: "Joe Smith"
    authorLocation: "London"
  }) {
    id
    state
  }
}
```
The resolver for this mutation verifies the received token's validity with Google and Facebook's servers, and checks the database for a [User](https://www.vendure.io/docs/typescript-api/entities/user/) with an identifier, matching the token. A new [User](https://www.vendure.io/docs/typescript-api/entities/user/) - [Customer](https://www.vendure.io/docs/typescript-api/entities/customer/) pair is created, if a match is not found. An authenticated [Session](https://www.vendure.io/docs/typescript-api/entities/session/) is created for the user.

Parameters:
* *productId* - [Int!](https://www.vendure.io/docs/graphql-api/shop/object-types/#int) - Product Id for review.
* *summary* - [String!](https://www.vendure.io/docs/graphql-api/shop/object-types/#string) - 

Return type: [LoginResult!](https://www.vendure.io/docs/graphql-api/shop/object-types/#loginresult)

## Entities
* product-review

## Admin UI Extensions
// TODO

## Error Handling
// TODO

## License

Vendure Reviews Plugin is licensed under the [MIT](#) license.  
Copyright &copy; 2020, Bavaan Platform



 

