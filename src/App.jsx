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

import Chats from './pages/chats/Chats';
import ChatView from './pages/chats/ChatView';

import Meet from './pages/Meet';
import Match from './pages/Match';
import Filters from './pages/Filters';

// Lazy load components for better performance
// const Layout = React.lazy(() => import('./pages/Layout'));
// const HomePage = React.lazy(() => import('./pages/HomePage'));
// const Menu = React.lazy(() => import('./pages/Menu'));
// const CalculatePage = React.lazy(() => import('./pages/CalculatePage'));
// const Meet = React.lazy(() => import('./pages/Meet'));
// const Match = React.lazy(() => import('./pages/Match'));
// const Filters = React.lazy(() => import('./pages/Filters'));
// const Streams = React.lazy(() => import('./pages/Streams'));
// const WatchingStream = React.lazy(() => import('./pages/WatchingStream'));
// const StreamFilters = React.lazy(() => import('./pages/StreamFilters'));
// const Streamer = React.lazy(() => import('./pages/Streamer'));
// const Chats = React.lazy(() => import('./pages/chats/Chats'));
// const ChatView = React.lazy(() => import('./pages/chats/ChatView'));
const VideoChat = React.lazy(() => import('./pages/chats/VideoChat'));
// const Profile = React.lazy(() => import('./pages/Profile'));
// const ReactOnUser = React.lazy(() => import('./pages/ReactOnUser'));
// const Notifications = React.lazy(() => import('./pages/Notifications'));
// const ProfileMenu = React.lazy(() => import('./pages/profileMenu'));
// const ProfileEdit = React.lazy(() => import('./pages/ProfileEdit'));
// const Photo = React.lazy(() => import('./pages/Photo'));
// const Main = React.lazy(() => import('./pages/Main'));
// const MeetGoal = React.lazy(() => import('./pages/MeetGoal'));
// const Audio = React.lazy(() => import('./pages/Audio'));
// const Interests = React.lazy(() => import('./pages/Interests'));
// const DeleteProfile = React.lazy(() => import('./pages/DeleteProfile'));
// const ConfirmDeleteProfile = React.lazy(() => import('./pages/ConfirmDeleteProfile'));
// const Invite = React.lazy(() => import('./pages/Invite'));
// const Support = React.lazy(() => import('./pages/Support'));
// const MytaIdea = React.lazy(() => import('./pages/MytaIdea'));
// const MakePayment = React.lazy(() => import('./pages/MakePayment'));
// const Premium = React.lazy(() => import('./pages/Premium'));

function App() {
    const { initAuth } = useAuth();
    const [showTelegramIdInput, setShowTelegramIdInput] = useState(false);
    const [isTelegram, setIsTelegram] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
        const checkAuth = async () => {
            // Check if we're in Telegram environment
            const isTelegramEnv = 0;
            setIsTelegram(isTelegramEnv ? 1 : 0);
            
            if (!isTelegramEnv) {
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
                                    {/* <Route path={config.ROUTES.STREAMS.LIST} element={<Streams />} />
                                    <Route path={config.ROUTES.STREAMS.WATCH} element={<WatchingStream />} />
                                    <Route path={config.ROUTES.STREAMS.FILTERS} element={<StreamFilters />} />
                                    <Route path={config.ROUTES.STREAMS.STREAMER} element={<Streamer />} /> */}

                                    {/* Chat Features */}
                                    <Route path={config.ROUTES.CHATS.LIST} element={<Chats />} />
                                    <Route path={config.ROUTES.CHATS.TEXT} element={<ChatView />} />
                                    <Route path={config.ROUTES.CHATS.VIDEO} element={<VideoChat />} />

                                    {/* Profile Features */}
                                    {/* <Route path={config.ROUTES.PROFILE.VIEW} element={<Profile />} />
                                    <Route path={config.ROUTES.NOTIFICATIONS} element={<Notifications />} />
                                    <Route path={config.ROUTES.PROFILE_MENU} element={<ProfileMenu />} />
                                    <Route path={config.ROUTES.PROFILE.EDIT} element={<ProfileEdit />}>
                                        <Route path={config.ROUTES.PROFILE.PHOTO} element={<Photo />} />
                                        <Route path={config.ROUTES.PROFILE.MAIN} element={<Main />} />
                                        <Route path={config.ROUTES.PROFILE.MEET_GOAL} element={<MeetGoal />} />
                                        <Route path={config.ROUTES.PROFILE.AUDIO} element={<Audio />} />
                                        <Route path={config.ROUTES.PROFILE.INTERESTS} element={<Interests />} />
                                        <Route path={config.ROUTES.PROFILE.DELETE} element={<DeleteProfile />} />
                                        <Route path={config.ROUTES.PROFILE.CONFIRM_DELETE} element={<ConfirmDeleteProfile />} />
                                    </Route> */}

                                    {/* Payment Features */}
                                    {/* <Route path={config.ROUTES.INVITE} element={<Invite />} />
                                    <Route path={config.ROUTES.PAYMENT} element={<MakePayment />} />
                                    <Route path={config.ROUTES.PREMIUM} element={<Premium />} /> */}
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
