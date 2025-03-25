import React, { useState, useEffect } from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";

function MakePayment() {
    const navigate = useNavigate();
    const [payment, setPayment] = useState(1);

    return (
        <div className="flex flex-col justify-start items-center w-[100%] font-raleway">
            <div className='flex items-center justify-center relative text-white text-[24px] w-full mt-[100px] pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' onClick={() => {
                        navigate(-1)
                    }} className='absolute left-0 w-[44px] h-[44px]'/>
                    <p className='pl-[20px]'>Пополнение счёта</p>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center mt-[16px] w-[343px] h-[44px] bg-[#022424] rounded-[400px] font-raleway'>
                <div onClick={() => {setPayment(1)}} className={` ${payment === 1 ? 'bg-[#043939]' : 'bg-transparent'} w-[167px] h-[33px] rounded-[400px] flex justify-center items-center `}>
                    <span className={`${payment === 1 ? 'text-[#A1F69E]' : 'text-white'} text-[14px]`}>Деньги</span>
                </div>
                <div onClick={() => {setPayment(2)}} className={` ${payment === 2 ? 'bg-[#043939]' : 'bg-transparent'} w-[167px] h-[33px] rounded-[400px] flex justify-center items-center`}>
                    <span className={`${payment === 2 ? 'text-[#A1F69E]' : 'text-white'} text-[14px]`}>Telegram звезды</span>
                </div>
            </div>
            <div className='flex flex-col w-[343px]'>
                <div className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px]'>
                    <div className='flex flex-col'>
                        <span className='text-white text-[24px] flex flex-row items-center'><img src='/icons/coin.svg'
                                                                                                 className='w-[30px] h-[30px] pr-[8px]'/>5</span>
                        <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '0.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>50 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px]'>
                    <div className='flex flex-col'>
                        <span className='text-white text-[24px] flex flex-row items-center'><img src='/icons/coin.svg'
                                                                                                 className='w-[30px] h-[30px] pr-[8px]'/>10</span>
                        <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '1.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>100 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px]'>
                    <div className='flex flex-col'>
                        <span className='text-white text-[24px] flex flex-row items-center'><img src='/icons/coin.svg'
                                                                                                 className='w-[30px] h-[30px] pr-[8px]'/>15</span>
                        <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '2.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>150 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px]'>
                    <div className='flex flex-col'>
                        <span className='text-white text-[24px] flex flex-row items-center'><img src='/icons/coin.svg'
                                                                                                 className='w-[30px] h-[30px] pr-[8px]'/>20</span>
                        <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '3.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>200 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div
                    className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px] items-center'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col w-[100px]'>
                            <span className='text-white text-[24px] pr-[32px] flex flex-row items-center'>
                                <img src='/icons/coin.svg' className='w-[30px] h-[30px] pr-[8px]'/>50
                            </span>
                            <div>
                                <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '8.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>440 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-11%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                {payment === 1 ? '10.10 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>494 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}
                                <span
                                    className="absolute inset-0 w-full h-[2px] bg-red-500 rotate-[12deg] top-1/2 left-0"></span>
                            </span>
                        </div>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div
                    className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px] items-center'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col w-[100px]'>
                            <span className='text-white text-[24px] pr-[32px] flex flex-row items-center'>
                                <img src='/icons/coin.svg' className='w-[30px] h-[30px] pr-[8px]'/>250
                            </span>
                            <div>
                                <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '43.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>2140 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-14%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                {payment === 1 ? '51.15 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>2488 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}
                                <span
                                    className="absolute inset-0 w-full h-[2px] bg-red-500 rotate-[12deg] top-1/2 left-0"></span>
                            </span>
                        </div>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
                <div
                    className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px] items-center'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col w-[100px]'>
                            <span className='text-white text-[24px] pr-[32px] flex flex-row items-center'>
                                <img src='/icons/coin.svg' className='w-[30px] h-[30px] pr-[8px]'/>4500
                            </span>
                            <div>
                                <span className='text-white text-[16px] opacity-80 flex flex-row'>за {payment === 1 ? '499.99 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>24340 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-80%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                {payment === 1 ? '2499.95 $' : <div className='ml-[5px] flex flex-row items-center justify-center'>121700 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}
                                <span
                                    className="absolute inset-0 w-full h-[2px] bg-red-500 rotate-[12deg] top-1/2 left-0"></span>
                            </span>
                        </div>
                    </div>
                    <div
                        className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px]'>
                        Купить
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MakePayment;
