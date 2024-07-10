import React from 'react';

const SecondSlide = ({id}) => {
    return (
        <div
            className='relative lg:pl-32 md:pl-0 sm:pl-0 h-screen w-full bg-transparent p-0 mx-auto flex flex-col items-start lg:items-start lg:justify-center justify-center lg:gap-24 gap-8'>
            <div className='flex lg:flex-row flex-col justify-center items-center lg:gap-28 gap-8 '>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Выгодно
                </button>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b  from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Безопасно
                </button>
            </div>
            <div className='flex lg:flex-row flex-col justify-center items-center lg:gap-28 gap-8'>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b  from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Легко
                </button>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b  from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Современно
                </button>
            </div>
            <div className='flex lg:flex-row flex-col justify-center items-center lg:gap-28 gap-8'>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b  from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Чесно
                </button>
                <button disabled={true} className='lg:w-48 w-64 h-16 rounded-md border border-gray-600 bg-gradient-to-b  from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight'>
                    Быстро
                </button>
            </div>
            <div className={'bg-gray w-10 h-10 absolute top-50 right-10 z-50'} id={id}></div>
        </div>
    );
}

export default SecondSlide;
