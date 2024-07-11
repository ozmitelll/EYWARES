import Graf from '../images/Group38.svg';
import React, {useState, useRef, useLayoutEffect} from 'react';
import ArrowIcon from '../images/chevron-down.svg';

const Accordion = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, contentRef.current?.scrollHeight]);

    return (
        <div
            className='rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 transition-all duration-500'>
            <div
                className='flex justify-between items-center cursor-pointer h-[80px]'
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className='text-xl pl-6'>{title}</p>
                <img
                    src={ArrowIcon}
                    className={`transform transition-transform duration-300 px-6 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    alt='Expand'
                />
            </div>
            <div
                ref={contentRef}
                style={{maxHeight: `${height}px`}}
                className='overflow-hidden transition-all duration-500 ease-in-out'
            >
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ReferalProgram = () => {
    return (
        <div id={'referral-program'} className="pt-4 min-h-screen h-auto w-full bg-transparent text-white flex lg:flex-row flex-col lg:justify-between lg:gap-0 gap-6 items-center relative">
            <div
                id="referal"
                className="absolute top-0 lg:-left-20 -left-50 lg:w-full md:w-0 sm:w-0 h-full bg-center rounded-lg -z-50"
                style={{
                    backgroundRepeat:'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <div  className='lg:w-1/2 w-full flex flex-col ls:gap-7 gap-4 w-[615px] h-auto '>
                <div className={'bg-cardcolor bg-opacity-70 border border-gray-700 rounded-xl p-6 lg:h-[220px] md:h-[220px] h-[305px]'}>
                    <p className='text-4xl font-normal leading-tight pb-4'>Реферальная программа</p>
                    <p className='text-base leading-snug'>
                        Логика реферальной программы заключена в неизменяемый смарт-контракт, доступный в BSC Scan.<br/><br/>
                        Вознаграждения будут автоматически перечисляться на кошелек пригласителя в USDT.
                    </p>
                </div>
                <Accordion title='Авторизация через реферальную ссылку'>
                    Для участия в программе необходима реферальная ссылка. <br/><br/>
                    Перейдя по реферальной ссылке, система предложит привязать кошелек MetaMask или TrustWallet. <br/>
                    Совершив покупку на минимальную сумму, покупатель получит соответствующее количество токенов на свой
                    кошелек и ссылку для создания собственной команды.
                </Accordion>
                <Accordion title='Вознаграждение за приглашение'>
                    Пригласив друга по своей ссылке и совершив покупку, вы получите 25% от суммы покупки
                    приглашенного. <br/><br/>
                    Например, при покупке на 100 USDT, вы получите 25 USDT на свой кошелек.<br/><br/>
                    Вы можете пригласить неограниченное количество людей напрямую. Для получения вознаграждений от
                    следующего уровня, который составляет 15%, необходимо минимум десять прямых приглашений.<br/><br/>
                    <b>Вознаграждение второго уровня:</b><br/> Вы получаете 15% от суммы покупки всех, кого пригласили
                    ваши приглашенные.<br/>При этом ваш прямой приглашенный, который пригласил
                    нового участника, получает 25% от его покупки.<br/><br/>
                    <b>Вознаграждение третьего уровня:</b><br/>
                    10% от суммы покупок всех участников третьего уровня.<br/>
                    Если участник второго уровня выполнил условие и
                    пригласил десятерых покупателей.<br/><br/>
                    <b>Вознаграждение четвертого уровня:</b><br/>
                    5% от суммы покупок всех участников четвертого уровня при
                    условии что участник третьего уровня выполнил условия и
                    пригласил десятерых прямых покупателей.<br/><br/>
                    <b>Пул ликвидности:</b> Все излишки в процентах будут
                    направлены смарт-контрактом в кошелек пула ликвидности
                    на бирже, где любой держатель сможет сразу реализовать
                    свои токены и убедиться в прозрачности системы.

                </Accordion>
            </div>
            <div className='lg:w-1/2 w-full flex justify-center items-center lg:pb-0 md:pb-0 pb-4'>
                <img src={Graf} alt='Graphical Representation'/>
            </div>
        </div>
    );
};

export default ReferalProgram;
