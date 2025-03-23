import React, { useState, useEffect } from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";

function MakePayment() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-start items-center w-[100%] font-raleway">
            <div className='flex items-center justify-center relative text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' onClick={() => {
                        navigate(-1)
                    }} className='absolute left-0 w-[44px] h-[44px]'/>
                    <p className='pl-[20px]'>Пополнение счёта</p>
                </div>
            </div>
            <div className='flex flex-col w-[343px] mt-[16px]'>
                <div className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px]'>
                    <div className='flex flex-col'>
                        <span className='text-white text-[24px] flex flex-row items-center'><img src='/icons/coin.svg'
                                                                                                 className='w-[30px] h-[30px] pr-[8px]'/>5</span>
                        <span className='text-white text-[16px] opacity-80'>за 0,99 $</span>
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
                        <span className='text-white text-[16px] opacity-80'>за 1,99 $</span>
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
                        <span className='text-white text-[16px] opacity-80'>за 2,99 $</span>
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
                        <span className='text-white text-[16px] opacity-80'>за 3,99 $</span>
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
                                <span className='text-white text-[16px] opacity-80'>за 8,99 $</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-11%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                9,99 $
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
                                <span className='text-white text-[16px] opacity-80'>за 43,99 $</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-14%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                49,99 $
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
                                <span className='text-white text-[16px] opacity-80'>за 499,99 $</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-[7px]'>
                            <div
                                className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>-80%
                            </div>
                            <span className='relative text-white text-[16px] opacity-80 text-center'>
                                899,99 $
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
