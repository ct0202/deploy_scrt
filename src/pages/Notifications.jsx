import React, {useEffect, useState} from 'react';

import { Navigation } from "../components/shared/Navigation";
import {NotificationCard} from "../components/notifications/notificationCard";

const Notifications = () => {

    const [option, setOption] = useState(1);

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
                <img src = "/icons/button-menu.svg" className='w-[44px] h-[44px]'/>
                <img src = "/icons/Button-notifications.svg" className='w-[44px] h-[44px]'/>
            </div>

            <div className='mt-[10px] overflow-scroll relative'>
                { chats.length > 0 ?
                    <div className="fixed flex items-center pl-[16px] pr-[16px] w-[100vw]">
                <div className="mt-4 rounded-[400px] flex flex-row bg-[#FFFFFF1A] h-[44px] pl-[10px] pr-[10px] w-full justify-center items-center text-white">
                    <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway 
                    flex justify-center items-center cursor-pointer rounded-[400px] 
                    ${option === 1 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"} `}
                         onClick={() => setOption(1)}>
                        Симпатии
                    </div>
                    <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway 
                    flex justify-center items-center rounded-[400px] cursor-pointer 
                    ${option === 2 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"}`}
                         onClick={() => setOption(2)}>
                        Лайки
                    </div>
                    <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway 
                    flex justify-center items-center rounded-[400px] cursor-pointer 
                    ${option === 3 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"}`}
                         onClick={() => setOption(3)}>
                        Системные
                    </div>
                </div>
                    </div>:
                    null }
                <div className='mt-[70px]'>
                { chats.length > 0 ? chats.map((chat, index) => (
                        <>
                        <div key={index} className="border-b border-[#233636] w-[100vw]">
                            <NotificationCard id={chat.id} img={chat.img} name={chat.name} age={chat.age} msg={chat.msg} key={chat.id} count={chat.status} />
                        </div>
                        </>
                    )) :
                    <div className="flex flex-col items-center justify-center w-full mt-[200px] text-white">
                        <img src="/icons/notif_page.svg" alt="empty chats icon" className='w-[48px] h-[48px]' />
                        <p className='text-[24px] mt-[30px]'>Нет уведомлений</p>
                        <p className='text-[16px] mt-[10px]'>Здесь появится ваши уведомления</p>
                    </div>
                }
                </div>
            </div>

            <div className="fixed bottom-2">
                <Navigation tab={0}/>
            </div>
        </div>
    );
}

export default Notifications;