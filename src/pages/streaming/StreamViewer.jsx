import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { toast } from 'react-toastify';
import { AGORA_APP_ID } from '../../config';
import { axiosPrivate } from '../../axios';
import streamChatService from '../../services/stream-chat.service';

const StreamViewer = () => {
    const { streamId } = useParams();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [viewerCount, setViewerCount] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    // Agora refs
    const client = useRef(null);
    const remoteVideoTrack = useRef(null);
    const remoteVideoContainer = useRef(null);
    const statsInterval = useRef(null);

    useEffect(() => {
        console.log('Initializing stream with:', {
            streamId,
            userId,
            AGORA_APP_ID
        });

        initializeAgora();
        initializeChat();

        return () => {
            stopWatching();
            streamChatService.disconnect();
        };
    }, [streamId, userId]);

    const initializeChat = () => {
        try {
            console.log('[StreamViewer] Initializing chat...');
            // Connect to stream chat service
            const token = localStorage.getItem('token');
            streamChatService.connect(token);
            console.log('[StreamViewer] Connected to chat service');

            // Set up message listener
            // Set up message listener
            const messageUnsubscribe = streamChatService.onMessage((data) => {
                console.log('[StreamBroadcaster] Received message:', data);
                if (data.type === 'message') {
                    const formattedMessage = {
                        id: data.data._id,
                        username: data.data.username,
                        message: data.data.message,
                        timestamp: new Date(data.data.timestamp).toLocaleTimeString(),
                        role: data.data.role
                    };
                    console.log('[StreamBroadcaster] Formatted message:', formattedMessage);
                    // setChatMessages(prev => [...prev, formattedMessage]);
                } 
            });

            // Set up history listener
            const historyUnsubscribe = streamChatService.onHistory((data) => {
                console.log('[StreamBroadcaster] Received chat history:', data);
                const formattedMessages = data.messages;
                console.log('[StreamBroadcaster] Formatted history:', formattedMessages);
                setChatMessages(data?.data?.messages);

            });

            // Set up error listener
            const errorUnsubscribe = streamChatService.onError((error) => {
                console.error('[StreamBroadcaster] Chat error:', error);
                toast.error(error.message || 'Chat error occurred');
            });
            // Join stream chat
            console.log('[StreamViewer] Joining stream chat');
            streamChatService.joinStreamChat(streamId);

            // Cleanup on unmount
            return () => {
                console.log('[StreamViewer] Cleaning up chat listeners');
                messageUnsubscribe();
                historyUnsubscribe();
                errorUnsubscribe();
            };
        } catch (error) {
            console.error('[StreamViewer] Error initializing chat:', error);
            toast.error('Failed to initialize chat');
        }
    };

    const initializeAgora = async () => {
        try {
            // Initialize Agora client
            client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
            console.log('Agora client created');
            
            // Set client role to audience
            await client.current.setClientRole('audience');
            console.log('Client role set to audience');

            // Join the channel
            const token = null; // Using null token for testing
            const channelName = `stream-${streamId}`;
            console.log('Joining channel:', channelName);
            
            await client.current.join(AGORA_APP_ID, channelName, token, userId);
            console.log('Successfully joined channel');

            // Set up event handlers
            client.current.on('user-published', async (user, mediaType) => {
                console.log('User published:', user, mediaType);
                if (mediaType === 'video') {
                    try {
                        // Subscribe to the remote user's video track
                        await client.current.subscribe(user, mediaType);
                        console.log('Subscribed to user video');
                        
                        remoteVideoTrack.current = user.videoTrack;
                        
                        // Play the remote video
                        if (remoteVideoContainer.current) {
                            remoteVideoTrack.current.play(remoteVideoContainer.current);
                            console.log('Playing remote video');
                        }
                    } catch (error) {
                        console.error('Error subscribing to video:', error);
                        toast.error('Failed to subscribe to video');
                    }
                }
            });

            client.current.on('user-unpublished', async (user) => {
                console.log('User unpublished:', user);
                // Stop playing the remote video
                if (remoteVideoTrack.current) {
                    remoteVideoTrack.current.stop();
                }
            });

            // Set up periodic stats check for viewer count
            statsInterval.current = setInterval(async () => {
                try {
                    const stats = await client.current.getRTCStats();
                    console.log('Current stats:', stats);
                    setViewerCount(stats.UserCount);
                } catch (error) {
                    console.error('Error getting stats:', error);
                }
            }, 5000); // Check every 5 seconds

            setIsLoading(false);
        } catch (error) {
            console.error('Error initializing stream:', error);
            toast.error('Failed to join stream');
            // navigate(-1);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        try {
            console.log('[StreamViewer] Sending message:', messageInput);
            await streamChatService.sendMessage(streamId, userId, messageInput);
            console.log('[StreamViewer] Message sent successfully');
            setMessageInput('');
        } catch (error) {
            console.error('[StreamViewer] Error sending message:', error);
            toast.error('Failed to send message');
        }
    };

    const stopWatching = async () => {
        try {
            if (client.current) {
                // Stop remote video
                if (remoteVideoTrack.current) {
                    remoteVideoTrack.current.stop();
                }

                // Clear the stats interval
                if (statsInterval.current) {
                    clearInterval(statsInterval.current);
                }

                // Leave the channel
                await client.current.leave();
                console.log('Successfully left channel');
            }
        } catch (error) {
            console.error('Error stopping stream:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading stream...</div>
            </div>
        );
    }

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center text-white">
            <div className="w-full h-full relative">
                <div className="flex justify-between items-center mb-4 absolute top-0 left-0 z-[1000]">
                    <h1 className="text-2xl font-bold">Watching Stream</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Viewers: {viewerCount}</span>
                    </div>
                </div>

                <div className="relative h-full w-full">
                    <div className="w-full h-full bg-black overflow-hidden">
                        <div
                            ref={remoteVideoContainer}
                            id="remote-video"
                            className="w-full h-full bg-black overflow-hidden"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transform: 'rotate(0deg)'
                            }}
                        />
                    </div>

                    <div className="">
                        <div className="bg-transparent p-4 rounded-lg absolute bottom-0 left-0">
                            <h2 className="text-lg font-semibold mb-2">_____________</h2>
                            <div className="space-y-2">
                                <div className="h-64 overflow-y-auto bg-[#022424] p-2 rounded">
                                    {chatMessages.map((msg, index) => (
                                        <div key={index} className={`mb-2 ${msg.isSystem ? 'text-gray-400 italic' : ''}`}>
                                            <p className="text-sm text-gray-400">
                                                {msg.timestamp}
                                            </p>
                                            <p className="text-sm">
                                                {msg.isSystem ? (
                                                    <span>{msg.message}</span>
                                                ) : (
                                                    <>
                                                        <span className="font-semibold">{msg.username}:</span> {msg.message}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={sendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-[#022424] p-2 rounded text-white"
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-[#022424] hover:bg-[#033333] px-4 py-2 rounded"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* <div className="bg-[#043939] p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Stream Info</h2>
                            <div className="space-y-2">
                                <p className="text-sm">Stream ID: {streamId}</p>
                                <p className="text-sm">Your ID: {userId}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamViewer; 