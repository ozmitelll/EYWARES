import React, {useState, useRef, useEffect} from 'react';
import GraphTest from "./GraphTest";
import Header from "../components/Header";

const Account = ({handleOpen, handleClose}) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const contentRef = useRef(null);

    // Function to toggle accordion state and set proper max-height
    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isAccordionOpen ? `${contentRef.current.scrollHeight}px` : '0px';
        }
    }, [isAccordionOpen]);

    return (
        <div
            className="lg:h-screen md:h-screen h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-10 md:gap-8 gap-4 items-center relative lg:px-16 md:px-16 px-4">
            <Header handleOpen={handleOpen} handleClose={handleClose}/>
            <div
                id="referal"
                className="absolute lg:-top-28 lg:-left-20 -top-24 -left-50 bg-100 lg:w-full md:w-full sm:w-0 h-full rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <div className="w-full lg:h-screen md:h-screen h-fit flex flex-col lg:justify-center md:justify-center justify-start items-center lg:gap-16 md:gap-16 gap-6">
                <p className="text-white  lg:text-4xl md:text-4xl text-2xl lg:pt-0 md:pt-0 pt-6  font-semibold leading-tight text-left w-fit">Личный
                    кабинет</p>
                <div className='flex flex-col lg:flex-row justify-center items-end w-full gap-8'>
                    <div
                        className='lg:w-1/2 w-full bg-[#222222] border border-gray-700 rounded-lg p-6 flex flex-col justify-center items-start'>
                        <p className=' text-2xl font-normal py-2'>Баланс токенов: <b>900</b></p>
                        <p className=' text-2xl font-normal py-2'>Сумма депозитов: <b>900</b></p>
                        <p className=' text-2xl font-normal py-2'>Сумма реферальных вознаграждений: <b>900</b>
                        </p>
                        <div onClick={toggleAccordion}
                             className="cursor-pointer w-full text-2xl flex justify-between items-center py-2">
                            История наград
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={`h-5 w-5 transform transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : 'rotate-0'}`}
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                        <div ref={contentRef}
                             className="transition-max-height duration-300 ease-in-out overflow-hidden">
                            <div className=' text-md font-normal pt-2'>
                                Для участия в программе необходима реферальная ссылка.<br/><br/>
                                Перейдя по реферальной ссылке, система предложит привязать кошелек MetaMask или
                                TrustWallet.<br/><br/>
                                Совершив покупку на минимальную сумму, покупатель получит соответствующее количество
                                токенов на свой кошелек и ссылку для создания собственной команды.
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 w-full flex flex-col justify-center items-start gap-6'>
                        <p className=' text-xl font-normal'>Общее число пользователей: <b>900</b></p>
                        <p className=' text-xl font-normal'>Активные пользователи: <b>900</b></p>
                        <p className=' text-xl font-normal'>Общее число депозитов: <b>900</b></p>
                        <p className=' text-xl font-normal'>Общее число реферальных
                            вознаграждений: <b>900</b></p>
                    </div>
                </div>
            </div>
            <GraphTest/>

        </div>
    );
}

export default Account;
