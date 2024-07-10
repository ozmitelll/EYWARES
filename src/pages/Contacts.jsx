import React from "react";

const Contacts = () =>{
    return(
        <div className='h-[575px] bg-transparent w-full relative'>
            <div
                id="contacts"
                className="absolute top-0 lg:-left-12 md:-left-16 -left-4 lg:bg-cover md:bg-140 bg-140 lg:w-screen w-screen h-full bg-center rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat',
                    // backgroundSize: '90%' // Ensures the background covers the div area
                }}
            >
            </div>
            <p className={'text-left text-4xl text-white py-12'}>Контакты</p>
        </div>
    )
}

export default Contacts