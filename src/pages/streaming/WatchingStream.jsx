import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { toast } from 'react-toastify';
import { AGORA_APP_ID } from '../../config';

const WatchingStream = () => {
    const { streamId } = useParams();
    const userId = useSelector((state) => state.user.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [isWatching, setIsWatching] = useState(false);
    const [streamerName, setStreamerName] = useState('');

    // Agora refs
    const client = useRef(null);
    const remoteVideoContainer = useRef(null);

    useEffect(() => {
        initializeAgora();
        return () => {
            stopWatching();
        };
    }, []);

    const initializeAgora = async () => {
        try {
            // Initialize Agora client
            client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
            
            // Set client role to audience
            await client.current.setClientRole('audience');

            // Join the channel
            const token = null; // Using null token for testing
            const channelName = `stream-${streamId}`;
            await client.current.join(AGORA_APP_ID, channelName, token, userId);

            // Set up event handlers
            client.current.on('user-published', handleUserPublished);
            client.current.on('user-unpublished', handleUserUnpublished);

            setIsWatching(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error joining stream:', error);
            toast.error('Failed to join stream');
        }
    };

    const handleUserPublished = async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);
        
        if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            if (remoteVideoContainer.current) {
                remoteVideoTrack.play(remoteVideoContainer.current);
            } else {
                console.error("Remote video container not found");
            }
        }
        
        if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
        }
    };

    const handleUserUnpublished = async (user) => {
        await client.current.unsubscribe(user);
    };

    const stopWatching = async () => {
        try {
            if (client.current) {
                await client.current.leave();
            }
        } catch (error) {
            console.error('Error leaving stream:', error);
        } finally {
            setIsWatching(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Connecting to stream...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#022424] text-white p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Live Stream</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Streamer: {streamerName}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <div
                            ref={remoteVideoContainer}
                            id="remote-video"
                            className="w-full aspect-video bg-black rounded-lg overflow-hidden"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="bg-[#043939] p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Stream Info</h2>
                            <div className="space-y-2">
                                <p className="text-sm">Stream ID: {streamId}</p>
                                <p className="text-sm">Status: {isWatching ? 'Connected' : 'Disconnected'}</p>
                            </div>
                        </div>

                        <div className="bg-[#043939] p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Chat</h2>
                            <div className="h-64 bg-[#022424] rounded p-2">
                                {/* Chat messages will go here */}
                                <p className="text-sm text-gray-400">Chat coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchingStream;
