import Swiper from "react-id-swiper";
import HeroSliderThree from "../components/HeroSlider/HeroSliderThree";
import {Container, Row, Col} from "react-bootstrap";
import {SectionTitleThree} from "@bavaan/storefront-base/src/components/SectionTitle";
import {ProductWidgetWrapper} from "@bavaan/storefront-base/src/components/ProductThumb";
import {ProductGridThreeWrapper} from "@bavaan/storefront-base/src/components/ProductThumb";
import {IoIosArrowRoundBack, IoIosArrowRoundForward} from "react-icons/io";
import Countdown from "react-countdown";
import Renderer from "@bavaan/storefront-base/src/components/Countdown/Renderer";
import {
    GET_TOP_SELLERS,
    GET_PRODUCT_ARRIVALS,
    GET_PRODUCT_DEAL_OF_THE_WEEK,
    GET_PRODUCT_FEATURED,
    GET_PRODUCT_LASTEST,
    GET_PRODUCT_NEWS,
    GET_PRODUCT_ON_SALE
} from '@bavaan/graphql/product/product-list.graphql';
import { useQuery } from '@apollo/react-hooks';
import { LayoutFive } from "../components/Layout";
import { CategorySlider } from "@bavaan/storefront-base/src/components/Category";
import {GET_COLLECTIONS} from '@bavaan/graphql/documents.graphql';
import {convertProducts} from '../lib/product';
import {convertCollections} from '../lib/collection';
import {convertBanners} from '../lib/banner';

const Home = () => {
    const queryTopSellers = useQuery(GET_TOP_SELLERS, {});
    const queryGetProductDealOfTheWeek = useQuery(GET_PRODUCT_DEAL_OF_THE_WEEK, {});
    const queryGetProductArrivals = useQuery(GET_PRODUCT_ARRIVALS, {});
    const queryGetProductOnSale = useQuery(GET_PRODUCT_ON_SALE, {});
    const queryGetProductLatest = useQuery(GET_PRODUCT_LASTEST, {});
    const queryGetProductNews = useQuery(GET_PRODUCT_NEWS, {});
    const queryGetProductFeature = useQuery(GET_PRODUCT_FEATURED, {});
    const queryCollections = useQuery(GET_COLLECTIONS, {});
    const params = {
        loop: false,
        slidesPerView: 5,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav">
                <IoIosArrowRoundBack/>
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <IoIosArrowRoundForward/>
            </button>
        ),
        breakpoints: {
            1024: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1
            }
        }
    };
    return (
        <LayoutFive aboutOverlay={false}>
            {/* hero slider */}
            {(queryCollections.loading || !queryCollections.data) ?
                null :
                <HeroSliderThree
                    sliderData={convertBanners(queryCollections.data.collections.items)}
                    spaceBottomClass="space-mb--50"
                />
            }

            {/* category slider */}
            {(queryCollections.loading || !queryCollections.data) ?
                null :
                <CategorySlider
                    categoryData={convertCollections(queryCollections.data.collections.items)}
                    spaceBottomClass="space-mb--r100"
                />
            }

            {/* Best Seller */}
            <div className="element-wrapper space-mt--r130 space-mb--r130">
                <SectionTitleThree
                    title="Best Seller"
                />
                {(queryTopSellers.loading || !queryTopSellers.data) ?
                    null :
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="product-slider-container">
                                    <Swiper {...params}>
                                        <ProductGridThreeWrapper
                                            products={convertProducts(queryTopSellers.data.search.items)}
                                            sliderClass="swiper-slide"
                                        />
                                    </Swiper>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>

            {/* Deal of the week */}
            <div className="element-wrapper space-mt--r130 space-mb--r130">
                {/*<SectionTitleThree*/}
                {/*    title="New Products"*/}
                {/*/>*/}
                <div className="countdown-wrapper text-center">
                    <h3 className="space-mb--r50">Deal of the week</h3>
                    <div className="deal-countdown">
                        <Countdown
                            date={new Date("July 07, 2020 12:12:00")}
                            renderer={Renderer}
                        />
                    </div>
                </div>
                {(queryGetProductDealOfTheWeek.loading || !queryGetProductDealOfTheWeek.data) ?
                    null :
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="product-slider-container">
                                    <Swiper {...params}>
                                        <ProductGridThreeWrapper
                                            products={convertProducts(queryGetProductDealOfTheWeek.data.search.items)}
                                            sliderClass="swiper-slide"
                                        />
                                    </Swiper>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>

            {/* New Arrivals */}
            <div className="element-wrapper space-mt--r130 space-mb--r130">
                <SectionTitleThree
                    title="New Arrivals"
                />
                {(queryGetProductArrivals.loading || !queryGetProductArrivals.data) ?
                    null :
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="product-slider-container">
                                    <Swiper {...params}>
                                        <ProductGridThreeWrapper
                                            products={convertProducts(queryGetProductArrivals.data.search.items)}
                                            sliderClass="swiper-slide"
                                        />
                                    </Swiper>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>

            {/* Featured Products */}
            <div className="element-wrapper space-mt--r130 space-mb--r130">
                <SectionTitleThree
                    title="Featured Products"
                />
                {(queryGetProductFeature.loading || !queryGetProductFeature.data) ?
                    null :
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="product-slider-container">
                                    <Swiper {...params}>
                                        <ProductGridThreeWrapper
                                            products={convertProducts(queryGetProductFeature.data.search.items)}
                                            sliderClass="swiper-slide"
                                        />
                                    </Swiper>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>

            {/* category slider */}
            {(queryCollections.loading || !queryCollections.data) ?
                null :
                <CategorySlider
                    categoryData={convertCollections(queryCollections.data.collections.items)}
                    spaceBottomClass="space-mb--r100"
                />
            }

            {/*On sale, Latest, New*/}
            <Container className="space-mb--r130">
                <Row>
                    {(queryGetProductOnSale.loading || !queryGetProductOnSale.data) ?
                        null :
                        <Col lg={4} md={6} className="space-mb-mobile-only--50">
                            <div className="single-product-widget-slider-container">
                                <h3 className="widget-slider-title">On Sale</h3>
                                <div className="product-widget-container">
                                    <ProductWidgetWrapper
                                        products={convertProducts(queryGetProductOnSale.data.search.items)}/>
                                </div>
                            </div>
                        </Col>
                    }
                    {(queryGetProductLatest.loading || !queryGetProductLatest.data) ?
                        null :
                        <Col lg={4} md={6} className="space-mb-mobile-only--50">
                            <div className="single-product-widget-slider-container">
                                <h3 className="widget-slider-title">Lastest</h3>
                                <div className="product-widget-container">
                                    <ProductWidgetWrapper
                                        products={convertProducts(queryGetProductLatest.data.search.items)}/>
                                </div>
                            </div>
                        </Col>
                    }
                    {(queryGetProductNews.loading || !queryGetProductNews.data) ?
                        null :
                        <Col lg={4} md={6}>
                            <div className="single-product-widget-slider-container">
                                <h3 className="widget-slider-title">News</h3>
                                <div className="product-widget-container">
                                    <ProductWidgetWrapper
                                        products={convertProducts(queryGetProductNews.data.search.items)}/>
                                </div>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </LayoutFive>
    );
};


export default Home;
