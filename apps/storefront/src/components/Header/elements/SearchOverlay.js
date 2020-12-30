import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useLazyQuery } from "@apollo/react-hooks";
import { MdClose } from "react-icons/md";
import { SEARCH_PRODUCT_WITH_NAME } from "@bavaan/graphql/product/product-list.graphql";
import { convertProductsGroupVariant } from "../../../lib/product";
import ProductWidgetWrapper from "../../ProductThumb/ProductWidgetWrapper";
const SearchOverlay = ({ activeStatus, getActiveStatus }) => {
  const router = useRouter();
  const inputEl = useRef(null);
  const [isInput, setIsInput] = useState(false);
  const [isCallQL,setISsCallQL] = useState(false);
  const [intervalObject, setIntervalObject] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [
    searchProductRequest,
    { loading, error, data, refetch },
  ] = useLazyQuery(SEARCH_PRODUCT_WITH_NAME, {
    variables: { productName: inputValue ?? "" },
  });
  useEffect(() => {
    inputEl.current.focus();
  });
  useEffect(() => {
    clearTimeout(intervalObject);
    setIsInput(true);
    setIntervalObject(
      setTimeout(() => {
        searchAction();
      }, 750)
    );
  }, [inputValue]);
  const searchAction = () => {
    if (!isInput) return;
    if ( isCallQL){
      refetch;
      return;
    }
    searchProductRequest();
    setISsCallQL(true);
  };

  const cardProducts = (products = []) => {
    const convertProducts = convertProductsGroupVariant(products).splice(
      0,
      9
    );
    return (
      <ProductWidgetWrapper
        sliderClass="col-md-1 col-lg-4 col-sm-1 mb-4"
        products={convertProducts}
      />
    );
  };
  const cardLoading = () => (
    <Card>
      <Card.Body style={{ display: "flex", justifyContent: "center" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Card.Body>
    </Card>
  );
  return (
    <div className={`search-overlay ${activeStatus ? "active" : ""}`}>
      {/*=======  close icon  =======*/}
      <button
        className="search-overlay__close-icon"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      >
        <MdClose />
      </button>
      {/*=======  End of close icon  =======*/}
      {/*=======  search overlay content  =======*/}
      <div className="search-overlay__content">
        <form
          className="space-mb--20"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/product/search/search-product/?name=" + inputValue);
          }}
        >
          <input
            ref={inputEl}
            type="search"
            placeholder="Search Products..."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </form>
        <div style={{}} className="search-overlay__hint mb-4">
          # Hit enter to search
        </div>
        <div style={{ height: "70vh" }}>
          {loading
            ? cardLoading()
            : !loading && data
            ? cardProducts(data.products.items)
            : null}
        </div>
      </div>
      {/*=======  End of search overlay content  =======*/}
    </div>
  );
};

export default SearchOverlay;
