import React, {useState, useRef} from 'react';

const Tooltip = ({children, price, date, referal_link}) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef();

    const onMouseEnter = () => {
        setIsVisible(true);
    };

    const onMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{position: 'relative'}}>
            {children}
            {isVisible && (
                <div ref={tooltipRef} style={{
                    position: 'absolute',
                    bottom: '70%',
                    left: '50%',
                    transform: 'translateX(-25%)',
                    marginBottom: '10px',
                    padding: '8px',
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '6px',
                    zIndex: 1000,

                }}>
                    {referal_link ? <div className={'flex flex-col justify-center items-start'}>
                            <p className={'font-bold'}>{referal_link}</p>
                            <p className={'font-bold'}>{price}</p>
                            <p className={'text-gray-400'}>{date}</p>
                        </div> :
                        <div>
                            <button className={' flex items-center justify-center gap-4 w-[200px] rounded-lg border border-gray-600 bg-gradient-to-b from-mycolorfrom to-gray-mycolorto text-white  text-sm font-medium leading-tight p-2 px-6'}>Внести депозит</button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default Tooltip