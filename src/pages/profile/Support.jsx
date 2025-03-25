import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {Button} from "../../components/Button";

function Support() {
    const navigate = useNavigate();
    const [sent, setSent] = useState(false);

    return (
        <div className='w-[100vw] flex flex-col items-center justify-center font-raleway overflow-scroll pt-[80px]'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' onClick={() => {
                        navigate(-1)
                    }} className='absolute left-0 w-[44px] h-[44px]'/>
                    <p className='pl-[50px]'>Техническая поддержка</p>
                </div>
            </div>
            {!sent ?
                <div className='w-[343px]'>
                    <p className='pr-[16px] text-white text-[20px] mt-[12px] mb-[20px]'>Напишите, пожалуйста,
                        с какой проблемой вы столкнулись, и мы вам поможем</p>
                    <textarea placeholder='Опишите сложившуюся ситуацию' className='rounded-[8px] h-[240px] w-[343px] pl-[12px] pt-[15px]
            border border-[#233636] bg-[#022424] text-white'/>
                    <div className='text-black fixed bottom-[20px]'>
                        <Button onclick={() => {
                            setSent(true)
                        }}>
                    Отправить
                </Button>
            </div>
                </div>
            :
                <div className='w-[343px] h-[70vh] flex flex-col items-center justify-center font-raleway text-white'>
                    <img src='/icons/message_sent.svg' className='w-[80px] h-[80px]'/>
                    <p className='text-[22px] font-semibold text-center mt-[20px]'>Ваше сообщение отправлено</p>
                    <p className='text-[16px] font-normal text-center'>Мы внимательно рассмотрим ваш вопрос и свяжемся с вами в ближайшее время</p>
                </div>
                }
        </div>
    );
}

export default Support;