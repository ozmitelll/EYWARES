import React from 'react';
import exit from '../images/Group36.svg';
import ArrowIcon from '../images/arrow-up-right.svg';
import {Link} from "react-router-dom";

const Modal = ({openModal, handleClose, handleOpen}) => {
    if (!openModal) return null;

    const handleItemClick = (anchorId) => {
        handleClose();
        setTimeout(() => {
            const element = document.getElementById(anchorId);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }, 300); // Wait for modal close animation
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex justify-center items-center">
            <style>
                {`
  .hover-underline::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: white; /* Change the color based on your theme */
    transition: width 0.3s ease-in-out;
    position: absolute;
    bottom: -3px; /* Adjust depending on the line height and padding of your element */
    left: 0;
  }
  .hover-underline:hover::after {
    width: 100%;
  }
`}
            </style>
            <div className="w-full md:px-12 h-screen bg-transparent">
                <div className="pt-12  h-12 w-full flex justify-end items-center mb-10 pr-4">
                    <button
                        onClick={handleClose}
                        className="w-24 h-6 bg-transparent border-none flex justify-end items-center"
                    >
                        <img src={exit} alt="" className="w-7.5 h-3"/>
                    </button>
                </div>
                <div className="flex px-4  h-full lg:flex-row flex-col sm:justify-start md:justify-start lg:justify-between gap-72 lg:gap-0 md:gap-64">
                    <div
                        className="flex flex-col lg:justify-start justify-center items-start lg:gap-12 gap-6 text-white font-montserrat lg:text-6xl md:text-4xl text-3xl font-thin leading-snug">
                        <p onClick={() => handleItemClick('about')}
                           className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">О
                            нас</p>
                        <p onClick={() => handleItemClick('token-sale-terms')}
                           className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Условия
                            продажи токенов</p>
                        <p onClick={() => handleItemClick('referral-program')}
                           className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Реферальная
                            программа</p>
                        <p onClick={() => handleItemClick('contacts')}
                           className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Контакты</p>
                    </div>

                    <div
                        className="flex lg:justify-end justify-end lg:mt-28 md:mt-10 items-start lg:items-center lg:w-2/5 w-full">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
