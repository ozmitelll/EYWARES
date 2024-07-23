import React, { useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import MainPage from "./MainPage";
import AboutOur from "./AboutOur";
import TermToSale from "./TermToSale";
import ReferalProgram from "./ReferalProgram";
import Contacts from "./Contacts";
import Header from "../components/Header";
import { throttle } from 'lodash';

import center from '../images/1_animation_.svg';
import pental1 from '../images/2_animation_.svg';
import pental2 from '../images/3_animation_.svg';
import pental3 from '../images/4_animation_.svg';
import pental4 from '../images/5_animation_.svg';
import pental5 from '../images/6_animation_.svg';
import pental6 from '../images/7_animation_.svg';

const GetTransforms = (scrollY) => {
    const y = useTransform(scrollY, [0, 4000], [0, 4000]);
    const rotation = useTransform(scrollY, [0, 2900], [0, 360]);
    // Create opacity transformations for each petal
    const opacities = [
        useTransform(scrollY, [0, 500], [0, 1]), // Petal 1
        useTransform(scrollY, [500, 1000], [0, 1]), // Petal 2
        useTransform(scrollY, [1000, 1500], [0, 1]), // Petal 3
        useTransform(scrollY, [1500, 2000], [0, 1]), // Petal 4
        useTransform(scrollY, [2000, 2500], [0, 1]), // Petal 5
        useTransform(scrollY, [2500, 3000], [0, 1]), // Petal 6
    ];
    return { y, rotation, opacities };
};

const Landing = ({ handleOpen, handleClose, handleOpenRegistrate }) => {
    const { scrollY } = useScroll();
    const { y, rotation, opacities } = GetTransforms(scrollY);

    useEffect(() => {
        const updateSize = throttle(() => {
            // Update any state related to size here if needed
        }, 100);

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <>
            <div className={'w-full h-full lg:px-16 md:px-16 px-4 relative flex flex-col items-center overflow-hidden'}>
                <Header handleOpen={handleOpen} handleClose={handleClose} handleOpenRegistrate={handleOpenRegistrate}/>

                <motion.div
                    className="absolute w-[700px] h-[700px] -z-40"
                    style={{ y, rotate: rotation }}>
                    <img src={center} alt="Center" style={{ position: 'absolute', width: '100%', height: '100%' }}/>
                    {[pental1, pental2, pental3, pental4, pental5, pental6].map((src, index) => (
                        <motion.img
                            key={src}
                            src={src}
                            alt={`Petal ${index + 1}`}
                            style={{ position: 'absolute', width: '100%', height: '100%', opacity: opacities[index] }}
                        />
                    ))}
                </motion.div>

                <MainPage id="anchor1" handleOpen={handleOpenRegistrate}/>
                <AboutOur id="anchor2" handleOpen={handleOpenRegistrate}/>
                <TermToSale handleOpen={handleOpenRegistrate}/>
                <ReferalProgram/>
                <Contacts/>
            </div>
        </>
    );
};

export default Landing;
