import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PublishWinners from './PublishWinners';
import { toast } from 'react-toastify';

const Ranking = ({ gamename }) => {

    const [data, setData] = useState([]);
    const [winners, setWinners] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        try {
            axios.get("api/ranking/").then(res => setData(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [gamename]);

    const HandleOpenPopup = () => {
        setPopupOpen(true);

    };

    const HandleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleDelete = (name) => {
        console.log(name)
        setWinners(winners.filter((item) => item.name !== name));
    };

    function handleWinner(name, gamename) {
        const winnersCount = winners.filter(winner => winner.gamename === gamename).length;
        

        if (winnersCount < 3) {
            const winnerExists = winners.some(winner => winner.name === name && winner.gamename === gamename);
            if (!winnerExists) {
                // Update the winners array with the new winner
                setWinners(prevWinners => [...prevWinners, { name, gamename }]);
            } else {
                toast.error(`Winner ${name} from game ${gamename} already exists.`);
            }
        } else {
            toast.warning(`Maximum winners reached for game ${gamename}.`);
        }
    }

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
            {data
                .filter(item => item.GameName === gamename)
                .map(item => (
                    <div key={item.PlayerName} className="flex flex-col items-start p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-main-dark-bg cursor-default hover:scale-105 transition ease-in rounded-[10px]">
                        <div className="pl-0 pr-[157px] py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-medium text-white text-[18px] tracking-[0.15px] leading-[21px] whitespace-nowrap">
                                {item.PlayerName}
                                <div className='text-[14px]'>{item.GameName}</div>
                            </div>
                        </div>
                        <div className="pl-0 pr-[157px] py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-medium text-white text-[18px] tracking-[0.15px] leading-[21px] whitespace-nowrap">
                                <div className='text-[14px]'>{item.Rank}</div>
                            </div>
                        </div>
                        <div className="justify-between flex items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] font-bold text-[#1fe078] text-[18px] tracking-[0.15px] leading-[27px] whitespace-nowrap">
                                    {item.ExperiencePoints}
                                </div>
                            </div>
                            <div className='hover:text-green-300'>
                                <button onClick={() => handleWinner(item.PlayerName, item.GameName)}>
                                    Select
                                </button>
                            </div>
                            {/* <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
                                    <div className="relative w-fit mt-[-1.00px] font-bold text-white text-[18px] tracking-[0.15px] leading-[27px] whitespace-nowrap">
                                        $500,000
                                    </div>
                                </div> */}
                        </div>
                    </div>
                ))}
            <button
                className='relative top-8 mx-8 my-10 bg-dark-bg border border-white rounded-lg shadow-lg px-6 py-2 text-sm font-medium text-white hover:bg-green-500 hover:border-green-500 transition-all focus:outline-none '
                onClick={HandleOpenPopup} >
                Publish Winners
            </button>
            {isPopupOpen && <PublishWinners winners={winners} isOpen={isPopupOpen} onClose={HandleClosePopup} onDelete={handleDelete} />}
        </div>
    )
}

export default Ranking

