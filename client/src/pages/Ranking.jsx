import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ranking = ({ gamename }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get("api/ranking/").then(res => setData(res.data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(data);

    return (
        <div className="mb-6 place-content-center flex flex-col w-full items-center gap-[16px] pt-[8px] pb-[24px] px-[16px] rounded-[10px] relative bg-form-bg/90 max-w-screen-lg mx-auto">
            <div className="pl-0 pr-[580px] py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <div className="ms-4 mt-4 mb-4 [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
                    Top Achievements
                </div>
                <span className='mx-6'>  Top 2 Achievers  prize</span>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
                {data
                    .filter(item => gamename === "undefined" || item.GameName === gamename)
                    .slice(0, 12)
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
                                {/* <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
                                    <div className="relative w-fit mt-[-1.00px] font-bold text-white text-[18px] tracking-[0.15px] leading-[27px] whitespace-nowrap">
                                        $500,000
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Ranking;
