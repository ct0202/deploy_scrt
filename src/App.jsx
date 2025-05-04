import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import { FiltersProvider } from "./context/FiltersContext";
import config from './config';
import { isTelegram } from './config';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollBlocker from "./ScrollBlocker";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './services/auth.service';
import { setAuthData } from './store/authSlice';
import TelegramIdInput from './components/TelegramIdInput';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';
import CalculatePage from './pages/CalculatePage';

import Meet from './pages/Meet';
import Match from './pages/Match';
import Filters from './pages/Filters';

import Chats from './pages/chats/Chats';
import ChatView from './pages/chats/ChatView';
import VideoChat from './pages/chats/VideoChat';

import Profile from './pages/Profile';
import ProfileMenu from './pages/profileMenu';
import ProfileEdit from './pages/profile/ProfileEdit';
import Photo from './pages/profile/Photo';
import Main from './pages/profile/Main';
import MeetGoal from './pages/profile/MeetGoal';
import Audio from './pages/profile/Audio';
import Interests from './pages/profile/Interests';
import DeleteProfile from './pages/profile/DeleteProfile';
import ConfirmDeleteProfile from './pages/profile/ConfirmDeleteProfile';

import Notifications from './pages/Notifications';
import Invite from './pages/profile/Invite';
import Support from './pages/Support';
import MytaIdea from './pages/MytaIdea';
import MakePayment from './pages/payments/MakePayment';
import Premium from './pages/payments/Premium';

import Roulette from './pages/chats/Roulette';
import Streams from './pages/streaming/Streams';
import WatchingStream from './pages/streaming/WatchingStream';
import StreamFilters from './pages/streaming/StreamFilters';
import Streamer from './pages/streaming/Streamer';
import StreamBroadcaster from './pages/streaming/StreamBroadcaster';
import StreamViewer from './pages/streaming/StreamViewer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const { telegramId } = authState || {};
    console.log('authState', authState);
    const { initAuth } = useAuth();
    const [showTelegramIdInput, setShowTelegramIdInput] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isTelegram === 1) { 
            const tg = window.Telegram.WebApp;
            
            tg.requestFullscreen();
            tg.disableVerticalSwipes();
            tg.ready();

            const initData = tg.initData;
            let userData = new URLSearchParams(initData);
            userData = JSON.parse(userData.get("user"));
            const tg_id = userData.id;
            console.log('tg_id', tg_id);
            dispatch(setAuthData({ 
              auth_token: null,
              userId: null,
              telegramId: tg_id
            }));
            
            
            return () => {
                tg.close();
            };
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            if (telegramId) { 
                await initAuth();
                setIsInitialized(true);
            } else {
                if (isTelegram !== 1) {
                    setShowTelegramIdInput(true);
                }
                setIsInitialized(true);
            }
        };
        checkAuth();
    }, [initAuth, telegramId]);

    const handleTelegramIdSet = async (id) => {
        dispatch(setAuthData({ 
            auth_token: null,
            userId: null,
            telegramId: id
        }));
        setShowTelegramIdInput(false);
        await initAuth();
    };

    if (!isInitialized) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorBoundary>
            <ToastContainer />
            <Suspense fallback={<LoadingSpinner />}>
                <RegistrationProvider>
                    <FiltersProvider>
                        <div
                            className="App flex flex-col justify-start items-center w-[100%] h-[100%] [background:linear-gradient(180deg,rgb(1,13,13)_0%,rgb(3.01,42.5,42.5)_100%)] bg-[100%_100%] bg-repeat-y bg-cover"
                            style={{ height: "100vh" }}
                        >
                            <ScrollBlocker />
                            {showTelegramIdInput && <TelegramIdInput onTelegramIdSet={handleTelegramIdSet} />}
                            <Routes>
                                {/* Public Routes */}
                                <Route path={config.ROUTES.HOME} element={<Layout />}>
                                    <Route index element={<HomePage />} />
                                    <Route path={config.ROUTES.MENU} element={<Menu />} />
                                    <Route path={config.ROUTES.CALCULATE} element={<CalculatePage />} />
                                </Route>
                                
                                {/* Protected Routes */}
                                <Route path={config.ROUTES.HOME} element={
                                    <ProtectedRoute>
                                        <Layout />
                                    </ProtectedRoute>
                                }>
                                    {/* Dating Features */}
                                    <Route path={config.ROUTES.MEET} element={<Meet />} />
                                    <Route path={config.ROUTES.MATCH} element={<Match />} />
                                    <Route path={config.ROUTES.FILTERS} element={<Filters />} />

                                    {/* Streaming Features */}
                                    <Route path={config.ROUTES.STREAMS.LIST} element={<Streams />} />
                                    <Route path={`${config.ROUTES.STREAMS.WATCH}/:stream_id`} element={<WatchingStream />} />
                                    <Route path={config.ROUTES.STREAMS.FILTERS} element={<StreamFilters />} />
                                    <Route path={`${config.ROUTES.STREAMS.STREAMER}/:id`} element={<Streamer />} />
                                    <Route path={`${config.ROUTES.STREAMS.BROADCASTER}/:streamId`} element={<StreamBroadcaster />} />
                                    <Route path="/streaming/watch/:streamId" element={<StreamViewer />} />
                                    <Route path="/roulette" element={<Roulette />} />

                                    {/* Chat Features */}
                                    <Route path={config.ROUTES.CHATS.LIST} element={<Chats />} />
                                    <Route path={config.ROUTES.CHATS.TEXT} element={<ChatView />} />
                                    <Route path={config.ROUTES.CHATS.VIDEO} element={<VideoChat />} />

                                    {/* Profile Features */}
                                    <Route path={config.ROUTES.PROFILE.VIEW} element={<Profile />} />
                                    <Route path={config.ROUTES.NOTIFICATIONS} element={<Notifications />} />
                                    <Route path={config.ROUTES.PROFILE_MENU} element={<ProfileMenu />} />
                                    <Route path={config.ROUTES.PROFILE.EDIT} element={<ProfileEdit />} />
                                    <Route path={config.ROUTES.PROFILE.PHOTO} element={<Photo />} />
                                    <Route path={config.ROUTES.PROFILE.MAIN} element={<Main />} />
                                    <Route path={config.ROUTES.PROFILE.MEET_GOAL} element={<MeetGoal />} />
                                    <Route path={config.ROUTES.PROFILE.AUDIO} element={<Audio />} />
                                    <Route path={config.ROUTES.PROFILE.INTERESTS} element={<Interests />} />
                                    <Route path={config.ROUTES.PROFILE.DELETE} element={<DeleteProfile />} />
                                    <Route path={config.ROUTES.PROFILE.CONFIRM_DELETE} element={<ConfirmDeleteProfile />} />

                                    {/* Payment Features */}
                                    <Route path={config.ROUTES.INVITE} element={<Invite />} />
                                    <Route path={config.ROUTES.PAYMENT} element={<MakePayment />} />
                                    <Route path={config.ROUTES.PREMIUM} element={<Premium />} />
                                    <Route path={config.ROUTES.MYTA_IDEA} element={<MytaIdea />} />
                                </Route>
                            </Routes>
                        </div>
                    </FiltersProvider>
                </RegistrationProvider>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
