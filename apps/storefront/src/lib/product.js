// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "popular") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.saleCount - a.saleCount;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "topRated") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.rating - a.rating;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "sale") {
    const saleItems =
      finalProducts &&
      finalProducts.filter((single) => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return (
    finalProducts &&
    finalProducts.slice(0, limit ? limit : finalProducts.length)
  );
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : price;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
          product.category.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product) => product.tag.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter((single) => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) =>
              single.size.filter((single) => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter((v, i, self) => i === self.indexOf(v));
  return individualItemArray;
};

// get individual element object
const getIndividualColorObjectArray = (array) => {
  let individualObjectArray = array.filter((v, i, self) => {
    return (
      i ===
      self.findIndex(
        (t) => t.colorName === v.colorName && t.colorCode === v.colorCode
      )
    );
  });
  return individualObjectArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push({
            colorName: single.color,
            colorCode: single.colorCode
          });
        })
      );
    });
  const individualProductColors = getIndividualColorObjectArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".single-sidebar-widget__list button, .tag-container button, .single-filter-widget__list button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".grid-icons button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};



export const convertProducts = (products,imageSize = {thumb: {w:200,h:300} , full:{w:600,h:800}}) => {
    return products.map((product) => {
            return convertProduct(product,imageSize)
        }
    )
};
export const convertProduct = (product,imageSize = {thumb: {w:200,h:300} , full:{w:600,h:800}}) => {
    const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString()
    const fullImageQuery = new URLSearchParams(imageSize.full).toString()
    const convertedProduct = {
        ...product,
        "id": product.productId,
        "sku": product.sku,
        "name": product.productName,
        "slug": product.slug,
        "price": product.priceWithTax.max,
        "discount": ((product.priceWithTax.max - product.priceWithTax.min) / product.priceWithTax.max ) * 100,
        "new": true,
        "rating": 4,
        "ratingCount": 5,
        "saleCount": 90,
        "category": ["decor"],
        "tag": ["decor"],
        "variation": [
          {
            "color": "black",
            "colorCode": "#333333",
            "image": "/assets/images/product/decor/1.jpg",
            "size": [
              {
                "name": "x",
                "stock": 3
              },
              {
                "name": "m",
                "stock": 2
              },
              {
                "name": "xl",
                "stock": 5
              }
            ]
          },
          {
            "color": "blue",
            "colorCode": "#1e73be",
            "image": "/assets/images/product/decor/2.jpg",
            "size": [
              {
                "name": "x",
                "stock": 4
              },
              {
                "name": "m",
                "stock": 7
              },
              {
                "name": "xl",
                "stock": 9
              },
              {
                "name": "xxl",
                "stock": 1
              }
            ]
          },
          {
            "color": "yellow",
            "colorCode": "#dd9933",
            "image": "/assets/images/product/decor/3.jpg",
            "size": [
              {
                "name": "x",
                "stock": 1
              },
              {
                "name": "m",
                "stock": 2
              },
              {
                "name": "xl",
                "stock": 4
              },
              {
                "name": "xxl",
                "stock": 0
              }
            ]
          }
        ],
        "thumbImage": [
          product.productAsset.preview + "?" + thumbImageQuery
        ],
        "image": [
            product.productAsset.preview + "?" + fullImageQuery
        ],
        "shortDescription": product.description,
        "fullDescription": product.description
    }
    return convertedProduct;
};

export const convertProductsGroupVariant = (products) => {
  return products.map((product) => {
    return convertProductDetail(product);
  });
};

export const convertProductDetail = (
  product,
  imageSize = {
    thumb: {
      w: 200,
      h: 300,
    },
    full: {
      w: 600,
      h: 800,
    },
  }
) => {
  const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString();
  const fullImageQuery = new URLSearchParams(imageSize.full).toString();
  const variantsProduct = product.variants.map((item) => {
    return { ...item };
  });
  const getVariantList = variantsProduct.map((item) => {
    return item;
  });
  const getPrice = getVariantList.map((item) => {
    return item.priceWithTax;
  });
  console.log('getPrice',getPrice)

  const convertedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: getPrice[0],
    discount: 0,
    new: true,
    rating: 4,
    ratingCount: 5,
    variants: {
      productVariantList: product.variants.map((item) => {
        return { ...item };
      }),
    },
    saleCount: 90,
    collections: product.collections,
    category: product.collections.map((collection) => {
      return collection.name;
    }),
    tag: ["decor"],
    thumbImage: product.assets.map((asset) => {
      return asset.preview + "?" + thumbImageQuery;
    }),
    image: product.assets.map((asset) => {
      return asset.preview + "?" + fullImageQuery;
    }),
    shortDescription: product.description,
    fullDescription: product.description,
  };
  return convertedProduct;
};

export const productSkeleton = (imageSize = {thumb: {w:200,h:300} , full:{w:600,h:800}}) => {
  const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString();
  const fullImageQuery = new URLSearchParams(imageSize.full).toString();
  const product = {
      "id": 0,
      "sku": "",
      "name": "",
      "slug": "",
      "price": 0,
      "discount": 0,
      "new": false,
      "rating": 0,
      "ratingCount": 0,
      "saleCount": 0,
      "collections" : [],
      "category":[],
      "tag": [],
      "thumbImage": [],
      "image": [],
      "shortDescription": "",
      "fullDescription": ""
  }
  return product;
};

export const filterShowUpMaxMinProductPrice = (product) => {
  if (product && product.priceWithTax && product.priceWithTax.min) {
    const formatter = formatterConvertCurrency(product.currencyCode);
    if (product.priceWithTax.min === product.priceWithTax.max) {
      return formatter.format(product.priceWithTax.min);
    }
    return `${formatter.format(product.priceWithTax.min)} - ${
      product.priceWithTax.max
    }`;
  }
  if (product.variants && product.variants.productVariantList.length) {
    const productPriceArray = product.variants.productVariantList.map(
      (item) => {
        return { price: item.priceWithTax, formatter: item.formatter };
      }
    );
    if (productPriceArray.length <= 1)
      return `${productPriceArray[0].formatter.format(
        productPriceArray[0].price
      )}`;

    const productPriceSort = productPriceArray.sort(
      (a, b) => a.price - b.price
    );
    const priceMin = productPriceSort[0];
    const priceMax = productPriceSort[productPriceSort.length - 1];
    if (priceMin.price == priceMax.price)
      return priceMin.formatter.format(priceMin.price);
    return `${priceMin.formatter.format(
      priceMin.price
    )} - ${priceMax.formatter.format(priceMax.price)}`;
  }
  return null;
};
