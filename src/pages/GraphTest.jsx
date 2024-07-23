import React, { useEffect, useState } from 'react';
import Predok from '../images/predok.svg';
import Me from '../images/me.svg';
import Me2 from '../images/referalLikeMe2.svg';
import Polygon from '../images/Polygon 12.svg';
import ReferalLikeMe from '../images/referalLikeMe.svg';
// eslint-disable-next-line
import MyReferal from '../images/myRefereal.svg';
import ReferalReferalEmpty from '../images/referalReferalEmpty.svg';
import MyEmptyReferal from '../images/myReferealEmpty.svg';
import Slider from 'react-slick';
import ChevronDown from '../images/chevron-down.svg';
import Tooltip from "../components/Tooltip"; // Замените путь на правильный

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <img src={ChevronDown} alt="Next" className="-rotate-90" />
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <img src={ChevronDown} alt="Previous" className="rotate-90" />
        </div>
    );
}

const GraphTest = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: function(index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };

    return (
        <div className={'w-full py-12'}>
            <div className={'flex flex-col'}>
                {screenWidth < 768 ? (
                    <div className={'flex flex-col justify-center items-center'}>
                        <div className={'flex flex-col justify-center items-center gap-4'}>
                            <img src={Predok} alt="" />
                            <img className={'w-[125px] h-[160px]'} src={Me2} alt={''} />
                        </div>
                        <div className={'w-full pt-4 slider-container'}>
                            <Slider {...settings}>
                                {Array.from({ length: 18 }).map((_, index) => (
                                    <div key={index} className="flex-none w-full">
                                        <div className={'flex flex-col justify-center items-center gap-4'}>
                                            <img src={Me2} alt="" />
                                            <img width={28} height={28} src={Polygon} alt={''} />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={'flex md:gap-8 lg:gap-2'}>
                            <div className={'flex flex-col justify-center items-center'}>
                                <Tooltip referal_link="TGJ**************************JCrTt" price={'900 USDT'} date={'12.04.2024'}>
                                    <img src={Predok} alt="" />
                                </Tooltip>
                                <Tooltip referal_link={'TGJ**************************JCrTt'} price={'900 USDT'} date={'12.04.2024'}>
                                <img src={Me} alt={''} />
                                </Tooltip>
                            </div>
                            <div className={'flex md:flex-col lg:flex-row md:justify-start justify-end items-center gap-4'}>
                                <div className={'flex gap-4 md:w-full lg:w-auto justify-start'}>
                                    {[...Array(4)].map((_, i) => (
                                        <img key={i} src={ReferalLikeMe} alt={''}  />
                                    ))}
                                </div>
                                <div className={'flex gap-4'}>
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src={ReferalLikeMe} alt={''} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={'flex md:flex-col md:gap-8 lg:gap-0 lg:flex-row'}>
                            <div className={'flex md:pl-16'}>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className={'flex flex-col'}>
                                        <div>
                                            <Tooltip>
                                            <img src={MyEmptyReferal} alt={''} />
                                            </Tooltip>
                                        </div>
                                        <div className={'pl-20'}>
                                            <div className={'h-[36px] w-[55px]'}>
                                                <img src={ReferalReferalEmpty} alt={''} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={'flex md:pl-16 lg:pl-0'}>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className={'flex flex-col'}>
                                        <div>
                                            <Tooltip>
                                            <img src={MyEmptyReferal} alt={''} />
                                            </Tooltip>
                                        </div>
                                        <div className={'pl-20'}>
                                            <div className={'h-[36px] w-[55px]'}>
                                                <img src={ReferalReferalEmpty} alt={''} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GraphTest;
