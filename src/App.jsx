import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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

function App() {
  useEffect(() => {
    if (1) {
      const tg = window.Telegram.WebApp;
      tg.disableVerticalSwipes();
      tg.requestFullscreen();
      tg.ready();
      tg.expand();
      let userData = new URLSearchParams(tg.initData);
      console.log('update 4');
      userData = JSON.parse(userData.get("user"));
      localStorage.setItem("userId", userData.id);
    }
  }, []);

  return (
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
  );
}

export default App;
