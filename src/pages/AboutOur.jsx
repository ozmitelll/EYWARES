import React from "react";
import ArrowIcon from "../images/arrow-up-right.svg";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AboutOur = ({id,handleOpen}) => {
    const {t} = useTranslation()
    return (
        <div id={id} className='lg:h-screen h-[930px] w-full bg-transparent text-white flex justify-end lg:py-4 mt-8'>
            <div id={'about'} className='lg:w-1/2 sm:w-2/3 flex flex-col justify-center items-end gap-4 lg:pl-8'>
                <p className=' text-4xl font-normal text-left w-full'>
                    {t('about_label')}
                </p>
                <div
                    className='p-6 lg:h-auto md:h-64 h-72 rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 opacity-1 overflow-scroll'>
                    {/*<p className='text-2xl font-normal leading-tight text-left'>*/}
                    {/*    Компания*/}
                    {/*</p>*/}
                    <div className='h-full overflow-auto'>
                        <p className='text-base font-normal leading-snug text-left'>
                            {t('about_first_plate')}
                        </p>
                    </div>
                </div>
                <div
                    className='p-6 lg:h-48 md:h-64 h-72 rounded-xl w-full bg-cardcolor bg-opacity-70 border border-gray-700 opacity-1 overflow-scroll'>
                    {/*<p className=' text-2xl font-normal leading-tight text-left'>*/}
                    {/*    Цель проекта*/}
                    {/*</p>*/}
                    <div className='h-full overflow-auto'>
                        <p className='text-base font-normal leading-snug text-left'
                           dangerouslySetInnerHTML={{ __html: t('about_second_plate') }}>
                        </p>
                    </div>
                </div>
                <div
                    className='w-48 h-48 hexagon text-white'>
                    {localStorage.getItem('auth') != null ? <Link to={'/account'} className={'second-hexagon hover:bg-white transition duration-300 ease-in-out hover:text-black'}>
                            <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
                            <p className='m-0 text-xl font-normal leading-6 '>
                                {t('account_hex_button')}
                            </p>
                        </Link> :
                        <button onClick={handleOpen} className={'second-hexagon hover:bg-white transition duration-300 ease-in-out hover:text-black'}>
                            <img className='w-21 h-21 ' src={ArrowIcon} alt=''/>
                            <p className='m-0 text-xl font-normal leading-6 '>
                                {t('account_hex_button')}
                            </p>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AboutOur;
