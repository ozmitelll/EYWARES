import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {useTranslation} from "react-i18next";

import {Web3} from "web3";
import {ContractABI} from "../ABI"
import {Address} from "../ContractAdress";
import {parseInt} from "lodash";

var window1;
var web3;
var account;


const History = ({handleOpen, handleClose}) => {
    const {t} = useTranslation()
    const [transations, setTransations] = useState([
        {data: '15.01.2023', sum: 250.75, type: 'credit'},
        {data: '20.02.2023', sum: 340.50, type: 'debit'},
        {data: '05.03.2023', sum: 150.00, type: 'transfer'},
        {data: '10.04.2023', sum: 475.25, type: 'credit'},
        {data: '12.05.2023', sum: 60.30, type: 'debit'},
    ]);

    const addTransaction = (data, sum, type) => {
        setTransations(prevTransactions => [
            ...prevTransactions,
            {
                data,
                sum,
                type
            }
        ]);
    };

    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    useEffect(() => {
        // for (let i = 0; i < 2; i++) {
        //     const today = new Date();
        //     today.setDate(today.getDate() + i);
        //     //Change transaction list ***TODO
        //     addTransaction(1111, Math.random() * 1000, 'transaction');
        //
        // }
        ConnectWalletMetamask();

        const handleResize = () => {
            setWidthWindow(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const ConnectWalletMetamask = async () => {
        let temp = []
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


            let contract1 = new web3.eth.Contract(ContractABI, Address);

            //история транзакций моя
            contract1.events.Deposit({
                filter: {user: "0x8da842318e07b086bffd865bc54672ae5f80330a"},
                fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                    temp.push({
                        data:new Date(parseInt(event?.returnValues[3]) * 1000).toJSON(),
                        sum:parseInt(event?.returnValues[1]) / 10 ** 18,
                        type:"deposit"
                    })

                })

        } catch (e) {
            console.error(`History error!`);
        }
        setTransations(prevTransactions => [...prevTransactions, ...temp]);

    }

    return (
        <div
            className="lg:h-auto md:h-auto h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-8 md:gap-20 gap-4 items-center relative lg:px-16 md:px-16 px-4 pb-16">
            <Header handleOpen={handleOpen} handleClose={handleClose}/>

            <div
                id="referal"
                className="absolute lg:-top-28 lg:-left-20 -top-24 -left-50 bg-100 lg:w-full md:w-full sm:w-0 h-full rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <p className="text-white py-6 lg:text-3xl md:text-3xl text-2xl font-semibold text-left w-fit">{t('history_menu_transactions')}</p>
            {widthWindow < 500 ?
                <div className={'w-full flex flex-col gap-6 pb-6'}>
                    {transations.map((item,index) => (
                        <div key={index}
                             className={'bg-[#191919] h-[138px] text-lg flex flex-col justify-between p-4 rounded-xl w-full'}>
                            <p>{t("table_date")}: <b>{item.data}</b></p>
                            <p>{t("table_amount")}: <b>{item.sum}</b></p>
                            <p>{t("table_type")}: <b>{item.type}</b></p>
                        </div>
                    ))}
                </div>
                : <table
                    className="w-full text-white table-fixed lg:text-2xl md:text-xl text-lg text-center border-collapse">
                    <thead>
                    <tr className="bg-[#191919] h-[55px] ">
                        <th className="rounded-l-lg font-normal ">{t("table_date")}</th>
                        <th className={'font-normal'}>{t("table_amount")}</th>
                        <th className="rounded-r-lg font-normal">{t("table_type")}</th>
                    </tr>
                    <tr className="h-6 bg-transparent"></tr>
                    </thead>
                    <tbody>
                    {transations.map((item,index) => (
                        <React.Fragment key={index}>
                            <tr className="bg-[#191919] h-[45px] rounded-xl">
                                <td className="rounded-l-lg">{item.data}</td>
                                <td>{`${item.sum} USDT`}</td>
                                <td className="rounded-r-lg">{item.type}</td>
                            </tr>
                            <tr className="bg-black h-[4px] "></tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>}

        </div>
    )
}

export default History