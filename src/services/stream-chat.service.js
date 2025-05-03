import { io } from 'socket.io-client';
import config from '../config';

class StreamChatService {
    constructor() {
        this.socket = null;
        this.messageCallbacks = new Set();
        this.historyCallbacks = new Set();
        this.errorCallbacks = new Set();
    }

    connect(token) {
        if (this.socket) {
            this.disconnect();
        }

        this.socket = io(config.WS_URL, {
            path: '/socket.io',
            auth: { token },
            transports: ['websocket', 'polling']
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.socket.on('connect', () => {
            console.log('Connected to stream chat server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from stream chat server');
        });

        this.socket.on('new-message-stream', (data) => {
            if (data.message) {
                this.messageCallbacks.forEach(callback => callback({
                    type: 'message',
                    data: data.message
                }));
            }
            if (data.chatHistory) {
                this.historyCallbacks.forEach(callback => callback(data.chatHistory));
            }
        });

        this.socket.on('stream-chat-history', (data) => {
            this.historyCallbacks.forEach(callback => callback(data));
        });

        this.socket.on('stream-chat-created', (data) => {
            this.messageCallbacks.forEach(callback => callback({
                type: 'system',
                data: {
                    streamId: data.streamId,
                    message: data.welcomeMessage
                }
            }));
        });

        this.socket.on('error', (error) => {
            this.errorCallbacks.forEach(callback => callback(error));
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    createStreamChat(streamerId) {
        console.log('[StreamChatService] Creating stream chat');
        if (!this.socket) {
            throw new Error('Socket not connected');
        }
        this.socket.emit('create-stream-chat', { streamerId });
    }

    joinStreamChat(streamId) {
        if (!this.socket) {
            throw new Error('Socket not connected');
        }
        this.socket.emit('join-chat-stream', streamId);
    }

    sendMessage(streamId, message) {
        if (!this.socket) {
            throw new Error('Socket not connected');
        }
        this.socket.emit('send-message-stream', {
            streamId,
            message
        });
    }

    onMessage(callback) {
        this.messageCallbacks.add(callback);
        return () => this.messageCallbacks.delete(callback);
    }

    onHistory(callback) {
        this.historyCallbacks.add(callback);
        return () => this.historyCallbacks.delete(callback);
    }

    onError(callback) {
        this.errorCallbacks.add(callback);
        return () => this.errorCallbacks.delete(callback);
    }
}

// Export a singleton instance
export default new StreamChatService();
