import { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutFive } from "../../components/Layout";
import { getDiscountPrice } from "@bavaan/storefront-base/src/lib/product";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import ReactPlaceholder from 'react-placeholder';
import {
  ImageGalleryBottomThumb,
  ProductDescription,
  ProductDescriptionTab
} from "@bavaan/storefront-base/src/components/ProductDetails";
import { addToCart } from "@bavaan/storefront-base/src/redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "@bavaan/storefront-base/src/redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare
} from "@bavaan/storefront-base/src/redux/actions/compareActions";

import {GET_PRODUCT_DETAIL} from '@bavaan/graphql/product/product-detail.graphql';
import {convertProductDetail, productSkeleton} from '../../lib/product';
import {convertCollection} from '../../lib/collection';

import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';

const ProductDetailPlaceHolder = (
  <div>
    <TextBlock rows={10} color="#e2e2e2"/>
    <div className="product-details space-mt--r100 space-mb--r100">
      <Container>
        <Row>
          <Col lg={6} className="space-mb-mobile-only--50">
            {/* image gallery bottom thumb */}
            <MediaBlock rows={40} color="#e2e2e2"/>
          </Col>

          <Col lg={6}>
            {/* product description */}
            <TextBlock rows={30} color="#e2e2e2"/>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* product description tab */}
            <TextBlock rows={15} color="#e2e2e2"/>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

const ProductDetail = ({
  cartItems,
  wishlistItems,
  compareItems,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare
}) => {
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });
  const router = useRouter();
  const queryProductDetail = useQuery(GET_PRODUCT_DETAIL, {variables:{slug:router.query.slug}});

  const product = queryProductDetail.data  ? convertProductDetail(queryProductDetail.data.product) : productSkeleton();

  const { addToast } = useToasts();
  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount
  ).toFixed(2);

  const productPrice = product.price.toFixed(2);
  const cartItem = cartItems.filter(
    (cartItem) => cartItem.id === product.id
  )[0];
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];
  const compareItem = compareItems.filter(
    (compareItem) => compareItem.id === product.id
  )[0];
  const currentCollection = product.collections.length ? convertCollection(product.collections.slice(-1).pop(),{w:1920,h:380}) : null
  return (
    <LayoutFive>
      {/* breadcrumb */}
      <ReactPlaceholder customPlaceholder={ProductDetailPlaceHolder} ready={!(queryProductDetail.loading || !queryProductDetail.data)}>
        <BreadcrumbOne
          pageTitle={product.name}
          backgroundImage={currentCollection ? currentCollection.image : null}
        >
          <ul className="breadcrumb__list">
            <li>
              <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                <a>Home</a>
              </Link>
            </li>
            {product.collections.map((collection) => {
                collection = convertCollection(collection);
                return (
                  <li>
                    <Link
                      href={collection.url}
                      as={process.env.PUBLIC_URL + collection.url}
                    >
                      <a>{collection.name}</a>
                    </Link>
                  </li>
                )
            })}
            <li>{product.name}</li>
          </ul>
        </BreadcrumbOne>

        {/* product details */}
        <div className="product-details space-mt--r100 space-mb--r100">
          <Container>
            <Row>
              <Col lg={6} className="space-mb-mobile-only--50">
                {/* image gallery bottom thumb */}
                <ImageGalleryBottomThumb
                  product={product}
                  wishlistItem={wishlistItem}
                  addToast={addToast}
                  addToWishlist={addToWishlist}
                  deleteFromWishlist={deleteFromWishlist}
                />
              </Col>

              <Col lg={6}>
                {/* product description */}
                <ProductDescription
                  product={product}
                  productPrice={productPrice}
                  discountedPrice={discountedPrice}
                  cartItems={cartItems}
                  cartItem={cartItem}
                  wishlistItem={wishlistItem}
                  compareItem={compareItem}
                  addToast={addToast}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  deleteFromWishlist={deleteFromWishlist}
                  addToCompare={addToCompare}
                  deleteFromCompare={deleteFromCompare}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* product description tab */}
                <ProductDescriptionTab product={product} />
              </Col>
            </Row>
          </Container>
        </div>
      </ReactPlaceholder>
    </LayoutFive>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
