import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {Button} from "../components/Button";
import {io} from "socket.io-client";
import { toast } from 'react-toastify';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Support() {
    const navigate = useNavigate();
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('/support', {
            path: '/socket.io',
            transports: ['websocket', 'polling']
        });

        newSocket.on('connect', () => {
            console.log('Connected to support socket');
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
            toast.error('Connection error. Please try again.');
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error('Please enter your message');
            return;
        }

        setLoading(true);
        try {
            // Create support ticket
            const response = await axiosPrivate.post('/support', {
                subject: 'Support Request',
                message: message
            });

            // Emit socket event for real-time notification
            if (socket) {
                socket.emit('ticket_created', {
                    userId: response.data.user,
                    subject: 'Support Request',
                    message: message
                });
            }

            setSent(true);
            toast.success('Your message has been sent successfully');
            
            // Navigate after a short delay
            setTimeout(() => {
                navigate('/profilemenu');
            }, 2000);
        } catch (error) {
            console.error('Error sending support request:', error);
            toast.error(error.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[100vw] flex flex-col items-center justify-center font-raleway overflow-scroll pt-[80px]'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full pb-[26px] pt-[26px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' alt="Назад" onClick={() => {
                        navigate(-1)
                    }} className='absolute left-0 w-[44px] h-[44px] cursor-pointer'/>
                    <p className='pl-[50px]'>Техническая поддержка</p>
                </div>
            </div>
            {!sent ?
                <div className='w-[343px]'>
                    <p className='pr-[16px] text-white text-[20px] mt-[12px] mb-[20px]'>Напишите, пожалуйста,
                        с какой проблемой вы столкнулись, и мы вам поможем</p>
                    <textarea placeholder='Опишите сложившуюся ситуацию' className='rounded-[8px] h-[240px] w-[343px] pl-[12px] pt-[15px]
            border border-[#233636] bg-[#022424] text-white' value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <div className='text-black fixed bottom-[20px]'>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить'}
                        </Button>
                    </div>
                </div>
            :
                <div className='w-[343px] h-[70vh] flex flex-col items-center justify-center font-raleway text-white'>
                    <img src='/icons/message_sent.svg' alt="Сообщение отправлено" className='w-[80px] h-[80px]'/>
                    <p className='text-[22px] font-semibold text-center mt-[20px]'>Ваше сообщение отправлено</p>
                    <p className='text-[16px] font-normal text-center'>Мы внимательно рассмотрим ваш вопрос и свяжемся с вами в ближайшее время</p>
                </div>
                }
        </div>
    );
}

export default Support;