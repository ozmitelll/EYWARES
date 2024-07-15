import React, {useState, useEffect} from 'react';
import {motion, useTransform, useScroll} from 'framer-motion';
import MainPage from "./MainPage";
import SecondSlide from "./SecondSlide";
import AboutOur from "./AboutOur";
import FinanceModel from "./FinanceModel";
import TermToSale from "./TermToSale";
import ReferalProgram from "./ReferalProgram";
import Contacts from "./Contacts";
import Circle from '../images/7.png';
import Header from "../components/Header";

const pointsDesktop = [
    {start: 0, end: 800, x: 0, y: 0, scale: 1},
    {start: 800, end: 1300, x: 700, y: 700, scale: 2.6},
    {start: 1300, end: 1700, x: -800, y: 1200, scale: 3.3},
    {start: 2300, end: 3000, x: -50, y: 2250, scale: 4},
    {start: 2600, end: 2700, x: -50, y: 2250, scale: 14},
];

const pointsTablet = [
    {start: 0, end: 600, x: 0, y: 0, scale: 0.8},
    {start: 1000, end: 1100, x: 400, y: 1100, scale: 2},
    {start: 1500, end: 2400, x: -550, y: 1550, scale: 2},
    {start: 3000, end: 4000, x: 0, y: 3000, scale: 3},
    {start: 4000, end: 4100, x: 0, y: 3000, scale: 30},
];

const pointsMobile = [
    {start: 0, end: 1200, x: 0, y: 0, scale: 0.7},
    {start: 1200, end: 2000, x: 250, y: 1350, scale: 2},
    {start: 2000, end: 2500, x: -300, y: 2100, scale: 2},
    {start: 3000, end: 3200, x: 0, y: 3050, scale: 3.5},
    {start: 3200, end: 3300, x: 0, y: 3050, scale: 10},
];

const GetTransforms = (scrollY, points) => {
    const x = useTransform(
        scrollY,
        points.flatMap((point, index) => (index < points.length - 1 ? [point.start, points[index + 1].start] : [])),
        points.flatMap((point, index) => (index < points.length - 1 ? [point.x, points[index + 1].x] : []))
    );

    const y = useTransform(
        scrollY,
        points.flatMap((point, index) => (index < points.length - 1 ? [point.start, points[index + 1].start] : [])),
        points.flatMap((point, index) => (index < points.length - 1 ? [point.y, points[index + 1].y] : []))
    );

    const scale = useTransform(
        scrollY,
        points.flatMap((point, index) => (index < points.length - 1 ? [point.start, points[index + 1].start] : [])),
        points.flatMap((point, index) => (index < points.length - 1 ? [point.scale, points[index + 1].scale] : []))
    );

    const opacity = useTransform(scrollY, [points[points.length - 1].end, points[points.length - 1].end + 10], [1, 0]);

    return {x, y, scale, opacity};
};

const Landing = ({handleOpen, handleClose}) => {
    const {scrollY} = useScroll();
    const [points, setPoints] = useState(pointsDesktop);

    useEffect(() => {
        const updatePoints = () => {
            if (window.innerWidth < 768) {
                setPoints(pointsMobile);
            } else if (window.innerWidth < 1024) {
                setPoints(pointsTablet);
            } else {
                setPoints(pointsDesktop);
            }
        };

        window.addEventListener('resize', updatePoints);
        updatePoints();

        return () => {
            window.removeEventListener('resize', updatePoints);
        };
    }, []);

    const {x, y, scale, opacity} = GetTransforms(scrollY, points);

    return (
        <>
            <div className={'w-full h-full lg:px-16 md:px-16 px-4 relative flex flex-col items-center overflow-hidden'}>
                <Header handleOpen={handleOpen} handleClose={handleClose}/>

                <motion.img
                    src={Circle}
                    alt="Animated Circle"
                    className="absolute w-[414px] h-[414px] lg:mt-24 md:mt-24 lg:ml-16 -z-40"
                    style={{x, y, scale, opacity}}
                />
                <MainPage id="anchor1"/>
                <SecondSlide id="anchor2"/>
                <AboutOur id="anchor3"/>
                <FinanceModel id="anchor4"/>
                <TermToSale/>
                <ReferalProgram/>
                <Contacts/>
            </div>
        </>

    );
};

export default Landing;
