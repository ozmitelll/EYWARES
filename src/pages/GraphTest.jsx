import React, {useEffect, useState} from 'react';
import Predok from '../images/predok.svg';
import Me from '../images/me.svg';
import Me2 from '../images/referalLikeMe2.svg';
import Polygon from '../images/Polygon 12.svg';
import ReferalLikeMe from '../images/referalLikeMe.svg';
import MyReferal from '../images/myRefereal.svg';
import ReferalReferalEmpty from '../images/referalReferalEmpty.svg';
import MyEmptyReferal from '../images/myReferealEmpty.svg';
import ReferalLikeMeEmpty from '../images/referalLikeMeEmpty.svg';
import Slider from 'react-slick';
import ChevronDown from '../images/chevron-down.svg';
import Tooltip from "../components/Tooltip";
import {Web3} from "web3";
import {ContractABI} from "../ABI";
import {Address} from "../ContractAdress";
import {parseInt} from "lodash";
import {logDOM} from "@testing-library/react"; // Замените путь на правильный


var window1;
var web3;
var account;


const SampleNextArrow = (props) => {
    const {onClick} = props;
    return (
        <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <img src={ChevronDown} alt="Next" className="-rotate-90"/>
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const {onClick} = props;
    return (
        <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <img src={ChevronDown} alt="Previous" className="rotate-90"/>
        </div>
    );
}

const GraphTest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeWallet, setActiveWallet] = useState(undefined);
    const [structure, setStructure] = useState({
        referal: {wallet: "", deposit: "", date: ""},
        referalsPrev: [],
        me: {wallet: "", deposit: "", date: ""},
        myReferals: []
    });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {

        ConnectWalletMetamask();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };


    const ConnectWalletMetamask = async () => {
        setIsLoading(true);
        let NewStructure = {
            referal: {wallet: "", deposit: "", date: ""},
            referalsPrev: [],
            me: {wallet: "", deposit: "", date: ""},
            myReferals: []
        };
        /////////////////////////////////////подключение к метамаску
        try {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    web3 = new Web3(window.ethereum)
                    account = accounts[0];
                    NewStructure.me.wallet = account
                    setActiveWallet(activeWallet !== undefined ? activeWallet : accounts[0])
                } catch (error) {
                    console.log("Error connecting...");
                }
            } else {
                console.log("Download Metamask");
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            let contract1 = new web3.eth.Contract(ContractABI, Address);

            //история транзакций моя
            const events = await contract1.getPastEvents('Deposit', {
                filter: {user: NewStructure.me.wallet},
                fromBlock: 0
            });

            if (events.length > 0) {
                NewStructure.referal.wallet = events[0].returnValues[2]; // Принимаем первое событие для примера
            }
            console.log(NewStructure.referal.wallet)
            if(NewStructure.referal.wallet !== ""){
                NewStructure.referalsPrev = await getPrevRefferals(NewStructure.referal.wallet) // undefined
            }
            NewStructure.myReferals = await getMyRefferals(NewStructure.me.wallet)

            setTimeout(() => setStructure(NewStructure), 200);
            setIsLoading(false);
        } catch (e) {
            alert(`Error2`);
        }
    }

    const getPrevRefferals = async (adress_wallet) => {
        let temp = []
        try {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    web3 = new Web3(window.ethereum)
                    account = accounts[0];
                } catch (error) {
                    console.log("Error connecting...");
                }
            } else {
                console.log("Download Metamask");
            }


            let contract1 = new web3.eth.Contract(ContractABI, Address);

            contract1.events.Deposit({
                filter: {inviter: `${adress_wallet}`},
                fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                    temp.push({
                        wallet: event?.returnValues[0],
                        deposit: parseInt(event?.returnValues[1]) / 10 ** 18,
                        date: new Date(parseInt(event?.returnValues[3]) * 1000).toJSON()
                    });
                })

        } catch (e) {
            console.error('Prev');
        }
        return temp;
    }
    const getMyRefferals = async (adress_wallet) => {
        let temp = []
        try {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    web3 = new Web3(window.ethereum)
                    account = accounts[0];
                    // console.log(accounts[0]); //мой кошелек
                } catch (error) {
                    console.log("Error connecting...");
                }
            } else {
                console.log("Download Metamask");
            }


            let contract1 = new web3.eth.Contract(ContractABI, Address);

            //мои рефералы
            contract1.events.Deposit({
                filter: {inviter: `${adress_wallet}`},
                fromBlock: 0
            }, function (error, event) {
            })
                .on('data', function (event) {
                    temp.push({
                        wallet: event?.returnValues[0],
                        deposit: parseInt(event?.returnValues[1]) / 10 ** 18,
                        date: new Date(parseInt(event?.returnValues[3]) * 1000).toJSON()
                    });
                })


        } catch (e) {
            alert(`Error2`);
        }
        return temp;
    }

    const getStructure = async (address_wallet) => {
        console.log(address_wallet)
        setIsLoading(true)
        let newStructure = {
            referal: {wallet: structure.me, deposit: "", date: ""},
            referalsPrev: [],
            me: {wallet: address_wallet, deposit: "", date: ""},
            myReferals: []
        };
        try {
            newStructure.referalsPrev = await getPrevRefferals(newStructure.referal.wallet)
            newStructure.myReferals = await getMyRefferals(address_wallet)
            setTimeout(() => setStructure(newStructure), 200);
            setIsLoading(false);
            console.log(structure)
        } catch (e) {
            alert(`Error2`);
        }
    }

    return (
        <div className={'w-full py-12'}>
            {isLoading ? (
                <div>Loading data from blockchain...</div> // Показать индикатор загрузки
            ) : (
                <div className={'flex flex-col'}>
                    {screenWidth < 768 ? (
                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'flex flex-col justify-center items-center gap-4'}>
                                <img src={Predok} alt=""/>
                                <img className={'w-[125px] h-[160px]'} src={Me2} alt={''}/>
                            </div>
                            <div className={'w-full pt-4 slider-container'}>
                                <Slider {...settings}>
                                    {Array.from({length: 18}).map((_, index) => (
                                        <div key={index} className="flex-none w-full">
                                            <div className={'flex flex-col justify-center items-center gap-4'}>
                                                <img src={Me2} alt=""/>
                                                <img width={28} height={28} src={Polygon} alt={''}/>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={'flex md:gap-8 lg:gap-2'}>
                                <div className={'flex flex-col justify-center items-center'}>
                                    <Tooltip referal_link={structure.referal.wallet} price={'900 USDT'}
                                             date={'12.04.2024'}>
                                        <img src={Predok} alt=""/>
                                    </Tooltip>
                                    <Tooltip referal_link={structure.me.wallet}>
                                        <img src={Me} alt={''}/>
                                    </Tooltip>
                                </div>
                                <div
                                    className={'flex md:flex-col lg:flex-row md:justify-start justify-end items-center gap-4'}>
                                    <div className={'flex gap-4 md:w-full lg:w-auto justify-start'}>
                                        {Array.from({length: 4}).map((_, i) => (
                                            <Tooltip
                                                referal_link={structure.referalsPrev[i] ? structure.referalsPrev[i].wallet : undefined}>
                                                <img key={i}
                                                     src={structure.referalsPrev[i] ? ReferalLikeMe : ReferalLikeMeEmpty}
                                                     alt={''}
                                                     onClick={() => getStructure(structure.referalsPrev[i] ? structure.referalsPrev[i].wallet : undefined)}/>
                                            </Tooltip>
                                        ))}
                                    </div>
                                    <div className={'flex gap-4'}>
                                        {Array.from({length: 5}).map((_, i) => (
                                            <Tooltip
                                                referal_link={structure.referalsPrev[i + 4] ? structure.referalsPrev[i + 4].wallet : undefined}>
                                                <img key={i}
                                                     src={structure.referalsPrev[i + 4] ? ReferalLikeMe : ReferalLikeMeEmpty}
                                                     alt={''}
                                                     onClick={() => getStructure(structure.referalsPrev[i] ? structure.referalsPrev[i].wallet : undefined)}/>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>


                            </div>
                            <div className={'flex md:flex-col md:gap-8 lg:gap-0 lg:flex-row'}>
                                <div className={'flex md:pl-16'}>
                                    {Array.from({length: 4}).map((_, i) => (
                                        <div key={i} className={'flex flex-col'}>
                                            <div>
                                                <Tooltip
                                                    referal_link={structure.myReferals[i] ? structure.myReferals[i].wallet : undefined}>
                                                    <img src={structure.myReferals[i] ? MyReferal : MyEmptyReferal}
                                                         alt={''}
                                                         onClick={() => getStructure(structure.myReferals[i] ? structure.myReferals[i].wallet : undefined)}/>
                                                </Tooltip>
                                            </div>
                                            <div className={'pl-20'}>
                                                <div className={'h-[36px] w-[55px]'}>
                                                    <img src={ReferalReferalEmpty} alt={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={'flex md:pl-16 lg:pl-0'}>
                                    {Array.from({length: 4}).map((_, i) => (
                                        <div key={i} className={'flex flex-col'}>
                                            <div>
                                                <Tooltip
                                                    referal_link={structure.myReferals[i + 4] ? structure.myReferals[i + 4].wallet : undefined}>
                                                    <img
                                                        src={structure.myReferals[i + 4] ? MyReferal : MyEmptyReferal}
                                                        alt={''}
                                                        onClick={() => getStructure(structure.myReferals[i] ? structure.myReferals[i].wallet : undefined)}/>
                                                </Tooltip>
                                            </div>
                                            <div className={'pl-20'}>
                                                <div className={'h-[36px] w-[55px]'}>
                                                    <img src={ReferalReferalEmpty} alt={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </>
                    )}
                </div>
            )}

        </div>
    );
}

export default GraphTest;
