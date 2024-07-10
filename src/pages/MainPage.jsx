import React from 'react';
import {motion, useTransform, useScroll} from 'framer-motion';
import EYWA from '../images/eywaNaming.svg'; // Path to your EYWA image
import ArrowIcon from '../images/arrow-up-right.svg'; // Path to your Arrow Icon

const MainPage = ({ id, handleOpen, handleClose }) => {
    const { scrollY } = useScroll();
    const x = useTransform(scrollY, [0, 1000], [0, -500]); // Adjust the scroll range and x values as needed

    const AccountButton = () => (
        <button
            className='h-48 w-48 rounded-full bg-transparent border border-gray-300 flex flex-col items-center justify-center mt-16 lg:mt-0 sm:mt-0 hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out'>
            <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
            <p className='m-0 text-xl font-normal leading-6 '>
                Аккаунт
            </p>
        </button>
    );

    return (
        <div id={id} className='h-screen bg-transparent w-full'>
            <div className='lg:pt-12 flex md:flex-row flex-col justify-between items-center lg:pr-28 overflow-hidden '>
                <motion.img
                    className='transform transition-transform duration-200 ease-out'
                    src={EYWA} alt=""
                    style={{ x }}
                />
                {/* Account button visible on desktop and larger screens, hidden on tablet and smaller */}
                <div className='hidden lg:block'>
                    <AccountButton/>
                </div>
            </div>
            <div className='flex lg:flex-col md:flex-row sm:flex-row flex-col justify-between gap-4 lg:pt-20 md:pt-56 pt-56 relative overflow-x-hidden pl-2'>
                <div className={'flex flex-col gap-4 justify-center'}>
                    <p className='w-64 text-left text-white'>
                        Децентрализованая сеть для платежных операций
                    </p>
                    <p className='w-64 text-left text-white'>
                        Отправляйте токены друзьям так же быстро, как смайлики
                    </p>
                </div>

                {/* Account button visible on tablet and smaller screens, hidden on desktop */}
                <div className='lg:hidden'>
                    <AccountButton/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
