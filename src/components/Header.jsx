import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import UpArrow from '../images/chevron-down.svg';
import Logo from '../images/eywa-logo-removebg-preview.png';
import OtherLogo from '../images/eywa_logo.svg'
import MenuIcon from '../images/Frame60.svg';
import { useTranslation } from "react-i18next";
import { isAuth } from "../service/auth.service";
import arrow_down from "../images/chevron-down.svg"

const Header = ({ handleOpen, handleClose, handleOpenRegistrate }) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const langButtonRef = useRef(null);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleLangMenu = () => {
        setLangMenuOpen(!langMenuOpen);
    };

    const changeLanguage = (language) => {
        console.log("Changing language to:", language);  // Для отладки
        i18n.changeLanguage(language);
        setLangMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (!menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }

    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentLogo = location.pathname === '/' ? OtherLogo : Logo;
    return (
        <div className="py-6 pb-0 pt-0 flex justify-between items-start w-full bg-transparent">
            <Link to="/">
                <img src={currentLogo} alt="Logo" className="lg:h-48 md:h-32 h-24 w-auto" />
            </Link>
            <div className="flex items-center lg:gap-4 md:gap-4 gap-8 pt-6">
                <div className="relative">
                    <button ref={langButtonRef} onClick={toggleLangMenu}
                            className="text-white bg-transparent hover:bg-white hover:text-black p-2 flex items-center justify-center">
                        {i18n.language.toUpperCase()}
                        <img src={arrow_down} alt={'⯆'}/>
                    </button>
                    {langMenuOpen && (
                        <div className="absolute right-0 mt-2 w-auto bg-[#090909] shadow-xl  z-50">
                            <button onClick={() => changeLanguage('en')} className="text-white p-2 hover:bg-white hover:text-black w-full text-center">EN</button>
                            <button onClick={() => changeLanguage('ru')} className="text-white p-2 hover:bg-white hover:text-black w-full text-center">RU</button>
                            <button onClick={() => changeLanguage('ar')} className="text-white p-2 hover:bg-white hover:text-black w-full text-center">AR</button>
                        </div>
                    )}
                </div>
                {isAuth() ? (
                    <button ref={buttonRef} onClick={toggleMenu}
                            className="w-[210px] flex items-center justify-center gap-4 rounded-lg border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white text-sm font-medium leading-tight p-2 px-6">
                        <span className="text-white font-light leading-none">{t('account_button')}</span>
                        <img src={UpArrow} alt=""/>
                    </button>
                ) : (
                    <button ref={buttonRef} onClick={handleOpenRegistrate}
                            className="w-[210px] h-[42px] rounded-md border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white text-sm font-medium leading-tight p-2 px-12">
                        <span className="text-white font-light leading-none">{t('registration_button')}</span>
                    </button>
                )}

                <button onClick={handleOpen} className="flex items-center gap-2 bg-transparent border-none">
                    <img src={MenuIcon} alt="Menu icon" className="w-8 h-auto"/>
                </button>
            </div>
            {isAuth ? (
                <div ref={menuRef}
                     className={`absolute lg:right-0 md:right-0 mt-20 mr-[120px] ml-20 w-56 bg-[#282828] shadow-md z-50 flex flex-col rounded-lg overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <Link to="/history" className="p-2 text-white font-light hover:underline transition-colors">{t('history_menu_transactions')}</Link>
                    <Link to="/deposit" className="p-2 text-white font-light hover:underline transition-colors">{t('deposit')}</Link>
                    <Link to="/account" className="p-2 text-white font-light hover:underline transition-colors">{t('cabinet')}</Link>
                </div>
            ) : null}
        </div>
    );
};

export default Header;
