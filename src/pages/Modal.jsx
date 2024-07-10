import React from 'react';
import exit from '../images/Group36.svg';
import ArrowIcon from '../images/arrow-up-right.svg';

const Modal = ({openModal, handleClose}) => {
    if (!openModal) return null;


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
            <div className="w-full h-screen px-12 bg-transparent">
                <div className="pt-12 h-12 w-full flex justify-end items-center mb-10 pr-4">
                    <button
                        onClick={handleClose}
                        className="w-24 h-6 bg-transparent border-none flex justify-end items-center"
                    >
                        <img src={exit} alt="" className="w-7.5 h-3"/>
                    </button>
                </div>
                <div className="flex lg:flex-row flex-col">
                    <div
                        className="flex flex-col justify-center items-start lg:gap-12 gap-6 text-white font-montserrat lg:text-6xl md:text-4xl text-3xl font-thin leading-snug">
                        <p className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">О
                            нас</p>
                        <p className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Финансовая
                            модель</p>
                        <p className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Условия
                            продажи токенов</p>
                        <p className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Реферальная
                            программа</p>
                        <p className="hover-underline relative cursor-pointer transition duration-300 ease-in-out hover:underline-offset-[12px]">Контакты</p>
                    </div>

                    <div
                        className="flex lg:justify-center justify-start lg:mt-0 md:mt-10  items-start lg:w-2/5 md:w-2/5 w-full">
                        <button
                            className='h-48 w-48 rounded-full bg-transparent border border-gray-300 flex flex-col items-center justify-center mt-12 lg:mt-16 sm:mt-0 hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out'>
                            <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
                            <p className='m-0 text-xl font-normal leading-6'>
                                Аккаунт
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
