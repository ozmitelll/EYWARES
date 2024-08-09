import React, {useState, useRef, useEffect} from 'react';
import GraphTest from "./GraphTest";
import Header from "../components/Header";

import {Web3} from "web3";
import {ContractABI} from "../ABI"
import {Address} from "../ContractAdress";

import {ContractABITokenUSDT} from "../ABI"
import {AddressTokenUsdt} from "../ContractAdress";

var web3;
var account;

const Account = ({handleOpen, handleClose}) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [balanceToken, setBalanceToken] = useState(null);
    const [allDeposit, setAllDeposit] = useState(null);
    const [allSumDeposit, setAllSumDeposit] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [allActiveUsers, setActiveAllUsers] = useState(null);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isAccordionOpen ? `${contentRef.current.scrollHeight}px` : '0px';
        }

        GetBalance();
        GetAllDeposit();

    }, [isAccordionOpen]);


    const GetBalance =  async () => {
        let bToken;
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

            let contractToken = new web3.eth.Contract(ContractABITokenUSDT, AddressTokenUsdt);

            bToken = parseInt(await contractToken.methods.balanceOf(account).call()) / 10 ** 18;

        } catch (e) {
            console.error(`GetBalance error`);
        }


        setBalanceToken(bToken);

    }


    const GetAllDeposit = async () =>{
        let allDeposit = [];
        let allSumDeposit = 0;
        let activeUsers = [];
        let allActiveUsers = [];

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

            contract1.events.Deposit({
            fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                      
                    allDeposit.push(1);
                    setAllDeposit(allDeposit.length); 
                   
            })


            contract1.events.Deposit({
            filter: {user:account},       
            fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                    
                    allSumDeposit += parseInt(event?.returnValues[1]) / 10 ** 18;
                    setAllSumDeposit(allSumDeposit);
                       
            })

            contract1.events.AllActiveUsers({
            fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                          
                    activeUsers.push(1);
                    setAllUsers(activeUsers.length); 
                       
            })

            let transactions = [];

            function getUniqueValues(arr) {
                const uniqueValues = new Set();
            
                arr.forEach(item => {
                    uniqueValues.add(item);
                });
            
                return Array.from(uniqueValues);
            }
            

            contract1.events.Deposit({
            filter: {datas:Date.now()},           
            fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
            
                    transactions = [...transactions,event?.returnValues[0]];   
                    allActiveUsers.push(1);
                   
                    const uniqueNames = getUniqueValues(transactions, "address");
                    console.log(uniqueNames);    

                    setActiveAllUsers(uniqueNames.length);
            })

           
    
      
        } catch (e) {
            console.error(`GetBalance error`);
        } 


       
        setAllSumDeposit(1);
    }

    return (
        <div
            className="lg:h-screen md:h-screen h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-10 md:gap-8 gap-4 items-center relative lg:px-16 md:px-16 px-4">
            <Header handleOpen={handleOpen} handleClose={handleClose}/>
            <div
                id="referal"
                className="absolute lg:-top-28 lg:-left-20 -top-24 -left-50 bg-100 lg:w-full md:w-full sm:w-0 h-full rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <div className="w-full lg:h-screen md:h-screen h-fit flex flex-col lg:justify-center md:justify-center justify-start items-center lg:gap-16 md:gap-16 gap-6">
                <p className="text-white  lg:text-4xl md:text-4xl text-2xl lg:pt-0 md:pt-0 pt-6  font-semibold leading-tight text-left w-fit">Личный
                    кабинет</p>
                <div className='flex flex-col lg:flex-row justify-center items-end w-full gap-8'>
                    <div
                        className='lg:w-1/2 w-full bg-[#222222] border border-gray-700 rounded-lg p-6 flex flex-col justify-center items-start'>
                        <p className=' text-2xl font-normal py-2'>Баланс токенов: <b>{balanceToken}</b></p>
                        <p className=' text-2xl font-normal py-2'>Сумма депозитов: <b>{allSumDeposit}</b></p>
                        <p className=' text-2xl font-normal py-2'>Сумма реферальных вознаграждений: <b>900</b>
                        </p>
                        <div onClick={toggleAccordion}
                             className="cursor-pointer w-full text-2xl flex justify-between items-center py-2">
                            История наград
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={`h-5 w-5 transform transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : 'rotate-0'}`}
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                        <div ref={contentRef}
                             className="transition-max-height duration-300 ease-in-out overflow-hidden">
                            <div className=' text-md font-normal pt-2'>
                                Для участия в программе необходима реферальная ссылка.<br/><br/>
                                Перейдя по реферальной ссылке, система предложит привязать кошелек MetaMask или
                                TrustWallet.<br/><br/>
                                Совершив покупку на минимальную сумму, покупатель получит соответствующее количество
                                токенов на свой кошелек и ссылку для создания собственной команды.
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 w-full flex flex-col justify-center items-start gap-6'>
                        <p className=' text-xl font-normal'>Общее число пользователей: <b>{allUsers}</b></p>
                        <p className=' text-xl font-normal'>Активные пользователи: <b>{allActiveUsers}</b></p>
                        <p className=' text-xl font-normal'>Общее число депозитов: <b>{allDeposit}</b></p>
                        <p className=' text-xl font-normal'>Общее число реферальных
                            вознаграждений: <b>900</b></p>
                    </div>
                </div>
            </div>
            <GraphTest/>

        </div>
    );
}

export default Account;
