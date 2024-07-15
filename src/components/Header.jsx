import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UpArrow from '../images/chevron-down.svg';
import Logo from '../images/Group34.svg';
import MenuIcon from '../images/Frame60.svg';
import AccountImage from '../images/accountImage.svg';

const Header = ({ handleOpen, handleClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="py-6 flex justify-between items-center w-full bg-transparent">
            <Link to="/">
                <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-8">
                <button ref={buttonRef} onClick={toggleMenu} className="flex items-center gap-2 bg-transparent border-none">
                    <img src={AccountImage} alt="" className="h-10 w-auto"/>
                    <span className="text-white text-base leading-none">Никнейм</span>
                    <img src={UpArrow} alt=""/>
                </button>
                <button onClick={handleOpen} className="flex items-center gap-2 bg-transparent border-none">
                    <span className="text-white text-base leading-none">Меню</span>
                    <img src={MenuIcon} alt="Menu icon" className="w-8 h-auto"/>
                </button>
            </div>
            <div ref={menuRef} className={`absolute lg:right-0 md:right-0 mt-64 mr-48 w-56 bg-[#282828] shadow-md z-50 flex flex-col rounded-lg overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Link to="/history" className="p-2 text-white font-semibold hover:underline transition-colors">История транзакций</Link>
                <Link to="/deposit" className="p-2 text-white font-semibold hover:underline transition-colors">Внести депозит</Link>
                <Link to="/account" className="p-2 text-white font-semibold hover:underline transition-colors">Личный кабинет</Link>
                <hr/>
                <div className="p-2 text-white font-semibold hover:underline transition-colors">Войти</div>
            </div>
        </div>
    );
};

export default Header;
