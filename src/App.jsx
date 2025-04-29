import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import { FiltersProvider } from "./context/FiltersContext";
import config from './config';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollBlocker from "./ScrollBlocker";
import { useAuth } from './services/auth.service';
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

import Streams from './pages/streaming/Streams';
import WatchingStream from './pages/streaming/WatchingStream';
import StreamFilters from './pages/streaming/StreamFilters';
import Streamer from './pages/streaming/Streamer';
import StreamBroadcaster from './pages/streaming/StreamBroadcaster';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { initAuth } = useAuth();
  const [showTelegramIdInput, setShowTelegramIdInput] = useState(false);
  const [isTelegram, setIsTelegram] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isTelegram === 1) { 
      const tg = window.Telegram.WebApp;
      tg.requestFullscreen();
      tg.disableVerticalSwipes();
      tg.ready();

      return () => {
        tg.close(); // Закрытие веб-приложения (при необходимости)
      };
    }
  }, []);

    useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.requestFullscreen();
      tg.disableVerticalSwipes();
      tg.ready();
  
      return () => {
        tg.close(); // Закрытие веб-приложения (при необходимости)
      };
    }, []);


    useEffect(() => {
        const checkAuth = async () => {
            // Check if we're in Telegram environment

            // const isTelegramEnv = 0;
            // setIsTelegram(isTelegramEnv ? 1 : 0);
            
            if (!isTelegram) {
                const telegramId = localStorage.getItem('telegramId');
                if (!telegramId) {
                    setShowTelegramIdInput(true);
                } else {
                    await initAuth();
                }
            } else {
                await initAuth();
            }
            setIsInitialized(true);
        };

        checkAuth();
    }, []);

    const handleTelegramIdSet = async (telegramId) => {
        localStorage.setItem('telegramId', telegramId);
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
                {/* <Route path={config.ROUTES.SUPPORT} element={<Support />} />
                <Route path={config.ROUTES.MYTA_IDEA} element={<MytaIdea />} /> */}
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
                {/* <Route path={config.ROUTES.REACTION} element={<ReactOnUser />} /> */}

                {/* Streaming Features */}
                <Route path={config.ROUTES.STREAMS.LIST} element={<Streams />} />
                <Route path={config.ROUTES.STREAMS.WATCH} element={<WatchingStream />} />
                <Route path={config.ROUTES.STREAMS.FILTERS} element={<StreamFilters />} />
                <Route path={config.ROUTES.STREAMS.STREAMER} element={<Streamer />} />
                <Route path={config.ROUTES.STREAMS.BROADCASTER} element={<StreamBroadcaster />} />

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
