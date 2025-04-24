import { io } from 'socket.io-client';
import { axiosPrivate } from '../axios';
import config from '../config';

let socket = null;
const messageCallbacks = new Set();
const typingCallbacks = new Set();

export const connect = (token) => {
    if (socket) {
        disconnect();
    }

    socket = io(config.WS_URL, {
        path: '/socket.io',
        auth: { token },
        transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
        console.log('Connected to chat server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from chat server');
    });

    socket.on('new-message', (data) => {
        console.log('New message received:', data);
        if (data.chatHistory) {
            // Update chat history
            messageCallbacks.forEach(callback => callback({
                type: 'history',
                data: data.chatHistory
            }));
        }
        if (data.message) {
            // Handle individual message
            messageCallbacks.forEach(callback => callback({
                type: 'message',
                data: data.message
            }));
        }
    });

    socket.on('messages-read', (data) => {
        // Handle read receipts if needed
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
};

export const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const joinChat = (chatId) => {
    if (socket) {
        socket.emit('join-chat', chatId);
    }
};

export const sendMessage = (chatId, content) => {
    if (socket) {
        const userId = localStorage.getItem('userId');
        socket.emit('send-message', {
            chatId,
            senderId: userId,
            content
        });
    }
};

export const markAsRead = (chatId) => {
    if (socket) {
        const userId = localStorage.getItem('userId');
        socket.emit('mark-read', {
            chatId,
            userId
        });
    }
};

export const onMessage = (callback) => {
    messageCallbacks.add(callback);
    return () => messageCallbacks.delete(callback);
};

export const onTyping = (callback) => {
    typingCallbacks.add(callback);
    return () => typingCallbacks.delete(callback);
};

async function getUserChats(page = 1, limit = 20) {
    try {
        const response = await axiosPrivate.get(config.API.CHATS.BASE, {
            params: { page, limit },
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.data || !response.data.data) {
            throw new Error('Invalid response from server');
        }

        return {
            status: 'success',
            data: {
                chats: response.data.data
            }
        };
    } catch (error) {
        console.error('Error fetching user chats:', error);
        throw error;
    }
}

async function getChatHistory(chatId, page = 1, limit = 50) {
    try {
        console.log('Fetching chat history for chatId:', chatId);
        const response = await axiosPrivate.get(config.API.CHATS.HISTORY(chatId), {
            params: { page, limit },
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.data) {
            throw new Error('Invalid response from server');
        }

        return {
            status: 'success',
            data: {
                chats: response.data.data
            }
        };
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
}

async function updateTypingStatus(chatId, isTyping) {
    // try {
    //     const response = await axiosPrivate.post(config.API.CHATS.TYPING(chatId), {
    //         isTyping
    //     });

    //     if (!response.data) {
    //         throw new Error('Invalid response from server');
    //     }

    //     return response.data;
    // } catch (error) {
    //     console.error('Error updating typing status:', error);
    //     throw error;
    // }
}

export default {
    connect,
    disconnect,
    joinChat,
    sendMessage,
    markAsRead,
    onMessage,
    onTyping,
    getUserChats,
    getChatHistory,
    updateTypingStatus
}; 