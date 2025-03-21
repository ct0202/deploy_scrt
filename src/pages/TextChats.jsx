import React, {useEffect, useState} from 'react';

import { Navigation } from "../components/shared/Navigation";
import {ChatCard} from "../components/chat/chatCard";
import {useNavigate} from "react-router-dom";

const TextChats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '1', time: '11:40'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '2', time: '11:40'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '0', time: '1 дек 2024'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '4', time: '1 дек 2024'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '0', time: '1 дек 2024'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '0', time: '1 дек 2024'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '0', time: '1 дек 2024'},
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', lMsg: 'Hello World', count: '0', time: '1 дек 2024'},
    ]);

    return(
        <div className='w-full pt-[100px] pb-[80px] flex flex-col items-center overflow-hidden'>
            
            <div className='flex justify-between w-[343px]'>
                <img src = "/icons/Button-menu.svg" className='w-[44px] h-[44px]' onClick={() => navigate("/profileMenu")}
                />
                <img src = "/icons/Button-notifications.svg" className='w-[44px] h-[44px]'
                     onClick={() => {navigate('/notifications')}}
                />
            </div>

            <div className='relative w-full flex justify-center h-[64px]'>

                <div className='w-[343px] relative'>
                    <input type = 'text'
                           placeholder='Поиск'
                           className='w-[343px] h-[64px]
                                      mt-4 rounded-[8px]
                                      bg-[#022424]
                                      border-[1px]
                                      border-[#233636]
                                      pl-12
                                      text-white'/>

                    <img src = '/icons/search.svg' className='absolute top-[37px] left-[15px] w-[20px] h-[20px]'/>
                </div>

            </div>

            <div className='mt-[20px] overflow-scroll'>
                { chats.length > 0 ? chats.map((chat, index) => (
                    <div key={index} className="border-b border-[#233636] w-[100vw]">
                        <ChatCard id={chat.id} img={chat.img} name={chat.name} age={chat.age} lMsg={chat.lMsg} key={chat.id} time={chat.time} count={chat.count} />
                    </div>
                )) :
                    <div className="flex flex-col items-center justify-center w-full mt-[200px] text-white">
                        <img src="/icons/empty_chats.svg" alt="empty chats icon" className='w-[48px] h-[48px]' />
                        <p className='text-[24px] mt-[30px]'>У вас пока нет чатов</p>
                        <p className='text-[16px] mt-[10px]'>Здесь появится ваши переписки</p>
                    </div>
                }
            </div>

            <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
                <Navigation tab={4} />
            </div>
        </div>
    );
}

export default TextChats;