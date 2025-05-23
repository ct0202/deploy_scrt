import { io } from 'socket.io-client';
import config from '../config';

let socket = null;
const messageCallbacks = new Set();
const historyCallbacks = new Set();
const errorCallbacks = new Set();

const connect = (token) => {
    if (socket) {
        disconnect();
    }

    socket = io(config.WS_URL, {
        path: '/socket.io',
        auth: { token },
        transports: ['websocket', 'polling']
    });

    setupEventListeners();
};

const setupEventListeners = () => {
    const result = socket.on('connect', () => {
        console.log('[StreamChatService] Connected to stream chat server');
    });
    console.log('[StreamChatService] Setup event listeners:', result);

    socket.on('disconnect', () => {
        console.log('[StreamChatService] Disconnected from stream chat server');
    });

    socket.on('new-message-stream', (data) => {
        console.log('[StreamChatService] New message received:', data);
        if (data.message) {
            messageCallbacks.forEach(callback => callback({
                type: 'message',
                data: data.message
            }));
        }
        if (data.chatHistory) {
            historyCallbacks.forEach(callback => callback(data.chatHistory));
        }
    });

    socket.on('stream-chat-history', (data) => {
        console.log('[StreamChatService] Chat history received:', data);
        historyCallbacks.forEach(callback => callback(data));
    });

    socket.on('stream-chat-created', (data) => {
        console.log('[StreamChatService] Stream chat created:', data);
        messageCallbacks.forEach(callback => callback({
            type: 'system',
            data: {
                streamId: data.streamId,
                message: data.welcomeMessage
            }
        }));
    });

    socket.on('error', (error) => {
        console.error('[StreamChatService] Socket error:', error);
        errorCallbacks.forEach(callback => callback(error));
    });
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

const createStreamChat = (streamerId) => {
    console.log('[StreamChatService] Creating stream chat for:', streamerId);
    if (!socket) {
        throw new Error('Socket not connected');
    }
    const result = socket.emit('create-stream-chat', { streamerId });
    console.log('[StreamChatService] Stream chat created:', result);
    return result;
};

const joinStreamChat = (streamId) => {
    console.log('[StreamChatService] Joining stream chat:', streamId);
    if (!socket) {
        throw new Error('Socket not connected');
    }
    socket.emit('join-chat-stream', streamId);
};

const sendMessage = (streamId, userId, message) => {
    console.log('[StreamChatService] Sending message to stream:', streamId);
    if (!socket) {
        throw new Error('Socket not connected');
    }
    socket.emit('send-message-stream', {
        streamId,
        userId,
        message
    });
};

const onMessage = (callback) => {
    messageCallbacks.add(callback);
    return () => messageCallbacks.delete(callback);
};

const onHistory = (callback) => {
    historyCallbacks.add(callback);
    return () => historyCallbacks.delete(callback);
};

const onError = (callback) => {
    errorCallbacks.add(callback);
    return () => errorCallbacks.delete(callback);
};

const streamChatService = {
    connect,
    disconnect,
    createStreamChat,
    joinStreamChat,
    sendMessage,
    onMessage,
    onHistory,
    onError
};

export default streamChatService;
