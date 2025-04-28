import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../axios";
import config from "../../config";

function MakePayment() {
    const navigate = useNavigate();
    const [payment, setPayment] = useState(1);
    const [loading, setLoading] = useState(false);

    const handlePurchase = async (amount) => {
        try {
            setLoading(true);
            const response = await axiosPrivate.post(config.API.WALLET.PURCHASE, {
                amount,
                type: payment === 1 ? 'coins' : 'mytaCoins'
            });

            if (response.data.status === 'success') {
                // Refresh user data or show success message
                window.location.reload(); // Temporary solution until we implement proper state management
            }
        } catch (error) {
            console.error('Error purchasing coins:', error);
            // Show error message to user
        } finally {
            setLoading(false);
        }
    };

    const getPrice = (amount) => {
        if (payment === 1) {
            // Regular coins pricing
            switch(amount) {
                case 5: return '0.99 $';
                case 10: return '1.99 $';
                case 15: return '2.99 $';
                case 20: return '3.99 $';
                case 50: return '8.99 $';
                case 250: return '43.99 $';
                case 4500: return '499.99 $';
                default: return '';
            }
        } else {
            // MYTA coins pricing
            switch(amount) {
                case 5: return '50';
                case 10: return '100';
                case 15: return '150';
                case 20: return '200';
                case 50: return '440';
                case 250: return '2140';
                case 4500: return '24340';
                default: return '';
            }
        }
    };

    const getDiscount = (amount) => {
        switch(amount) {
            case 50: return '-11%';
            case 250: return '-14%';
            case 4500: return '-80%';
            default: return null;
        }
    };

    const getOriginalPrice = (amount) => {
        if (payment === 1) {
            switch(amount) {
                case 50: return '10.10 $';
                case 250: return '51.15 $';
                case 4500: return '2499.95 $';
                default: return null;
            }
        } else {
            switch(amount) {
                case 50: return '494';
                case 250: return '2488';
                case 4500: return '121700';
                default: return null;
            }
        }
    };

    return (
        <div className="flex flex-col justify-start items-center w-[100%] font-raleway">
            <div className='flex items-center justify-center relative text-white text-[24px] w-full mt-[100px] pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' 
                        alt="Назад"
                        onClick={() => {
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
                {[5, 10, 15, 20, 50, 250, 4500].map((amount) => (
                    <div key={amount} className='flex flex-row justify-between w-full border-b border-[#233636] mt-[12px] pb-[12px] items-center'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col w-[100px]'>
                                <span className='text-white text-[24px] pr-[32px] flex flex-row items-center'>
                                    <img src='/icons/coin.svg' className='w-[30px] h-[30px] pr-[8px]'/>{amount}
                                </span>
                                <div>
                                    <span className='text-white text-[16px] opacity-80 flex flex-row'>
                                        за {payment === 1 ? getPrice(amount) : 
                                            <div className='ml-[5px] flex flex-row items-center justify-center'>
                                                {getPrice(amount)} <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/>
                                            </div>
                                        }
                                    </span>
                                </div>
                            </div>
                            {getDiscount(amount) && (
                                <div className='flex flex-col justify-center items-center gap-[7px]'>
                                    <div className='w-[62px] h-[29px] bg-[#F28A00] flex items-center justify-center rounded-[400px] text-[18px] text-white'>
                                        {getDiscount(amount)}
                                    </div>
                                    <span className='relative text-white text-[16px] opacity-80 text-center'>
                                        {payment === 1 ? getOriginalPrice(amount) : 
                                            <div className='ml-[5px] flex flex-row items-center justify-center'>
                                                {getOriginalPrice(amount)} <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/>
                                            </div>
                                        }
                                        <span className="absolute inset-0 w-full h-[2px] bg-red-500 rotate-[12deg] top-1/2 left-0"></span>
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            className='h-[48px] w-[120px] rounded-[400px] bg-[#A1F69E] text-black flex items-center justify-center text-[18px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={() => handlePurchase(amount)}
                            disabled={loading}
                        >
                            {loading ? 'Загрузка...' : 'Купить'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MakePayment;
