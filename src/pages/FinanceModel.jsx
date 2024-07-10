import React from 'react';

const FinanceModel = () => {
    return (
        <div className='w-full h-screen bg-transparent flex flex-col items-center justify-center gap-8 pt-20'>
            <p className='lg:text-4xl text-3xl font-normal leading-snug text-center text-white '>
                Финансовая модель
            </p>
            <p className='lg:text-xl text-lg font-normal leading-snug text-center text-white '>
                Общее количество токенов: <br/>
                36 000 000 <br/><br/>
                Стоимость одного токена: <br/>
                1 USDT <br/><br/>
                Стартовый капитал: <br/>
                Вся вырученная сумма от продажи токенов будет <br/>
                направлена на создание продукта, включая найм <br/>
                лучших разработчиков.
            </p>
        </div>
    );
}

export default FinanceModel;
