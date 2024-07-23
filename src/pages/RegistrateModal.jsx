import React from 'react';
import exit from '../images/Group36.svg';
import ArrowIcon from '../images/arrow-up-right.svg';
import Registration from "./Registration";

const RegistrateModal = ({openModal, handleClose}) => {
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
                    <Registration/>
                </div>
            </div>
        </div>
    );
}

export default RegistrateModal;
