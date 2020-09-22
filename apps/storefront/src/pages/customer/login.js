import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import Link from "next/link";

import LayoutTwo from "@bavaan/storefront-base/src/components/Layout/LayoutTwo";
import { SIGN_IN } from "@bavaan/graphql/customer/sign-in.graphql";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { addToast } = useToasts();
  const [loginReq] = useMutation(SIGN_IN, {});
  const router = useRouter();
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
                    loginReq({
                      variables: {
                        emailAddress: email,
                        password: password,
                        rememberMe: remember,
                      },
                    })
                      .then((data) => {
                        if (data.errors || data.message) {
                          throw { message: "Incorrect username or password" };
                        }
                        router.push("/");
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
                        <h2 className="space-mb--20">Login</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Username or email address"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <button className="lezada-button lezada-button--medium">
                        login
                      </button>
                    </Col>
                    <Col>
                      <input
                        onChange={(e) => {
                          setRemember(e.target === "on");
                        }}
                        type="checkbox"
                      />{" "}
                      <span className="remember-text">Remember me</span>
                      <a href="#" className="reset-pass-link">
                        Lost your password?
                      </a>
                      <Link href="/customer/register">
                        <a className="reset-pass-link">
                          No account? Register here
                        </a>
                      </Link>
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
