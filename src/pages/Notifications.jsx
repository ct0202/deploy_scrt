import React, {useEffect, useState} from 'react';

import { Navigation } from "../components/shared/Navigation";
import {NotificationCard} from "../components/notifications/notificationCard";
import {SystemCard} from "../components/notifications/systemCard";
import {useNavigate} from "react-router-dom";
import {Button} from "../components/Button";

const Notifications = () => {

    const navigate = useNavigate();
    const [option, setOption] = useState(1);

    const [chats, setChats] = useState([
        { id: 1, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', type: 'Вам поставили СУПЕРЛАЙК!', status: 'new', superlike: true},
        { id: 2, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', type: 'У вас взаимная симпатия с', status: 'new' },
        { id: 3, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', type: 'У вас взаимная симпатия с', status: 'old' },
        { id: 4, img: '/mock/stream_chat_user_avatar.png',
            name: 'Наташа', age: '45', type: 'У вас взаимная симпатия с', status: 'old' },
    ]);

    const [systemN, setSystemN] = useState([
        { id: 1, title: 'Заголовок сообщения', desc: 'Lorem ipsum dolor sit amet consectetur. Proin sodales elit faucibus at enim aliquam feugiat tempor. Mauris porta eu tristique orci quam condimentum fermentum cras ornare.', status: 'new' },
        { id: 2, title: 'Заголовок сообщения', desc: 'Lorem ipsum dolor sit amet consectetur. Proin sodales elit faucibus at enim aliquam feugiat tempor. Mauris porta eu tristique orci quam condimentum fermentum cras ornare.', status: 'old' },
    ]);

    return(
        <div className='w-full pt-[100px] pb-[80px] flex flex-col items-center overflow-hidden'>

            <div className='flex justify-between w-[343px]'>
                <img src = "/icons/Button-menu.svg" className='w-[44px] h-[44px]' onClick={() => navigate("/profileMenu")}
                />
                <img src = "/icons/Button-notifications.svg" className='w-[44px] h-[44px]'/>
            </div>

            <div className='mt-[10px] relative overflow-scroll'>
                { chats.length > 0 ?
                    <div className="fixed flex items-center pl-[16px] pr-[16px] w-[100vw]">
                <div className="mt-4 rounded-[400px] flex flex-row bg-[#FFFFFF1A] h-[44px] pl-[10px] pr-[10px] w-full justify-center items-center text-white">
                    <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway 
                    flex justify-center items-center cursor-pointer rounded-[400px] 
                    ${option === 1 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"} `}
                         onClick={() => setOption(1)}>
                        Симпатии (4)
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
                    {option === 1 ? (
                        chats.length > 0 ? (
                            chats.map((chat) => (
                                <div key={chat.id} className="border-b border-[#233636] w-[100vw]">
                                    <NotificationCard
                                        id={chat.id}
                                        img={chat.img}
                                        name={chat.name}
                                        age={chat.age}
                                        type={chat.type}
                                        status={chat.status}
                                        superlike={chat.superlike}
                                    />
                                </div>
                            ))
                        ) : null
                    ) : option === 2 ? (
                        <div className='w-[100vw] flex justify-center items-start relative h-[566px] overflow-scroll'>
                            <div
                                className="flex-col w-[343px] items-center justify-center text-white grid grid-cols-2 gap-[16px]">
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                                <img src='/icons/like_locked.png' className='w-[163px] h-[220px]'/>
                            </div>
                            <div className='fixed top-[710px] w-full flex justify-center'>
                                <Button>
                                    Хочу узнать, кто меня лайкнул
                                </Button>
                            </div>
                        </div>
                    ) : option === 3 ? (
                        systemN.map((chat, index) => (
                            <div key={index} className="border-b border-[#233636] w-[100vw]">
                                <SystemCard title={chat.title} desc={chat.desc} status={chat.status} />
                            </div>
                        ))
                    ) : null}
                </div>
            </div>

            <div className="fixed bottom-2">
                <Navigation tab={0}/>
            </div>
        </div>
    );
}

export default Notifications;