import { io } from 'socket.io-client';
import { axiosPrivate } from '../axios';
import config from '../config';

let socket = null;
const messageCallbacks = new Set();
const typingCallbacks = new Set();

const connect = (token) => {
    if (socket) {
        disconnect();
    }

    socket = io(config.WS_URL, {
        path: '/socket.io',
        auth: { token },
        transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
        console.log('[ChatService] Connected to chat server');
    });

    socket.on('disconnect', () => {
        console.log('[ChatService] Disconnected from chat server');
    });

    socket.on('new-message', (data) => {
        console.log('[ChatService] New message received:', data);
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
        console.error('[ChatService] Socket error:', error);
    });
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

const joinChat = (chatId) => {
    if (socket) {
        socket.emit('join-chat', chatId);
    }
};

const sendMessage = (chatId, senderId, content) => {
    if (socket) {
        socket.emit('send-message', {
            chatId,
            senderId,
            content
        });
    }
};

const markAsRead = (chatId) => {
    if (socket) {
        const userId = localStorage.getItem('userId');
        socket.emit('mark-read', {
            chatId,
            userId
        });
    }
};

const onMessage = (callback) => {
    messageCallbacks.add(callback);
    return () => messageCallbacks.delete(callback);
};

const onTyping = (callback) => {
    // typingCallbacks.add(callback);
    // return () => typingCallbacks.delete(callback);
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
        console.error('[ChatService] Error fetching user chats:', error);
        throw error;
    }
}

async function getChatHistory(chatId, page = 1, limit = 50) {
    try {
        console.log('[ChatService] Fetching chat history for chatId:', chatId);
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
        console.error('[ChatService] Error fetching chat history:', error);
        throw error;
    }
}

async function updateTypingStatus(chatId, isTyping) {
    // try {
    //     socket.emit("is-typing", isTyping);
    // } catch (error) {
    //     console.error('Error updating typing status:', error);
    //     throw error;
    // }
}

const chatService = {
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

export default chatService; 