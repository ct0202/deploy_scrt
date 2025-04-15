import React, {useEffect, useState, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import chatService from "../services/chat.service";

function FullChat () {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const inputContainerRef = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [chat, setChat] = useState(null);
    const [otherParticipant, setOtherParticipant] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const chatData = await chatService.getChatHistory(chatId);
                setChat(chatData.chat);
                // Find the other participant (not the current user)
                const other = chatData.chat.participants.find(p => p.userId !== '67fba439cf98acec362a6a2f');
                setOtherParticipant(other);
                setMessages(chatData.messages);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        fetchChatData();
    }, [chatId]);

    const handleInputClick = () => {
        setIsInputFocused(true);
        setTimeout(() => {
            if (inputContainerRef.current) {
                inputContainerRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 100);
    };

    const handleClickOutside = (e) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(e.target)) {
            setIsInputFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className='w-[100vw] pt-[90px] mb-[0px] h-[100vh] flex justify-start items-center flex-col relative'>
            <div className='flex items-center justify-center text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className='w-[100vw] flex items-center justify-center'>
                    <div className="w-[343px] flex justify-between items-center relative">
                        <img src='/icons/Button-back.svg' onClick={() => {navigate(-1)}} className='w-[44px] h-[44px]'/>
                        <p>{otherParticipant?.username || 'Loading...'}, {otherParticipant?.age || ''} лет</p>
                        <img 
                            src={otherParticipant?.profilePhotos?.[0] || '/mock/stream_chat_user_avatar.png'} 
                            className='w-[44px] h-[44px] rounded-full' 
                            onClick={() => {navigate(`/profile/${otherParticipant?.userId}`)}} 
                        />
                    </div>
                </div>
            </div>
            <div className='w-[343px] h-[60vh] flex justify-start items-center flex-col text-white font-raleway overflow-y-auto'>
                {messages.map((message, index) => (
                    <div key={index} className={`${message.sender === '67fba439cf98acec362a6a2f' ? 
                        'self-end bg-[#0A2438] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-bl-[16px]' :
                        'self-start bg-[#032A2A] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-br-[16px]'} 
                        relative flex max-w-[90%] mt-[16px] leading-[1.5] p-[10px]`}>
                        {message.content}
                        <span className='absolute flex flex-row bottom-[10px] right-[10px] text-[12px]'>
                            {formatTime(message.createdAt)}
                            {message.sender === '67fba439cf98acec362a6a2f' && 
                                (message.readBy?.length > 0 ? 
                                    <img src='/icons/msg_status_read.png' className='ml-[6px] w-[18px] h-[18px]'/> : 
                                    <img src='/icons/msg_status_delivered.png' className='ml-[6px] w-[18px] h-[18px]'/>
                                )
                            }
                        </span>
                    </div>
                ))}
            </div>
            <div className='font-raleway mb-[10px] w-full flex items-center justify-center text-white text-[14px] opacity-80'>
                <div className='w-[343px] flex justify-start'>
                    {isTyping && (
                        <span className='flex flex-row justify-start items-center'>
                            <img src='/icons/writing_message.png' className='mr-[5px] w-[12px] h-[12px]'/>
                            {otherParticipant?.username} пишет сообщение
                        </span>
                    )}
                </div>
            </div>
            <div ref={inputContainerRef} onClick={handleInputClick}
                 className={`w-full flex items-center pb-[50px] justify-center text-white font-raleway ${isInputFocused ? 'fixed bottom-[32vh] pb-[400px] z-10' : ''}`}>
                <input 
                    id='msginput' 
                    placeholder="Сообщение" 
                    className='text-[18px] text-white pl-[16px] w-[269px] h-[64px] bg-[#FFFFFF33] rounded-[400px]'
                />
                <div className='ml-[10px] cursor-pointer w-[64px] h-[64px] flex items-center justify-center bg-[#A1F69E] rounded-[50%]'>
                    <img src='/icons/send_msg.png' className='w-[24px] h-[24px]'/>
                </div>
            </div>
        </div>
    )
}

export default FullChat;