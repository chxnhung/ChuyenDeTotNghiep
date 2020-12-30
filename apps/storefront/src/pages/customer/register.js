import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import LayoutFive from "../../components/Layout/LayoutFive";
import { REGISTER } from "@bavaan/graphql/customer/register.graphql";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { SIGN_IN } from "@bavaan/graphql/customer/sign-in.graphql";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerReq] = useMutation(REGISTER, {});
  const { addToast } = useToasts();
  const router = useRouter();
  const [loginReq] = useMutation(SIGN_IN, {});

  return (
    <LayoutFive>
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
                          firstName,
                          lastName,
                          emailAddress: email,
                          password,
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

                          loginReq({
                            variables: {
                              emailAddress: email,
                              password: password,
                              rememberMe: false,
                            },
                          })
                            .then((data) => {
                              if (data.errors || data.message) {
                                throw {
                                  message: "Incorrect username or password",
                                };
                              } else router.push("/");
                            })
                            .catch((e) => {
                              addToast(
                                e.message || "Cannot login with this customer",
                                {
                                  appearance: "error",
                                  autoDismiss: true,
                                }
                              );
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
                    <Col lg={12} className="space-mb--40">
                      <label htmlFor="regPassword">
                        Password <span className="required">*</span>{" "}
                      </label>
                      <input
                        value={password}
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
    </LayoutFive>
  );
};
export default SignUp;
