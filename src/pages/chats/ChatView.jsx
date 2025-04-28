import React, {useEffect, useState, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import chatService from "../../services/chat.service";
import config from '../../config';

function ChatView () {
    const navigate = useNavigate();
    const { chat_id } = useParams();
    const inputContainerRef = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [chat, setChat] = useState(null);
    const [otherParticipant, setOtherParticipant] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);
    const currentUserId = localStorage.getItem('userId');
    const typingTimeoutRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const calculateAge = (birthDay) => {
        if (!birthDay) return '';
        const birthDate = new Date(birthDay);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const token = localStorage.getItem('userId');
        if (!token) {
            // navigate('/login');
            // return;
        }

        // Connect to WebSocket
        chatService.connect(token);

        // Set up message listener
        const unsubscribeMessage = chatService.onMessage((newMessage) => {
            // console.log('New message received:', newMessage);
            if (newMessage.type === 'history') {
                // Update entire chat history
                const sortedMessages = (newMessage.data.messages || []).sort((a, b) => 
                    new Date(a.createdAt) - new Date(b.createdAt)
                );
                setMessages(sortedMessages);
            } else if (newMessage.type === 'status') {
                // Update message status
                setMessages(prev => prev.map(msg => 
                    msg._id === newMessage._id ? { ...msg, readBy: newMessage.readBy } : msg
                ));
            }
        });

        // Set up typing status listener
        // const unsubscribeTyping = chatService.onTyping((typingStatus) => {
        //     console.log('Typing status:', typingStatus);
        //     setIsTyping(typingStatus);
        // });

        // Join chat room
        chatService.joinChat(chat_id);

        // Fetch initial chat data
        const fetchChatData = async () => {
            try {
                const chatData = await chatService.getChatHistory(chat_id);
                console.log("chatData", chatData);
                setChat(chatData.data.chats);
                const other = chatData.data.chats.participants?.find(p => p._id !== currentUserId);
                setOtherParticipant(other);
                
                // Sort messages by createdAt in ascending order (oldest first)
                const sortedMessages = (chatData.data.chats.messages || []).sort((a, b) => 
                    new Date(a.createdAt) - new Date(b.createdAt)
                );
                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        fetchChatData();
        scrollToBottom();

        
        return () => {
            unsubscribeMessage();
            // unsubscribeTyping();
            chatService.disconnect();
        };
    }, [chat_id, currentUserId, navigate]);

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
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date string:', dateString);
                return '';
            }
            return date.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
        
        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        
        // Send typing status
        chatService.updateTypingStatus(chat_id, true);
        
        // Set timeout to stop typing status
        typingTimeoutRef.current = setTimeout(() => {
            chatService.updateTypingStatus(chat_id, false);
        }, 2000);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim()) return;

        try {
            chatService.sendMessage(chat_id, messageInput);
            setMessageInput('');
            // Stop typing status
            chatService.updateTypingStatus(chat_id, false);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className='w-[100vw] pt-[90px] mb-[0px] h-[100vh] flex justify-start items-center flex-col relative'>
            <div className='flex items-center justify-center text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className='w-[100vw] flex items-center justify-center'>
                    <div className="w-[343px] flex justify-between items-center relative">
                        <img src='/icons/Button-back.svg' onClick={() => {navigate(-1)}} className='w-[44px] h-[44px]'/>
                        <p>{otherParticipant?.userInfo?.name || 'Loading...'}, {calculateAge(otherParticipant?.userInfo?.birthDay)} лет</p>
                        <img 
                            src={otherParticipant?.userInfo?.photos?.[0] || config.FALLBACK_AVATAR} 
                            className='w-[44px] h-[44px] rounded-full' 
                            onClick={() => {navigate(`/profile/${otherParticipant?.userId}`)}} 
                        />
                    </div>
                </div>
            </div>
            <div 
                ref={messagesContainerRef}
                className='w-[343px] h-[60vh] flex justify-start items-center flex-col text-white font-raleway overflow-y-auto'
            >
                {messages?.map((message, index) => {
                    const isCurrentUser = message.sender?.userId === currentUserId;
                    console.log("currentUserId", currentUserId);
                    console.log("message.sender?._id", message.sender?.userId);
                    console.log("isCurrentUser", isCurrentUser);
                    return (
                        <div key={index} className={`${isCurrentUser ? 
                            'self-end bg-[#0A2438] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-bl-[16px]' :
                            'self-start bg-[#032A2A] border border-[#233636] rounded-tr-[16px] rounded-tl-[16px] rounded-br-[16px]'} 
                            relative flex max-w-[90%] min-w-[70px] mt-[16px] leading-[1.5] p-[10px] pb-[30px]`}>
                            <div className={`flex-1 break-words ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                {message.content}
                            </div>
                            <span className='absolute flex flex-row bottom-[10px] right-[10px] text-[12px]'>
                                {formatTime(message.createdAt)}
                                {isCurrentUser && (
                                    <span className='ml-[6px] flex items-center'>
                                        {message.readBy?.length > 0 ? 
                                            <img src='/icons/msg_status_read.png' className='w-[18px] h-[18px]'/> : 
                                            <img src='/icons/msg_status_delivered.png' className='w-[18px] h-[18px]'/>
                                        }
                                    </span>
                                )}
                            </span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
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
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <div 
                    className='ml-[10px] cursor-pointer w-[64px] h-[64px] flex items-center justify-center bg-[#A1F69E] rounded-[50%]'
                    onClick={handleSendMessage}
                >
                    <img src='/icons/send_msg.png' className='w-[24px] h-[24px]'/>
                </div>
            </div>
        </div>
    )
}

export default ChatView;