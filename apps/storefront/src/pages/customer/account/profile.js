import { useEffect, useState } from "react";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Col, Container, Row } from "react-bootstrap";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { GET_ACTIVE_CUSTOMER } from "@bavaan/graphql/documents.graphql";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { UPDATE_CUSTOMER_DETAILS } from "@bavaan/graphql/customer/account-customer-details.graphql";
import { useRouter } from 'next/router'

const AccountProfilePage = () => {
  const router = useRouter()
  const [queryGetActiveCustomerReq, customerActiveRes] = useLazyQuery(
    GET_ACTIVE_CUSTOMER
  );
  const [mutationChangeCustomerDetailReq] = useMutation(
    UPDATE_CUSTOMER_DETAILS,
    {}
  );
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orderList, setOrderList] = useState({ items: [] });
  const [address, setAddress] = useState({
    addresses: [],
  });
  const [detailPersonal, setDetailPersonal] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  });
  useEffect(() => {
    // set data effect
    let data, dataRes;
    dataRes = customerActiveRes;
    ({ data } = customerActiveRes);
    if (data && data.activeCustomer) {
      setDetailPersonal(data.activeCustomer);
    }else if(data !== undefined && data.activeCustomer === null) {
      console.log(customerActiveRes)
      router.push("/customer/login")
    }
    const { loading, error } = dataRes;

    setLoading(loading ?? false);
    setError(error ?? {});
  }, [customerActiveRes]);

  useEffect(() => {
    queryGetActiveCustomerReq();
  }, []);

  const onChangeInputCustomerDetail = (type, value) => {
    let detailPersonalNext = detailPersonal;
    switch (type) {
      case "personal-detail-first-name":
        detailPersonalNext.firstName = value;
        break;
      case "personal-detail-last-name":
        detailPersonalNext.lastName = value;
        break;
      case "personal-detail-email":
        break;
      case "personal-detail-phone-number":
        detailPersonalNext.phoneNumber = value;
        break;
      default:
        break;
    }
    setDetailPersonal({ ...detailPersonalNext });
  };
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
          <Tab.Container defaultActiveKey="detail-personal">
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
              <Tab.Pane eventKey="detail-personal">
                <div className="my-account-area__content">
                  <h3>Account Details</h3>
                  <div className="account-details-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutationChangeCustomerDetailReq({
                          variables: {
                            input: {
                              firstName: detailPersonal.firstName,
                              lastName: detailPersonal.lastName,
                              phoneNumber: detailPersonal.phoneNumber,
                            },
                          },
                        })
                          .then(() => {
                            addToast("Change customer info success", {
                              appearance: "success",
                              autoDismiss: true,
                            });
                          })
                          .catch((err) => {
                            addToast("Change customer info error.", {
                              appearance: "error",
                              autoDismiss: true,
                            });
                          });
                      }}
                    >
                      <Row>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="first-name" className="required">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              value={detailPersonal.firstName ?? ""}
                              onChange={(e) => {
                                onChangeInputCustomerDetail(
                                  "personal-detail-first-name",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="last-name" className="required">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="last-name"
                              value={detailPersonal.lastName ?? ""}
                              onChange={(e) => {
                                onChangeInputCustomerDetail(
                                  "personal-detail-last-name",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="single-input-item">
                        <label htmlFor="email" className="required">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={detailPersonal.emailAddress ?? ""}
                          onChange={(e) => {
                            onChangeInputCustomerDetail(
                              "personal-detail-email",
                              e.target.value
                            );
                          }}
                          disabled={true}
                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="phoneNum" className="required">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phoneNum"
                          value={detailPersonal.phoneNumber ?? ""}
                          onChange={(e) => {
                            onChangeInputCustomerDetail(
                              "personal-detail-phone-number",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div className="single-input-item">
                        <button>Save Changes</button>
                      </div>
                    </form>
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

export default AccountProfilePage;
