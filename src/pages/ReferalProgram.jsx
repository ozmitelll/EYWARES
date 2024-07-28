import Graf from '../images/Group38.svg';
import React, {useState, useRef, useLayoutEffect} from 'react';
import ArrowIcon from '../images/chevron-down.svg';
import {useTranslation} from "react-i18next";

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
                <div className='p-6 pt-0' dangerouslySetInnerHTML={{__html:children}}></div>
            </div>
        </div>
    );
};

const ReferalProgram = () => {
    const {t} = useTranslation();
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
                <div className={'bg-cardcolor bg-opacity-70 border border-gray-700 rounded-xl p-6 lg:h-auto md:h-auto h-auto'}>
                    <p className='text-4xl font-normal leading-tight pb-4'>{t('modal_referal')}</p>
                    <p className='text-base leading-snug'>
                        {t('referal_program')}
                    </p>
                </div>
                <Accordion title={t('referal_first_label')}>
                    {t('referal_first_body')}
                </Accordion>
                <Accordion title={t('referal_second_label')}>
                    {t('referal_second_body')}
                </Accordion>
                <Accordion title={t('referal_third_label')}>
                    {t('referal_third_body')}
                </Accordion>
            </div>
            <div className='lg:w-1/2 w-full flex justify-center items-center lg:pb-0 md:pb-0 pb-4'>
                <img src={Graf} alt='Graphical Representation'/>
            </div>
        </div>
    );
};

export default ReferalProgram;
