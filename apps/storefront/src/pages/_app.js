import { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import withReduxStore from "@bavaan/storefront-base/src/lib/with-redux-store";
import withApollo from "../lib/with-apollo";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { fetchProducts } from "@bavaan/storefront-base/src/redux/actions/productActions";
import products from "@bavaan/storefront-base/src/data/products.json";
import "@bavaan/storefront-base/src/assets/scss/styles.scss";
import "react-placeholder/lib/reactPlaceholder.css";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
    props.reduxStore.dispatch(fetchProducts(products));
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Fragment>
        <Head>
          <title>HNH | HNUE | Store</title>
        </Head>
        <ToastProvider placement="bottom-left">
          <Provider store={reduxStore}>
            <PersistGate
              loading={<Component {...pageProps} />}
              persistor={this.persistor}
            >
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </Fragment>
    );
  }
}

export default withReduxStore(withApollo(MyApp));