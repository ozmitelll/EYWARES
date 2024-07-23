import React from 'react';
import {motion, useTransform, useScroll} from 'framer-motion';
import ArrowIcon from '../images/arrow-up-right.svg';
import {Link} from "react-router-dom"; // Path to your Arrow Icon

const MainPage = ({id, handleOpen, handleClose}) => {
    const {scrollY} = useScroll();
    const x = useTransform(scrollY, [0, 1000], [0, -500]); // Adjust the scroll range and x values as needed

    const HexagonButton = () => (
        <div
            className='w-48 h-48 hexagon text-white'>
            {localStorage.getItem('auth') != null ? <Link to={'/account'} className={'second-hexagon hover:bg-white transition duration-300 ease-in-out hover:text-black'}>
                <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
                <p className='m-0 text-xl font-normal leading-6 '>
                    Аккаунт
                </p>
            </Link> :
                <button onClick={handleOpen} className={'second-hexagon hover:bg-white transition duration-300 ease-in-out hover:text-black'}>
                    <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
                    <p className='m-0 text-xl font-normal leading-6 '>
                        Аккаунт
                    </p>
                </button>
            }

        </div>
    )


    return (
        <div id={id} className='h-screen bg-transparent w-full'>
            <div
                className='lg:pt-12 pt-0 flex md:flex-row flex-col justify-between items-center lg:pr-28 overflow-hidden '>
                <motion.div
                    className='transform transition-transform duration-200 ease-out flex items-center justify-center'
                    style={{x}}
                >
                    <span className={'text-9xl text-white '}>EYWA</span>
                </motion.div>


            </div>
            <div
                className='flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center items-end  justify-between gap-4 lg:pt-20 md:pt-56 pt-72 relative overflow-x-hidden pl-2'>
                <div className={'flex flex-col gap-4 justify-center w-full'}>
                    <p className='w-64 text-left text-white'>
                        Децентрализованая сеть для платежных операций
                    </p>
                    <p className='w-64 text-left text-white'>
                        Отправляйте токены друзьям так же быстро, как смайлики
                    </p>
                </div>

                {/* Account button visible on tablet and smaller screens, hidden on desktop */}
                <div className=''>
                    <HexagonButton/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
