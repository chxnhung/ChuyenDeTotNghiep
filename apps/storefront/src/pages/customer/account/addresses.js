import { useEffect, useState } from "react";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegAddressCard, FaRegEdit } from "react-icons/fa";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { GET_CUSTOMER_ADDRESSES } from "@bavaan/graphql/documents.graphql";
import { UPDATE_ADDRESS } from "@bavaan/graphql/customer/account-address-detail.graphql";
import { CREATE_ADDRESS } from "@bavaan/graphql/customer/address-modal.graphql";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const AddressesPage = () => {
  const [queryGetCustomerAddressReq, customerAddRes] = useLazyQuery(
    GET_CUSTOMER_ADDRESSES
  );
  const [mutationCreateCustomerAddressReq] = useMutation(CREATE_ADDRESS, {});
  const [mutationChangeCustomerAddressReq] = useMutation(UPDATE_ADDRESS, {});
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enableAddAddress, setEnableAddAddress] = useState(false);

  const [addAddressField, setAddressField] = useState({
    fullName: "",
    company: "",
    streetLine1: "", // required
    streetLine2: "",
    city: "",
    province: "",
    postalCode: "",
    countryCode: "", //required
    phoneNumber: "",
    defaultShippingAddress: true,
    defaultBillingAddress: true,
  });
  const [address, setAddress] = useState({
    addresses: [],
  });
  const [isUpdateAddress, setIsUpdateAddress] = useState(false);
  useEffect(() => {
    // set data effect
    let data, dataRes;
    dataRes = customerAddRes;
    ({ data } = customerAddRes);
    if (data && data.activeCustomer) {
      setAddress(data.activeCustomer);
    }

    const { loading, error } = dataRes;

    setLoading(loading ?? false);
    setError(error ?? {});
  }, [customerAddRes]);

  useEffect(() => {
    // get data effect
    queryGetCustomerAddressReq();
  }, []);

  const onChangeInputAddressCustomer = (type, value) => {
    switch (type) {
      case "address-full-name":
        addAddressField.fullName = value;
        break;
      case "address-company":
        addAddressField.company = value;
        break;
      case "address-street-1":
        addAddressField.streetLine1 = value;
        break;
      case "address-street-2":
        addAddressField.streetLine2 = value;
        break;
      case "address-city":
        addAddressField.city = value;
        break;
      case "address-province":
        addAddressField.province = value;
        break;
      case "address-postal-code":
        addAddressField.postalCode = value;
        break;
      case "address-phone-number":
        addAddressField.phoneNumber = value;
        break;
      case "address-country-code":
        addAddressField.countryCode = value;
        break;
      default:
        break;
    }
    setAddressField({ ...addAddressField });
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
          <Tab.Container defaultActiveKey="address">
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
              <Tab.Pane eventKey="address">
                <div className="my-account-area__content">
                  <h3>Billing Address</h3>
                  {address.addresses.map((item, index) => {
                    return (
                      <div key={index} className="mb-5">
                        <address>
                          <p>
                            <strong>{item.fullName}</strong>
                          </p>
                          <p>
                            {item.streetLine1} {item.streetLine2}.{" "}
                            {item.province} , {item.country.name}
                          </p>
                          <p>Mobile: {item.phoneNumber}</p>
                        </address>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            let itemNew = { ...item };
                            itemNew.countryCode = item.country.code;
                            delete itemNew.country;
                            delete itemNew.__typename;
                            setIsUpdateAddress(true);
                            setEnableAddAddress(true);
                            setAddressField(itemNew);
                          }}
                          className="check-btn sqr-btn "
                        >
                          <FaRegEdit /> Edit Address
                        </a>
                      </div>
                    );
                  })}
                  <div className="mt-3">
                    <a
                      className="check-btn sqr-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsUpdateAddress(false);
                        if (!addAddressField.id) {
                          setEnableAddAddress(!enableAddAddress);
                        }
                        setAddressField({});
                      }}
                    >
                      <FaRegAddressCard /> Add New Address
                    </a>
                  </div>
                  {enableAddAddress ? (
                    <div className="mt-3">
                      <div className="account-details-form">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (isUpdateAddress) {
                              // call api update in here
                              mutationChangeCustomerAddressReq({
                                variables: {
                                  input: addAddressField,
                                },
                              })
                                .then(() => {
                                  addToast("Update customer address success.", {
                                    appearance: "success",
                                    autoDismiss: true,
                                  });
                                  window.location.reload(true);
                                })
                                .catch((err) => {
                                  addToast("Update customer address error.", {
                                    appearance: "error",
                                    autoDismiss: true,
                                  });
                                });
                              return;
                            }
                            mutationCreateCustomerAddressReq({
                              variables: {
                                input: addAddressField,
                              },
                            })
                              .then(() => {
                                addToast("Add customer address success.", {
                                  appearance: "success",
                                  autoDismiss: true,
                                });
                                window.location.reload(true);
                              })
                              .catch((err) => {
                                addToast("Add customer address error.", {
                                  appearance: "error",
                                  autoDismiss: true,
                                });
                              });
                          }}
                        >
                          <Row>
                            <Col lg={6}>
                              <div className="single-input-item">
                                <label htmlFor="f-name" className="required">
                                  Full name
                                </label>
                                <input
                                  type="text"
                                  id="f-name"
                                  value={addAddressField.fullName ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-full-name",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="single-input-item">
                                <label htmlFor="company" className="required">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  id="company"
                                  value={addAddressField.company ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-company",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="single-input-item">
                            <label htmlFor="adr" className="required">
                              Street Line 1
                            </label>
                            <input
                              type="text"
                              id="adr"
                              value={addAddressField.streetLine1 ?? ""}
                              onChange={(e) => {
                                onChangeInputAddressCustomer(
                                  "address-street-1",
                                  e.target.value
                                );
                              }}
                              required
                            />
                          </div>
                          <div className="single-input-item">
                            <label htmlFor="adr-2" className="required">
                              Street Line 2
                            </label>
                            <input
                              type="text"
                              id="adr-2"
                              value={addAddressField.streetLine2 ?? ""}
                              onChange={(e) => {
                                onChangeInputAddressCustomer(
                                  "address-street-2",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <Row>
                            <Col lg={3}>
                              <div className="single-input-item">
                                <label htmlFor="city" className="required">
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="city"
                                  value={addAddressField.city ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-city",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="single-input-item">
                                <label htmlFor="state" className="required">
                                  Province
                                </label>
                                <input
                                  type="text"
                                  id="state"
                                  value={addAddressField.province ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-province",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="single-input-item">
                                <label htmlFor="zip" className="required">
                                  Postal code
                                </label>
                                <input
                                  type="text"
                                  id="zip"
                                  value={addAddressField.postalCode ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-postal-code",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="single-input-item">
                                <label htmlFor="country" className="required">
                                  Country Code
                                </label>
                                <input
                                  type="text"
                                  id="country"
                                  value={addAddressField.countryCode ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-country-code",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="single-input-item">
                                <label htmlFor="phoneNum" className="required">
                                  Phone number
                                </label>
                                <input
                                  type="tel"
                                  id="phoneNum"
                                  value={addAddressField.phoneNumber ?? ""}
                                  onChange={(e) => {
                                    onChangeInputAddressCustomer(
                                      "address-phone-number",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="single-input-item">
                            <button>
                              {isUpdateAddress
                                ? "Update address"
                                : "Create address"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutFive>
  );
}

export default AddressesPage;
