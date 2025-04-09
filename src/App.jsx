import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, updateRegistrationData, updatePhoto, setAudioMessage } from './store/userSlice';
import Layout from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import Menu from "./pages/Menu";
import { FiltersProvider } from "./context/FiltersContext";
import CalculatePage from "./pages/CalculatePage";
import Meet from "./pages/Meet";
import Streams from "./pages/Streams";
import WatchingStream from "./pages/WatchingStream";
import Filters from "./pages/Filters";
import Chat from "./pages/Chat"
import StreamFilters from "./pages/StreamFilters";
import Match from "./pages/Match";
import TextChats from "./pages/TextChats";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ProfileMenu from "./pages/profileMenu";
import ProfileEdit from "./pages/profile/ProfileEdit";
import FullChat from "./pages/FullChat";

import ScrollBlocker from "./ScrollBlocker";
import Photo from "./pages/profile/Photo";
import Main from "./pages/profile/Main";
import MeetGoal from "./pages/profile/MeetGoal";
import Audio from "./pages/profile/Audio";
import Interests from "./pages/profile/Interests";
import DeleteProfile from "./pages/profile/DeleteProfile";
import ConfirmDeleteProfile from "./pages/profile/ConfirmDeleteProfile";

import Invite from "./pages/profile/Invite";
import Support from "./pages/profile/Support";
import ReactOnUser from "./pages/ReactOnUser";

import Premium from "./pages/Premium";
import MytaIdea from "./pages/profile/MytaIdea";
import MakePayment from "./pages/MakePayment";
import Streamer from "./pages/Streamer";
import axios from './axios';

import { useNavigate } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (1) {
        const tg = window.Telegram.WebApp;
        tg.disableVerticalSwipes();
        tg.requestFullscreen();
        tg.ready();
        tg.expand();

        console.log('update 5');
        if (!userId) {
          let userData = new URLSearchParams(tg.initData);
          userData = JSON.parse(userData.get("user"));
          dispatch(setUserId(userData.id));
          
          // Отправляем ID на сервер для логина
          try {
            const response = await axios.post('/users/login', {
              telegramId: userData.id
            });
            
            if (response.data) {
              // Сохраняем токен
              if (response.data.token) {
                localStorage.setItem('token', response.data.token);
              }
              
              // Если есть данные пользователя, загружаем их в Redux
              if (response.data.user) {
                dispatch(updateRegistrationData({ field: 'name', value: response.data.user.name }));
                dispatch(updateRegistrationData({ field: 'gender', value: response.data.user.gender }));
                dispatch(updateRegistrationData({ field: 'wantToFind', value: response.data.user.wantToFind }));
                dispatch(updateRegistrationData({ field: 'birthDay', value: response.data.user.birthDay }));
                dispatch(updateRegistrationData({ field: 'country', value: response.data.user.country }));
                dispatch(updateRegistrationData({ field: 'city', value: response.data.user.city }));
                dispatch(updateRegistrationData({ field: 'coordinates', value: response.data.user.coordinates }));
                dispatch(updateRegistrationData({ field: 'purpose', value: response.data.user.purpose }));
                dispatch(updateRegistrationData({ field: 'interests', value: response.data.user.interests }));
                
                // Загружаем фото
                if (response.data.user.photos) {
                  response.data.user.photos.forEach((photo, index) => {
                    if (photo) {
                      dispatch(updatePhoto({ index, photo }));
                    }
                  });
                }
                
                // Загружаем аудио
                if (response.data.user.audioMessage) {
                  dispatch(setAudioMessage(response.data.user.audioMessage));
                }
              }
            }
          } catch (error) {
            console.error('Login error:', error);
          }
        } else {
          console.log(userId);
        }
      } else {
        // Для разработки устанавливаем фиксированный telegramId
        if (!userId) {
          dispatch(setUserId(1009));
          
          // Отправляем ID на сервер для логина
          try {
            const response = await axios.post('/users/login', {
              telegramId: 1009
            });
            
            if (response.data) {
              // Сохраняем токен
              if (response.data.token) {
                localStorage.setItem('token', response.data.token);
              }
              
              // Если есть данные пользователя, загружаем их в Redux
              if (response.data.user) {
                dispatch(updateRegistrationData({ field: 'name', value: response.data.user.name }));
                dispatch(updateRegistrationData({ field: 'gender', value: response.data.user.gender }));
                dispatch(updateRegistrationData({ field: 'wantToFind', value: response.data.user.wantToFind }));
                dispatch(updateRegistrationData({ field: 'birthDay', value: response.data.user.birthDay }));
                dispatch(updateRegistrationData({ field: 'country', value: response.data.user.country }));
                dispatch(updateRegistrationData({ field: 'city', value: response.data.user.city }));
                // dispatch(updateRegistrationData({ field: 'coordinates', value: response.data.user.coordinates }));
                dispatch(updateRegistrationData({ field: 'purpose', value: response.data.user.purpose }));
                dispatch(updateRegistrationData({ field: 'interests', value: response.data.user.interests }));
                
                // Загружаем фото
                if (response.data.user.photos) {
                  response.data.user.photos.forEach((photo, index) => {
                    if (photo) {
                      dispatch(updatePhoto({ index, photo }));
                    }
                  });
                }
                
                // Загружаем аудио
                if (response.data.user.audioMessage) {
                  dispatch(setAudioMessage(response.data.user.audioMessage));
                }

                navigate('/meet');
              }
            }
          } catch (error) {
            console.error('Login error:', error);
          }
        }
      }
    };

    init();
  }, [dispatch, userId]);

  return (
    <RegistrationProvider>
      <FiltersProvider>
        <div
          className="App flex flex-col justify-start items-center w-[100%] h-[100%] [background:linear-gradient(180deg,rgb(1,13,13)_0%,rgb(3.01,42.5,42.5)_100%)] bg-[100%_100%] bg-repeat-y bg-cover"
          style={{ height: "100vh" }}
        >
          <ScrollBlocker />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" index element={<HomePage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/calculatePage" element={<CalculatePage />} />
              <Route path="/meet" element={<Meet />} />
              <Route path="/streams" element={<Streams />} />
              <Route path="/watchStreams" element={<WatchingStream />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/match" element={<Match />} />
              <Route path="/filters" element={<Filters />} />
              <Route path="/StreamFilters" element={<StreamFilters />} />
              <Route path="/textChats" element={<TextChats />} />
              <Route path="/1/profile" element={<Profile />} />
              <Route path="/1/streamer" element={<Streamer />} />
              <Route path="/1/reaction" element={<ReactOnUser />} />
              <Route path="/1/fullchat" element={<FullChat />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profileMenu" element={<ProfileMenu />} />

              <Route path="/profileEdit" element={<ProfileEdit/>} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/main" element={<Main />} />
              <Route path="/meetGoal" element={<MeetGoal />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/support" element={<Support />} />
              <Route path="/deleteprofile" element={<DeleteProfile />} />
              <Route path="/confirmdeleteprofile" element={<ConfirmDeleteProfile />} />
              <Route path="/makepayment" element={<MakePayment />} />


              <Route path="/premium" element={<Premium />}/>
              <Route path="/mytaidea" element={<MytaIdea/>} />
            </Route>
          </Routes>
        </div>
      </FiltersProvider>
    </RegistrationProvider>
  );
}

export default App;
