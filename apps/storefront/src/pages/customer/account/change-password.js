import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { CHANGE_PASSWORD } from "@bavaan/graphql/customer/account-change-credentials.graphql";

import { Container } from "react-bootstrap";
import { LayoutFive } from "../../../components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";

const ChangePasswordPage = () => {
  const [mutationChangePasswordReq] = useMutation(CHANGE_PASSWORD, {});
  const { addToast } = useToasts();

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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
          <Tab.Container defaultActiveKey="change-credentials">
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
              <Tab.Pane eventKey="change-credentials">
                <div className="my-account-area__content">
                  <div className="account-details-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (
                          changePassword.newPassword ===
                          changePassword.confirmNewPassword
                        ) {
                          mutationChangePasswordReq({
                            variables: {
                              old: changePassword.currentPassword,
                              new: changePassword.newPassword,
                            },
                          })
                            .then(() => {
                              addToast("Change password success", {
                                appearance: "success",
                                autoDismiss: true,
                              });
                              window.location.reload(true);
                            })
                            .catch((err) => {
                              addToast("Change password error.", {
                                appearance: "error",
                                autoDismiss: true,
                              });
                            });
                        } else {
                          addToast(
                            "Confirm password does not match new password.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                        }
                      }}
                    >
                      <fieldset>
                        <legend>Password change</legend>
                        <div className="single-input-item">
                          <label htmlFor="current-pwd" className="required">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-pwd"
                            onChange={(e) => {
                              let changePasswordNew = changePassword;
                              changePasswordNew.currentPassword =
                                e.target.value;
                              setChangePassword(changePasswordNew);
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="new-pwd" className="required">
                                New Password
                              </label>
                              <input
                                type="password"
                                id="new-pwd"
                                onChange={(e) => {
                                  let changePasswordNew = changePassword;
                                  changePasswordNew.newPassword =
                                    e.target.value;
                                  setChangePassword(changePasswordNew);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="confirm-pwd" className="required">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                id="confirm-pwd"
                                onChange={(e) => {
                                  let changePasswordNew = changePassword;
                                  changePasswordNew.confirmNewPassword =
                                    e.target.value;
                                  setChangePassword(changePasswordNew);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
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
export default ChangePasswordPage;
