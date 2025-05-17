import { io } from 'socket.io-client';
import config from '../config';

let socket = null;
const matchCallbacks = new Set();
const messageCallbacks = new Set();
const endCallbacks = new Set();
const errorCallbacks = new Set();

const connect = () => {
    if (socket) {
        disconnect();
    }

    socket = io(`${config.WS_URL}/roulette`, {
        path: '/socket.io', 
        transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
        console.log('[RouletteService] Connected to roulette socket');
    });

    socket.on('error', (error) => {
        console.error('[RouletteService] Socket error:', error);
        errorCallbacks.forEach(cb => cb(error));
    });

    socket.on('roulette_matched', (data) => {
        console.log('[RouletteService] Matched:', data);
        matchCallbacks.forEach(cb => cb(data));
    });

    socket.on('roulette-message', (data) => {
        console.log("roulette-message")
        messageCallbacks.forEach(cb => cb(data));
    });

    socket.on('roulette-chat-ended', () => {
        endCallbacks.forEach(cb => cb());
    });
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

const sendMessage = (roomId, message) => {
    if (!socket || !roomId || !message) return;
    socket.emit('roulette-message', { roomId, message });
};

const endChat = (roomId) => {
    if (!socket || !roomId) return;
    socket.emit('end-roulette-chat', { roomId });
};

const onMatched = (callback) => {
    matchCallbacks.add(callback);
    return () => matchCallbacks.delete(callback);
};

const onMessage = (callback) => {
    messageCallbacks.add(callback);
    return () => messageCallbacks.delete(callback);
};

const onEnd = (callback) => {
    endCallbacks.add(callback);
    return () => endCallbacks.delete(callback);
};

const onError = (callback) => {
    errorCallbacks.add(callback);
    return () => errorCallbacks.delete(callback);
};

const joinChat = (userId) => {
    if (!socket || !userId) return;
    socket.emit('join_chat_roulette', { userId });
};

const rouletteService = {
    connect,
    disconnect,
    sendMessage,
    endChat,
    onMatched,
    onMessage,
    onEnd,
    joinChat,
    onError
};

export default rouletteService;
