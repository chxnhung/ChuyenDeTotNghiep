import { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import LayoutTwo from "@bavaan/storefront-base/src/components/Layout/LayoutTwo";
import { REGISTER } from "@bavaan/graphql/customer/register.graphql";
import { useToasts } from "react-toast-notifications";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerReq] = useMutation(REGISTER, {});
  const { addToast } = useToasts();

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col
              lg={{ offset: 3, span: 6 }}
              className="space-mb-mobile-only--50"
            >
              <div className="lezada-form login-form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    registerReq({
                      variables: {
                        input: {
                          firstName: firstName,
                          lastName: lastName,
                          emailAddress: email,
                          password: password
                        },
                      },
                    })
                      .then((res) => {
                        if (res.errors || res.message) {
                          throw { message: "Cannot register with this email" };
                        } else if (res.data.registerCustomerAccount) {
                          addToast("Success create customer account", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                        } else {
                          throw {
                            message:
                              "Some reason cannot create customer account",
                          };
                        }
                      })
                      .catch((e) => {
                        addToast(e.message || "Cannot connect to server", {
                          appearance: "error",
                          autoDismiss: true,
                        });
                      });
                  }}
                >
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Register</h2>
                        <p>If you don’t have an account, register now!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regFirstName">First name</label>
                      <input
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        type="text"
                        id="regFirstName"
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regLastName">Last name</label>
                      <input
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        type="text"
                        id="regLastName"
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regEmail">
                        Email Address <span className="required">*</span>{" "}
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        id="regEmail"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regEmail">
                        Pass word <span className="required">*</span>{" "}
                      </label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        id="regPassword"
                        required
                      />
                    </Col>
                    <Col lg={12} className="text-center">
                      <button className="lezada-button lezada-button--medium">
                        register
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
}
