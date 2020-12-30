import { Fragment } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "@bavaan/storefront-base/src/lib/product";
import { addToCart } from "@bavaan/storefront-base/src/redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "@bavaan/storefront-base/src/redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare
} from "@bavaan/storefront-base/src/redux/actions/compareActions";
import ProductGridThree from "./ProductGridThree";

const ProductGridThreeWrapper = ({
  products,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClass
}) => {
  const { addToast } = useToasts();
  return (
    <Fragment>
      {products &&
        products.map((product) => {
          const discountedPrice = product.discountFormated
          const productPrice = product.priceFormated
          const cartItem = cartItems.lines.filter(
            (cartItem) => cartItem.id === product.id
          )[0];
          const wishlistItem = wishlistItems.filter(
            (wishlistItem) => wishlistItem.id === product.id
          )[0];
          const compareItem = compareItems.filter(
            (compareItem) => compareItem.id === product.id
          )[0];

          return (
            <ProductGridThree
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              bottomSpace={bottomSpace}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              deleteFromWishlist={deleteFromWishlist}
              addToCompare={addToCompare}
              deleteFromCompare={deleteFromCompare}
              addToast={addToast}
              cartItems={cartItems.lines}
              sliderClass={sliderClass}
            />
          );
        })}
    </Fragment>
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
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductGridThreeWrapper);
