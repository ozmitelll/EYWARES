import React, {useState} from 'react';
import Header from "../components/Header";
import {useTranslation} from "react-i18next";

import {Web3} from "web3";
import {ContractABI} from "../ABI"
import {Address} from "../ContractAdress";

var web3;
var account;




const Deposit = ({handleOpen, handleClose}) => {
    const {t} = useTranslation();
    const [sum, setSum] = useState(null);
    const [address, setAddress] = useState("");

    const handleRegistrate =  async () => {
        let valid = true;
        let newErrors = { sum: '', address: '' };

        if (!sum || isNaN(sum) || sum < 100) {
            newErrors.sum = 'Сумма должна быть числом не менее 100';
            valid = false;
        }

        if (!address) {
            newErrors.address = 'Введите реферальную ссылку';
            valid = false;
        }



        if (valid) {
            try {
                if (window.ethereum) {
                    try {
                        const accounts = await window.ethereum.request({
                            method: "eth_requestAccounts",
                        });
                        web3 = new Web3(window.ethereum)
                        account = accounts[0];
                        console.log(accounts[0]); //мой кошелек
                    } catch (error) {
                        console.log("Error connecting...");
                    }
                } else {
                    console.log("Download Metamask");
                }

                //////////////////////////////////////////////////////////////

                let contract1 = new web3.eth.Contract(ContractABI, Address);
                let contractToken = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],
                    "0xB6F4FE5E23b559BFDbBb76fCCaeBe6573B3Cb2F9");



                await contractToken.methods.approve(Address, sum * 10 ** 18).send({from: account})
                await contract1.methods.deposit(address,sum * 10 ** 18).send({from: account})


            } catch (e) {
                console.error(`Deposit denied`);
            }
        }

    }

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
                <p className="text-white lg:pt-8 md:pt-8 pt-6 lg:text-3xl md:text-3xl text-2xl font-bold leading-snug text-left w-fit">{t("deposit")}</p>
                <div
                    className="bg-[#222222A8] p-6 lg:w-[616px] md:w-[616px] w-full rounded-lg border border-[#5E5E5E87] flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center w-full gap-3">
                        <label
                            className="w-full text-left text-white text-xl font-normal leading-snug">{t("deposit_sum")}</label>
                        <input
                            type="number"
                            placeholder={t("deposit_sum_placeholder")}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-center w-full gap-3">
                        <label
                            className="w-full text-left text-white  text-xl font-normal leading-snug">{t("deposit_link")}</label>
                        <input
                            type="text"
                            placeholder={t("referal_link_placeholder")}
                            className="w-full p-3 bg-[#282828] border border-[#686868] rounded text-white lg:text-xl md:text-xl text-lg font-bold leading-snug"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button
                        className="h-16 w-full bg-gray-300 border border-gray-400 rounded-lg flex justify-center items-center text-black  text-xl font-bold leading-snug"
                        onClick={handleRegistrate}
                    >
                        {t("deposit_button")}

                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deposit;
