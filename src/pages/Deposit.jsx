import React, {useState} from 'react';
import Header from "../components/Header";

const Deposit = ({handleOpen, handleClose}) => {
    const [sum, setSum] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div
            className="lg:h-screen md:h-screen h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-4 md:gap-20 gap-4 items-center relative lg:px-16 md:px-16 px-4">
            <Header handleOpen={handleOpen} handleClose={handleClose}/>
            <div
                id="referal"
                className="absolute lg:-top-28 lg:-left-20 -top-24 -left-50 bg-100 lg:w-full md:w-full sm:w-0 h-full rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <div className="flex flex-col justify-center items-center lg:gap-16 md:gap-16 gap-8 w-full">
                <p className="text-white lg:pt-8 md:pt-8 pt-6 lg:text-3xl md:text-3xl text-2xl font-bold leading-snug text-left w-fit">Внести
                    депозит</p>
                <div
                    className="bg-[#222222A8] p-6 lg:w-[616px] md:w-[616px] w-full rounded-lg border border-[#5E5E5E87] flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center w-full gap-3">
                        <label className="w-full text-left text-white text-xl font-normal leading-snug">Сумма
                            депозита</label>
                        <input
                            type="text"
                            placeholder={'Введите сумму депозита'}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-center w-full gap-3">
                        <label className="w-full text-left text-white  text-xl font-normal leading-snug">Адрес
                            реферера</label>
                        <input
                            type="text"
                            placeholder={'Введите адрес'}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button
                        className="h-16 w-full bg-gray-300 border border-gray-400 rounded-lg flex justify-center items-center text-black  text-xl font-bold leading-snug"
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deposit;
