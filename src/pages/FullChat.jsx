import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function FullChat () {
    const navigate = useNavigate();

    const messages = [
        {
            type: 'to',
            text: 'Привет, Наташа! Рад знакомству. У меня все отлично, спасибо. А у тебя как?',
            time: '09:05',
            status: 'read'
        },
        {
            type: 'from',
            text: 'У меня тоже все хорошо, спасибо. Ты любишь путешествовать?',
            time: '09:10',
        },
        {
            type: 'to',
            text: 'Да, я обожаю путешествия! Мне нравится открывать новые места и культуры. А ты?',
            time: '09:15',
            status: 'delivered'
        },
    ];

    const [bottomOffset, setBottomOffset] = useState(24); // Стандартное значение отступа

    useEffect(() => {
        const handleResize = () => {
            const inputElement = document.querySelector("#input"); // Убедись, что ID совпадает
                if (inputElement) {
                    inputElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className='w-[100vw] pt-[90px] flex justify-center items-center flex-col relative'>
            <div className='flex items-center justify-center text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className='w-[100vw] flex items-center justify-center'>
                    <div className="w-[343px] flex justify-between items-center relative">
                        <img src='/icons/Button-back.svg' onClick={() => {navigate(-1)}} className='w-[44px] h-[44px]'/>
                        <p>Наташа, 47 лет</p>
                        <img src='/mock/stream_chat_user_avatar.png' className='w-[44px] h-[44px]' onClick={() => {navigate('/1/profile')}} />
                    </div>
                </div>
            </div>
            <div className='w-[343px] flex justify-center items-center flex-col text-white font-raleway'>
                {messages.map((message, index) => (
                    <div className={`${message.type === 'to' ? 'self-end bg-[#0A2438] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-bl-[16px]' :
                        'self-start bg-[#032A2A] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-br-[16px]'} 
                        relative flex max-w-[90%] mt-[16px] leading-[1.5] p-[10px]`}>
                        {message.text}
                        <span className='absolute flex flex-row bottom-[10px] right-[10px] text-[12px]'>{message.time} {message.type === 'to' ? message.status === 'read' ? <img src='/icons/msg_status_read.png' className='ml-[6px] w-[18px] h-[18px]'/> : <img src='/icons/msg_status_delivered.png' className='ml-[6px] w-[18px] h-[18px]'/> : <></>}</span>
                    </div>
                ))}
            </div>
            <div className='font-raleway w-full fixed bottom-[100px] flex items-center justify-center text-white text-[14px] opacity-80'>
                <div className='w-[343px] flex justify-start'>
                    <span className='flex flex-row justify-start items-center'><img src='/icons/writing_message.png' className='mr-[5px] w-[12px] h-[12px]'/>Наташа пишет сообщение</span>
                </div>
            </div>
            <div className='absolute bottom-[24px] w-full flex items-center justify-center text-white font-raleway'>
                <input placeholder="Сообщение" className='text-[18px] text-white pl-[16px] w-[269px] h-[64px] bg-[#FFFFFF33] rounded-[400px]'>

                </input>
                <div className='ml-[10px] cursor-pointer w-[64px] h-[64px] flex items-center justify-center bg-[#A1F69E] rounded-[50%]'>
                    <img src='/icons/send_msg.png' className='w-[24px] h-[24px]'/>
                </div>
            </div>
        </div>
    )
}

export default FullChat;