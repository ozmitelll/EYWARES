import React, {useEffect, useState} from "react";

const valuesForTable = [
    {id: 1, data: '15.01.2023', sum: 250.75, type: 'credit'},
    {id: 2, data: '20.02.2023', sum: 340.50, type: 'debit'},
    {id: 3, data: '05.03.2023', sum: 150.00, type: 'transfer'},
    {id: 4, data: '10.04.2023', sum: 475.25, type: 'credit'},
    {id: 5, data: '12.05.2023', sum: 60.30, type: 'debit'},
];
const History = () => {
    const [transations, setTransations] = useState([]);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    useEffect(() => {
        setTransations(valuesForTable);
        const handleResize = () => {
            setWidthWindow(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return (
        <div
            className="lg:h-screen md:h-screen h-fit w-full bg-transparent text-white flex flex-col justify-start lg:gap-20 md:gap-20 gap-4 items-center relative lg:px-16 md:px-16 px-4">
            <div
                id="referal"
                className="absolute lg:-top-28 lg:-left-20 -top-24 -left-50 bg-100 lg:w-full md:w-full sm:w-0 h-full rounded-lg -z-50"
                style={{
                    backgroundRepeat: 'no-repeat'// Ensures the background covers the div area
                }}
            >
            </div>
            <p className="text-white lg:pt-16 md:pt-16 py-6 lg:text-3xl md:text-3xl text-2xl font-semibold text-left w-fit">История
                транзакций</p>
            {widthWindow < 500 ?
                <div className={'w-full flex flex-col gap-6 pb-6'}>
                    {transations.map((item)=>(
                        <div key={item.id} className={'bg-[#191919] h-[138px] text-lg flex flex-col justify-between p-4 rounded-xl w-full'}>
                            <p>Дата: <b>{item.data}</b></p>
                            <p>Сума депозита: <b>{item.sum}</b></p>
                            <p>Тип транзакции: <b>{item.type}</b></p>
                        </div>
                    ))}
                </div>
                : <table
                    className="w-full text-white table-fixed lg:text-2xl md:text-xl text-lg text-center border-collapse">
                    <thead>
                    <tr className="bg-[#191919] h-[55px] ">
                        <th className="rounded-l-lg font-normal ">Дата</th>
                        <th className={'font-normal'}>Сумма депозита</th>
                        <th className="rounded-r-lg font-normal">Тип транзакции</th>
                    </tr>
                    <tr className="h-6 bg-transparent"></tr>
                    </thead>
                    <tbody>
                    {transations.map((item) => (
                        <React.Fragment key={item.id}>
                            <tr className="bg-[#191919] h-[45px] hover:border-2 rounded-xl border-white">
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