import { useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";

import ModalVideo from "react-modal-video";
import { LayoutTwo } from "@bavaan/storefront-base/src/components/Layout";
import { BreadcrumbOne } from "@bavaan/storefront-base/src/components/Breadcrumb";
import { TestimonialOne } from "@bavaan/storefront-base/src/components/Testimonial";
import { BrandLogoOne } from "@bavaan/storefront-base/src/components/BrandLogo";
import testimonialData from "@bavaan/storefront-base/src/data/testimonials/testimonial-one.json";
import brandLogoData from "@bavaan/storefront-base/src/data/brand-logos/brand-logo-one.json";

testimonialData.map((item, index) => {
  item.image = "/assets/images/example/about-us/avatar-ex-" + index + ".png";
  return item;
});
const About = () => {
  const [modalStatus, isOpen] = useState(false);
  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="About"
        backgroundImage="/assets/images/example/about-us/breadcrumb-example.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>About</li>
        </ul>
      </BreadcrumbOne>
      {/* about content */}
      <div className="about-content space-mt--r130 space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={8} className="ml-auto mr-auto">
                {/* section title */}
                <div className="about-title-container text-center">
                  <p className="dark-title space-mb--35">SIMPLY OR WHITE</p>
                  <h2 className="title space-mb--15">Who we are</h2>
                  <p className="title-text">
                    Swarajshop is the leading manufacturer of fashion jewelry
                    worldwide, before-mentioned are the varieties of the product
                    provider as Kundan, Ethnic Jewellery, imitation jewelry, and
                    always offering at competitive prices. We are a one-stop
                    online Portal for women-centric products Worldwide. We are
                    regularly exporting to countries like India, Canada, the
                    USA, Germany, UAE, Dubai, etc. Our brand, ‘Swarajshop,’ has
                    crossed its entire milestone in the world of designer
                    jewelry and sarees. We have satisfied customers all over the
                    world. We are the most trusted and Prime Selling brand on
                    all the big marketplaces in India and internationally.{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* about video content */}
        <div className="about-video-content space-mb--r100">
          <Container>
            <Row>
              <Col lg={10} className="ml-auto mr-auto">
                {/*=======  about video area  =======*/}
                <div
                  className="about-video-bg space-mb--60"
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL +
                      "/assets/images/example/about-us/example-video-bg.png"})`,
                  }}
                >
                  <p className="video-text video-text-left">
                    <Link
                      href="/shop/left-sidebar"
                      as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                    >
                      <a>SWARAJSSHOP</a>
                    </Link>
                  </p>

                  <div className="about-video-content__text-icon d-flex flex-column h-100 justify-content-center">
                    <div className="play-icon text-center space-mb--40">
                      <ModalVideo
                        channel="youtube"
                        isOpen={modalStatus}
                        videoId="feOScd2HdiU"
                        onClose={() => isOpen(false)}
                      />
                      <button onClick={() => isOpen(true)}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/icon/icon-play-100x100.png"
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </button>
                    </div>
                    <h1>OUR STORY</h1>
                  </div>
                  <p className="video-text video-text-right">
                    <Link
                      href="/other/about"
                      as={process.env.PUBLIC_URL + "/other/about"}
                    >
                      <a>OUR STORY</a>
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={10} className="ml-auto mr-auto">
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col md={2}>
                        <div className="about-page-text">
                          <p className="space-mb--35">2020</p>
                        </div>
                      </Col>
                      <Col offset={1}>
                        <Row>
                          <div className="about-page-text">
                            <p className="space-mb--35">
                              Today, We are happy to introduce our ecommerce
                              marketplace with the name swarajshop.com with
                              delivering thousands of smiles each day by our
                              most loved piece of jewelry all over India and
                              internationally.
                            </p>
                          </div>
                        </Row>
                        <Row>
                          <Col md={2}>
                            <div className="about-page-text">
                              <p className="space-mb--35">2019</p>
                            </div>
                          </Col>
                          <Col>
                            <div className="about-page-text">
                              <p className="space-mb--35">
                                In 2019, With our focused research team who
                                always need Swarajshop product to be the largest
                                in the market by maintaining the trends in the
                                jewelry, we came up with added varieties by
                                manufacturing the big Kundan jewelry with the
                                low unit for producing the high quality of
                                beautifully crafted jewelry design
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={2}>
                            <div className="about-page-text">
                              <p className="space-mb--35">2017</p>
                            </div>
                          </Col>
                          <Col>
                            <div className="about-page-text">
                              <p className="space-mb--35">
                                In 2017, Our jewelry should be felt by each
                                jewelry fan despite the wealth matters, so we
                                produced the crafting design to cover all the
                                segments by introducing the isolated mixture of
                                alloy from Zinc and Mazak, to always focus on
                                maintaining the purity for our valued customer
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={2}>
                            <div className="about-page-text">
                              <p className="space-mb--35">2015</p>
                            </div>
                          </Col>
                          <Col>
                            <div className="about-page-text">
                              <p className="space-mb--35">
                                In 2015, Exited the third party connection.
                                Here, we overcome the reliance upon dependencies
                                with starting our manufacturing with Copper
                                Alloy for the piece of jewelry now situated in
                                Malad, Mumbai, which helps us to stand out of
                                the crowd.
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={2}>
                            <div className="about-page-text">
                              <p className="space-mb--35">2010</p>
                            </div>
                          </Col>
                          <Col>
                            <div className="about-page-text">
                              <p className="space-mb--35">
                                In 2010, Swarajshop started its ecommerce
                                marketplace in India, with solely into candle
                                making, and deliberately tie-up with the third
                                party supplier for maintaining the customer
                                needs.
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* <div className="about-widget space-mb--35">
                      <h2 className="widget-title space-mb--25">ADDRESS</h2>
                      <p className="widget-content">
                        1800 Abbot Kinney Blvd. Unit D &amp; E Venice
                      </p>
                    </div>
                    <div className="about-widget space-mb--35">
                      <h2 className="widget-title space-mb--25">PHONE</h2>
                      <p className="widget-content">Mobile: (+88) – 1990</p>
                    </div>
                    <div className="about-widget">
                      <h2 className="widget-title space-mb--25">EMAIL</h2>
                      <p className="widget-content">contact@lezadastore.com</p>
                    </div> */}
                  </Col>
                  <Col md={6}>
                    <div className="about-page-text">
                      <p className="space-mb--35">
                        We help people achieve independence by making it easier
                        to start, run, and grow a business. We believe the
                        future of commerce has more voices, not fewer, so we’re
                        reducing the barriers to business ownership to make
                        commerce better for everyone.
                      </p>
                      <Link
                        href="/shop/left-sidebar"
                        as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                      >
                        <a className="lezada-button lezada-button--medium lezada-button--icon--left">
                          <IoMdAdd /> online store
                        </a>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        {/* testimonial */}
        <TestimonialOne
          testimonialData={testimonialData}
          backgroundImage="/assets/images/example/about-us/bg-rate.png"
        />
        <div className="space-mb--r100"></div>
        {/* brand logo */}
        <BrandLogoOne brandLogoData={brandLogoData} />
      </div>
    </LayoutTwo>
  );
};

export default About;
