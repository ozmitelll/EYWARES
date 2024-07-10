import React from "react";
import ArrowIcon from "../images/arrow-up-right.svg";

const AboutOur = ({id}) => {
    return (
        <div id={id} className='lg:h-screen h-[930px] w-full bg-transparent text-white flex justify-end lg:py-4 mt-8'>
            <div className='lg:w-1/2 sm:w-2/3 flex flex-col justify-center gap-4 lg:pl-8  lg:pr-24'>
                <p className=' text-4xl font-normal text-left'>
                    О нас
                </p>
                <div
                    className='p-6 lg:h-48 md:h-64 h-72 rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 opacity-1'>
                    <p className='text-2xl font-normal leading-tight text-left'>
                        Компания
                    </p>
                    <p className='pt-4 text-base font-normal leading-snug text-left'>
                        Мы являемся компанией, активно развивающейся в области блокчейн-технологий, особенно в сфере
                        финансовых услуг. Мы видим огромный потенциал децентрализованных сетей для платежных
                        операций, которые могут вскоре вытеснить традиционные банковские продукты.
                    </p>
                </div>
                <div
                    className='p-6 lg:h-48 md:h-64 h-72 rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 opacity-1'>
                    <p className=' text-2xl font-normal leading-tight text-left'>
                        Цель проекта
                    </p>
                    <p className='pt-4 pb-2 text-base font-normal leading-snug text-left'>
                        Создать простой и безопасный мессенджер, который позволит пользователям отправлять токены своим
                        контактам так же легко, как отправлять смайлики. Помимо этого, мы планируем внедрить
                        дополнительные услуги, такие как личный менеджер для пользователей.
                    </p>
                </div>
                <button
                    className='h-48 w-48 rounded-full bg-transparent border border-gray-300 flex flex-col items-center justify-center hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out'>
                    <img src={ArrowIcon} alt='Start' className='w-21 h-21'/>
                    <p className='m-0  text-xl font-normal leading-tight'>
                        Начать
                    </p>
                </button>
            </div>
        </div>
    )
}

export default AboutOur;
