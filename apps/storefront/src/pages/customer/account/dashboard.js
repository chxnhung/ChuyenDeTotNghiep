import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { GET_ACCOUNT_OVERVIEW } from "@bavaan/graphql/customer/account-dashboard.graphql";
import { SIGN_OUT } from "@bavaan/graphql/customer/account.graphql";

import { Container } from "react-bootstrap";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const DashBoardPage = () => {
  const [queryAccountOverViewReq, accountOverviewRes] = useLazyQuery(
    GET_ACCOUNT_OVERVIEW
  );
  const [mutationSignOutReq] = useMutation(SIGN_OUT, {});
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashBoardData, setDashBoardData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    __typename: null,
    id: null,
    phoneNumber: "",
  });
  const router = useRouter();

  useEffect(() => {
    let data,
      dataRes = {};
    dataRes = accountOverviewRes;
    ({ data } = accountOverviewRes);
    if (data && data.activeCustomer) {
      setDashBoardData(data.activeCustomer);
    }

    const { loading, error } = dataRes;

    setLoading(loading ?? false);
    setError(error ?? {});
  }, [accountOverviewRes]);

  useEffect(() => {
    queryAccountOverViewReq();
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
          <Tab.Container defaultActiveKey="dashboard">
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
              <Tab.Pane eventKey="dashboard">
                <div className="my-account-area__content">
                  <h3>Dashboard</h3>
                  <div className="welcome">
                    <p>
                      Hello,{" "}
                      <strong>
                        {dashBoardData.firstName} {dashBoardData.lastName}
                      </strong>{" "}
                      (If Not <strong>{dashBoardData.firstName} !</strong>{" "}
                      <a
                        className="logout"
                        onClick={(e) => {
                          e.preventDefault();
                          mutationSignOutReq()
                            .then(() => {
                              router.push("/customer/login");
                            })
                            .catch((e) => {
                              addToast("Cannot signout", {
                                appearance: "error",
                                autoDismiss: true,
                              });
                            });
                        }}
                      >
                        Logout
                      </a>
                      )
                    </p>
                  </div>
                  <p>
                    From your account dashboard. you can easily check &amp; view
                    your recent orders, manage your shipping and billing
                    addresses and edit your password and account details.
                  </p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutFive>
  );
};
export default DashBoardPage;
