import { useEffect, useState } from "react";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { GET_ORDER_LIST } from "@bavaan/graphql/customer/account-order-list.graphql";

import { Container } from "react-bootstrap";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { formatterConvertCurrency } from "../../../lib/product";

const OrdersPage = () => {
  const [queryGetOrderReq, orderRes] = useLazyQuery(GET_ORDER_LIST);

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orderList, setOrderList] = useState({ items: [] });

  const router = useRouter();

  useEffect(() => {
    // set data effect
    let data, dataRes;
    dataRes = orderRes;
    ({ data } = orderRes);
    if (data && data.activeCustomer) {
      setOrderList(data.activeCustomer.orders);
    }

    const { loading, error } = dataRes;

    setLoading(loading ?? false);
    setError(error ?? {});
  }, [orderRes]);

  useEffect(() => {
    // get data effect
    queryGetOrderReq();
  }, []);

  return (
    <LayoutFive>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="My Account"
        backgroundImage="/assets/images/example/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>My Account</li>
        </ul>
      </BreadcrumbOne>
      <div className="my-account-area space-mt--r130 space-mb--r130">
        <Container>
          <Tab.Container defaultActiveKey="orders">
            <Nav
              variant="pills"
              className="my-account-area__navigation space-mb--r60"
            >
              <Nav.Item>
                <Link href="/customer/account/dashboard" passHref>
                  <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/customer/account/orders" passHref>
                  <Nav.Link eventKey="orders">Orders</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/customer/account/addresses" passHref>
                  <Nav.Link eventKey="address">Address</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/customer/account/profile" passHref>
                  <Nav.Link eventKey="detail-personal">
                    Detail Personal
                  </Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/customer/account/change-password" passHref>
                  <Nav.Link eventKey="change-credentials">
                    Change credentials
                  </Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <div className="my-account-area__content">
                  <h3>Orders</h3>
                  <div className="myaccount-table table-responsive text-center">
                    {orderList.items.length ? (
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>Order code</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Last updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderList.items.map((item, index) => {
                            const formatter = formatterConvertCurrency(
                              item.currencyCode
                            );
                            return (
                              <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.state}</td>
                                <td>{formatter.format(item.total)}</td>
                                <td>{item.updatedAt}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <span>No orders found.</span>
                    )}
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutFive>
  );
};
export default OrdersPage;
