import React, { useState, useEffect } from 'react';

import { Navigation } from "../components/shared/Navigation";
import {ChatCard} from "../components/chat/chatCard";
import {useNavigate} from "react-router-dom";
import chatService from '../services/chat.service';

const TextChats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await chatService.getUserChats();
                console.log('Full response:', response);
                
                // Check if response exists and has data
                if (!response || !response.data) {
                    throw new Error('Invalid response from server');
                }

                // The chats are directly in response.data
                const chatsData = response.data.chats || [];
                console.log('Chats data:', chatsData);
                
                setChats(chatsData);
                setLoading(false);
            } catch (err) {
                console.error('Detailed error:', err);
                console.error('Error response:', err.response);
                setError('Failed to load chats');
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleChatClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    const getOtherParticipant = (chat) => {
        // First try to get from match participants
        if (chat.match?.participants) {
            const otherParticipant = chat.match.participants.find(p => p.telegram_id !== '1001');
            if (otherParticipant) {
                console.log('Found participant from match:', otherParticipant);
                return otherParticipant;
            }
        }
        
        // Fallback to chat participants
        const chatParticipant = chat.participants?.find(p => p.telegram_id !== '1001');
        console.log('Found participant from chat:', chatParticipant);
        return chatParticipant;
    };

    return(
        <div className='w-full pt-[100px] pb-[80px] flex flex-col items-center overflow-hidden'>
            
            <div className='flex justify-between w-[343px]'>
                <img alt='back' src = "/icons/Button-menu.svg" className='w-[44px] h-[44px]' onClick={() => navigate("/profileMenu")}
                />
                <img alt='notifications' src = "/icons/Button-notifications.svg" className='w-[44px] h-[44px]'
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

                    <img alt='search' src = '/icons/search.svg' className='absolute top-[37px] left-[15px] w-[20px] h-[20px]'/>
                </div>
            </div>

            <div className='mt-[20px] overflow-scroll'>
                {loading ? (
                    <div className="flex flex-col items-center justify-center w-full mt-[200px] text-white">
                        <p className='text-[24px]'>Загрузка чатов...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center w-full mt-[200px] text-white">
                        <p className='text-[24px]'>{error}</p>
                    </div>
                ) : chats.length > 0 ? (
                    chats.map((chat) => {
                        console.log('Rendering chat:', chat);
                        
                        const otherParticipant = getOtherParticipant(chat);
                        console.log('Other participant:', otherParticipant);
                        
                        if (!otherParticipant) {
                            console.warn('No other participant found for chat:', chat);
                            return null;
                        }

                        return (
                            <div key={chat._id} className="border-b border-[#233636] w-[100vw] flex justify-center z-5">
                                <ChatCard 
                                    id={chat._id}
                                    img={otherParticipant.profilePhotos?.[0] || '/mock/stream_chat_user_avatar.png'}
                                    name={otherParticipant.username || 'Unknown User'}
                                    age={otherParticipant.age || ''}
                                    lMsg={chat.lastMessage?.content || ''}
                                    time={chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt).toLocaleTimeString() : ''}
                                    count={chat.unreadCount || 0}
                                    link_to_full_chat={`/chats/${chat._id}`}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center w-full mt-[200px] text-white">
                        <img alt='empty chats icon' src="/icons/empty_chats.svg" className='w-[48px] h-[48px]' />
                        <p className='text-[24px] mt-[30px]'>У вас пока нет чатов</p>
                        <p className='text-[16px] mt-[10px]'>Здесь появится ваши переписки</p>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
                <Navigation tab={4} />
            </div>
        </div>
    );
}

export default TextChats;