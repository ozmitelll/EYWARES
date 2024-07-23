import React from 'react';
import ArrowIcon from '../images/arrow-up-right.svg';
import {Link} from "react-router-dom";

const TermToSale = ({handleOpen}) => {
    return (
        <div className="relative h-screen w-full text-white flex lg:justify-end md:justify-end justify-center">
            {/* Movable term box with visible settings */}
            {/*<div*/}
            {/*    id="term"*/}
            {/*    className="absolute top-0 lg:left-0 -rotate-6 -left-40 lg:w-full md:w-full sm:w-0 h-full bg-center rounded-lg -z-50"*/}
            {/*    style={{*/}
            {/*        backgroundSize: 'cover' // Ensures the background covers the div area*/}
            {/*    }}*/}
            {/*>*/}
            {/*</div>*/}
            <div id={'token-sale-terms'}
                 className='lg:w-1/2 md:w-2/3 flex flex-col gap-10 justify-center items-end lg:pl-8 md:pl-8'>
                <p className=' text-4xl font-normal m-0 text-left w-full'>
                    Условия продажи токенов
                </p>
                <div className='p-6 rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 '>
                    <p className=' text-2xl font-normal leading-tight text-left pb-4'>
                        Стоимость одного токена: <b>1 USDT</b>
                        <br/>
                        Минимальная сумма покупки: <b>100 USDT</b>
                    </p>
                    <p className=' text-base font-normal leading-snug text-left indent-4'>
                        - Покупатель соглашается платить 70% от суммы покупки за продвижение продаж токена. <br/>
                    </p>
                    <p className=' text-base font-normal leading-snug text-left indent-4'>
                        - Таким образом, покупатель получает 30 токенов за 100 USDT, из которых 30 USDT идут на
                        кошелек
                        бюджета стартапа. <br/>
                    </p>
                    <p className=' text-base font-normal leading-snug text-left indent-4'>
                        - Остальные 70% распределяются на реферальные вознаграждения и ликвидность мгновенно. <br/>
                    </p>
                </div>
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
    );
}

export default TermToSale;
