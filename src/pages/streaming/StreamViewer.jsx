import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { toast } from 'react-toastify';
import { AGORA_APP_ID } from '../../config';

const StreamViewer = () => {
    const { streamId } = useParams();
    const userId = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [viewerCount, setViewerCount] = useState(0);

    // Agora refs
    const client = useRef(null);
    const remoteVideoTrack = useRef(null);
    const remoteVideoContainer = useRef(null);
    const statsInterval = useRef(null);

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
            client.current.on('user-published', async (user, mediaType) => {
                if (mediaType === 'video') {
                    // Subscribe to the remote user's video track
                    await client.current.subscribe(user, mediaType);
                    remoteVideoTrack.current = user.videoTrack;
                    
                    // Play the remote video
                    if (remoteVideoContainer.current) {
                        remoteVideoTrack.current.play(remoteVideoContainer.current);
                    }
                }
            });

            client.current.on('user-unpublished', async (user) => {
                // Stop playing the remote video
                if (remoteVideoTrack.current) {
                    remoteVideoTrack.current.stop();
                }
            });

            // Set up periodic stats check for viewer count
            statsInterval.current = setInterval(async () => {
                try {
                    const stats = await client.current.getRTCStats();
                    setViewerCount(stats.UserCount);
                } catch (error) {
                    console.error('Error getting stats:', error);
                }
            }, 5000); // Check every 5 seconds

            setIsLoading(false);
        } catch (error) {
            console.error('Error initializing stream:', error);
            toast.error('Failed to join stream');
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
                                <div className="h-64 overflow-y-auto p-2 rounded">
                                    {/* Chat messages will go here */}
                                </div> 
                                <div className="flex w-full">
                                    <input
                                        type="text"
                                        placeholder="Оставить комментарий"
                                        className="bg-white/20 pl-[16px] text-white rounded w-[269px] h-[64px] rounded-[400px] placeholder:text-white"
                                    />
                                    <button className="hover:bg-[#033333] px-4 py-2 rounded">
                                        Send
                                    </button>
                                </div>
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