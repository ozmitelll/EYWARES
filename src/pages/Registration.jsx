import React, {useState} from 'react';
import x from "../images/x.svg"
import {useTranslation} from "react-i18next";

const Registration = ({handleOpen, handleClose}) => {
    const {t} = useTranslation();
    const [sum, setSum] = useState(null);
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({ sum: '', address: '' });

    const handleRegistrate = () => {
        let valid = true;
        let newErrors = { sum: '', address: '' };

        // Validate sum: must be a number and not less than 100
        if (!sum || isNaN(sum) || sum < 100) {
            newErrors.sum = 'Сумма должна быть числом не менее 100';
            valid = false;
        }

        // Validate address: must not be null
        if (!address) {
            newErrors.address = 'Введите реферальную ссылку';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            localStorage.setItem('auth', true);
            window.location.reload();
        }
    }

    return (
        <div
            className="lg:h-screen md:h-screen h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-4 md:gap-20 gap-4 items-center relative lg:px-16 md:px-16 px-4">
            <div className="flex flex-col justify-center items-center lg:gap-16 md:gap-16 gap-8 w-full pt-16">
                <div
                    className="bg-[#222222A8] p-6 lg:w-[616px] md:w-[616px] w-full rounded-lg border border-[#5E5E5E87] flex flex-col items-center gap-6">
                    <div className={'flex items-center justify-center relative w-full'}>
                        <p className="text-white lg:text-3xl md:text-3xl text-2xl font-bold leading-snug text-left w-fit">{t("registration_button")}</p>
                        <button onClick={handleClose}
                                className="w-24 h-6 absolute right-0 bg-transparent border-none flex justify-end items-center">
                            <img src={x} alt="" className="w-4 h-4"/>
                        </button>
                    </div>
                    <div className="flex flex-col items-center w-full gap-3">
                        <div className={'flex justify-between items-center w-full'}>
                            <label className="w-full text-left text-white text-xl font-normal leading-snug">{t("deposit_sum")}</label>
                        </div>
                        <input
                            type="number"
                            placeholder={t("deposit_sum_placeholder")}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                        />
                        {errors.sum && <p className="text-red-500 text-sm">{errors.sum}</p>}
                    </div>
                    <div className="flex flex-col items-center w-full gap-3">
                        <label className="w-full text-left text-white text-xl font-normal leading-snug">{t("referal_link")}
                            </label>
                        <input
                            type="text"
                            placeholder={t("referal_link_placeholder")}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <button
                        className="h-16 w-full bg-gray-300 border border-gray-400 rounded-lg flex justify-center items-center text-black text-xl font-bold leading-snug"
                        onClick={handleRegistrate}
                    >
                        {t("deposit_button")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;
