import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { toast } from 'react-toastify';
import { AGORA_APP_ID } from '../../config';

const StreamBroadcaster = () => {
    const { streamId } = useParams();
    const userId = useSelector((state) => state.user.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamTitle, setStreamTitle] = useState('');
    const [streamDescription, setStreamDescription] = useState('');
    const [viewerCount, setViewerCount] = useState(0);

    // Agora refs
    const client = useRef(null);
    const localVideoTrack = useRef(null);
    const localAudioTrack = useRef(null);
    const localScreenTrack = useRef(null);
    const localVideoContainer = useRef(null);
    const statsInterval = useRef(null);

    useEffect(() => {
        initializeAgora();
        return () => {
            stopStreaming();
        };
    }, []);

    const initializeAgora = async () => {
        try {
            // Initialize Agora client
            client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
            
            // Set client role to host
            await client.current.setClientRole('host');

            // Join the channel
            const token = null; // Using null token for testing
            const channelName = `stream-${streamId}`;
            await client.current.join(AGORA_APP_ID, channelName, token, userId);

            // Create and publish local tracks
            localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
            localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();
            
            // Set video quality
            localVideoTrack.current.setEncoderConfiguration({
                width: 1280,
                height: 720,
                frameRate: 30,
                bitrateMin: 1000,
                bitrateMax: 2000
            });

            // Play local video
            if (localVideoContainer.current) {
                localVideoTrack.current.play(localVideoContainer.current);
            } else {
                console.error("Remote video container not found");
            }

            // Publish tracks
            await client.current.publish([localAudioTrack.current, localVideoTrack.current]);

            // Set up periodic stats check for viewer count
            statsInterval.current = setInterval(async () => {
                try {
                    const stats = await client.current.getRTCStats();
                    // Subtract 1 to exclude the broadcaster from the count
                    setViewerCount(Math.max(0, stats.UserCount - 1));
                } catch (error) {
                    console.error('Error getting stats:', error);
                }
            }, 5000); // Check every 5 seconds

            setIsStreaming(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error initializing stream:', error);
            toast.error('Failed to start stream');
        }
    };

    const toggleScreenShare = async () => {
        try {
            if (!localScreenTrack.current) {
                // Start screen sharing
                localScreenTrack.current = await AgoraRTC.createScreenVideoTrack();
                await client.current.publish(localScreenTrack.current);
                localVideoTrack.current.stop();
                localScreenTrack.current.play(localVideoContainer.current);
            } else {
                // Stop screen sharing
                await client.current.unpublish(localScreenTrack.current);
                localScreenTrack.current.close();
                localScreenTrack.current = null;
                await client.current.publish(localVideoTrack.current);
                localVideoTrack.current.play(localVideoContainer.current);
            }
        } catch (error) {
            console.error('Error toggling screen share:', error);
            toast.error('Failed to toggle screen share');
        }
    };

    const toggleMute = () => {
        if (localAudioTrack.current) {
            localAudioTrack.current.setEnabled(!localAudioTrack.current.enabled);
        }
    };

    const toggleVideo = () => {
        if (localVideoTrack.current) {
            localVideoTrack.current.setEnabled(!localVideoTrack.current.enabled);
            localVideoTrack.current.play(localVideoContainer.current);
        }
    };

    const stopStreaming = async () => {
        try {
            if (client.current) {
                // Stop all tracks
                if (localVideoTrack.current) {
                    localVideoTrack.current.stop();
                    localVideoTrack.current.close();
                }
                if (localAudioTrack.current) {
                    localAudioTrack.current.stop();
                    localAudioTrack.current.close();
                }
                if (localScreenTrack.current) {
                    localScreenTrack.current.stop();
                    localScreenTrack.current.close();
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
        } finally {
            setIsStreaming(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading stream setup...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#022424] text-white p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Live Stream</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Viewers: {viewerCount}</span>
                        <button
                            onClick={stopStreaming}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                        >
                            End Stream
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <div
                            ref={localVideoContainer}
                            id="local-video"
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
                            <h2 className="text-lg font-semibold mb-2">Stream Controls</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleMute}
                                    className="bg-[#022424] hover:bg-[#033333] px-4 py-2 rounded"
                                >
                                    {localAudioTrack.current?.enabled ? 'Mute' : 'Unmute'}
                                </button>
                                <button
                                    onClick={toggleVideo}
                                    className="bg-[#022424] hover:bg-[#033333] px-4 py-2 rounded"
                                >
                                    {localVideoTrack.current?.enabled ? 'Stop Video' : 'Start Video'}
                                </button>
                                <button
                                    onClick={toggleScreenShare}
                                    className="bg-[#022424] hover:bg-[#033333] px-4 py-2 rounded"
                                >
                                    {localScreenTrack.current ? 'Stop Share' : 'Share Screen'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#043939] p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Stream Info</h2>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={streamTitle}
                                    onChange={(e) => setStreamTitle(e.target.value)}
                                    placeholder="Stream Title"
                                    className="w-full bg-[#022424] p-2 rounded"
                                />
                                <textarea
                                    value={streamDescription}
                                    onChange={(e) => setStreamDescription(e.target.value)}
                                    placeholder="Stream Description"
                                    className="w-full bg-[#022424] p-2 rounded h-24"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamBroadcaster; 