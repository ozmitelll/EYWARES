import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UpArrow from '../images/chevron-down.svg';
import Logo from '../images/eywa-logo-removebg-preview.png';
import MenuIcon from '../images/Frame60.svg';

const Header = ({ handleOpen, handleClose,handleOpenRegistrate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [isAuth, setIsAuth] = useState(localStorage.getItem('auth'));
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };


    useEffect(() => {
        setIsAuth(localStorage.getItem('auth') != null ? true : false)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="py-6 pt-0 flex justify-between items-start w-full bg-transparent">
            <Link to="/">
                <img src={Logo} alt="Logo" className="lg:h-48 md:h-32 h-24 w-auto" />
            </Link>
            <div className={`flex items-center lg:gap-4 md:gap-4 ${isAuth? 'gap-12': 'gap-8'} pt-6`}>
                {isAuth ? <button ref={buttonRef} onClick={toggleMenu}
                                    className=" flex items-center justify-center gap-4 rounded-lg border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight p-2 px-6">
                    <span className="text-white font-light leading-none">Личный аккаунт</span>
                    <img src={UpArrow} alt=""/>
                </button> : <button ref={buttonRef} onClick={handleOpenRegistrate}
                                                    className="h-[42px] rounded-md border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight p-2 px-12">
                <span className="text-white font-light leading-none">Регистрация</span>
                {/*<img src={UpArrow} alt=""/>*/}
            </button>
            }

            <button onClick={handleOpen} className="flex items-center gap-2 bg-transparent border-none">
                    <span className="text-white text-base leading-none"></span>
                    <img src={MenuIcon} alt="Menu icon" className="w-8 h-auto"/>
                </button>
            </div>
            {isAuth ? <div ref={menuRef}
                           className={`absolute lg:right-0 md:right-0 mt-20 mr-[120px] ml-20 w-56 bg-[#282828] shadow-md z-50 flex flex-col rounded-lg overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Link to="/history" className="p-2 text-white font-light hover:underline transition-colors">История
                    транзакций</Link>
                <Link to="/deposit" className="p-2 text-white font-light hover:underline transition-colors">Внести
                    депозит</Link>
                <Link to="/account" className="p-2 text-white font-light hover:underline transition-colors">Личный
                    кабинет</Link>
            </div> : <></>}

        </div>
    );
};

export default Header;
