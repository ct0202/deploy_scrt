import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import PresentsShop from "../components/shared/PresentsShop";

function WatchingStream() {
    const navigate = useNavigate();

    const [hint, setHint] = React.useState(true);
    const [presentsShop, setPresentsShop] = React.useState(false);
    const [comments, setComments] = React.useState([
        {id: 1, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Как часто вы пользуетесь картой Альфа Банка?'},
        {id: 1, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Привет, как дела?✌️✌️✌️'},
        {id: 1, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Давай знакомиться, привет!!!'},
        {id: 1, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: '', present: '/icons/presents/1.svg'}
    ]);


    const [swipeStart, setSwipeStart] = useState(0);
    const presentsRef = useRef(null);

    const handleTouchStart = (e) => {
        setSwipeStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        const swipeEnd = e.touches[0].clientY;
        const diff = swipeEnd - swipeStart;

        // Если свайпнули вниз на 100px — закрываем
        if (diff > 100) {
            setPresentsShop(false);
        }
    };

  return (
    <div className="flex flex-col justify-center items-center mt-[70px] w-[100%] h-[100vh] relative overflow-hidden overflow-x-hidden">
      <img src="/images/image 20.png" className="absolute z-0 top-0 w-[100vw] h-[100vh]" alt="" />
      <div className="absolute top-0 flex justify-between items-center w-[343px] h-[44px] mt-[21px] z-10">
        <img src="/icons/Info.svg" alt="" onClick={() => navigate("/1/streamer")} />
        <img
          src="/icons/Button-close.svg"
          alt=""
          onClick={() => navigate(-1)}
        />
      </div>
        <div className="absolute bottom-10 left-3 w-[100%] mr-2 ml-2 text-raleway text-white flex flex-col font-raleway">
            {
                comments.map((cmmnt, index) => (
                    <div className="flex flex-row mt-4">
                        <img src={`${cmmnt.avatar_src}`} className="w-[32px] h-[32px] mr-3" alt="" />
                        <div>
                            <p className= "text-[14px] font-normal">{cmmnt.nickname}</p>
                            {cmmnt.text === '' ? <img src={cmmnt.present} alt=""/> : <p className= "text-[14px] font-semibold w-[303px]">{cmmnt.text}</p>}
                        </div>
                    </div>
                ))
            }
            <div className="flex flex-row items-center w-[100%]">
                <div className="rounded-[400px] bg-[#FFFFFF33] flex items-center w-[269px] h-[64px] mt-4">
                    <input placeholder="Оставьте комментарий" className="pl-4 text-[18px] bg-transparent h-[64px] w-[269px] rounded-[400px] text-[#FFFFFF] font-normal"/>
                </div>
                <div className="ml-4 rounded-[50%] bg-[#FFFFFF33] flex items-center justify-center w-[64px] h-[64px] mt-4" onClick={()=>{setPresentsShop(true)}}>
                    <img src="/icons/present.svg" alt="" className="w-[24px] h-[24px]"/>
                </div>
            </div>
        </div>
        {hint && (
        <div className="absolute
                        w-[188px]
                        h-[92px]
                        bottom-[120px] right-[20px] flex">
            <img src="/icons/Hint.svg"/>
            <p className="absolute text-white text-[13px] font-semibold pl-1.5 pt-1 pr-1"><span className="text-[#A1F69E]">Стань заметнее,</span><br/> отправь приятный<br/> комлимент!</p>
            <img src="/icons/Button-close.svg" className="z-[10] w-[20px] h-[20px] absolute right-[10px] top-[10px]" onClick={()=> {setHint(false)}}/>
        </div>
        )}
        {presentsShop && (
            <div
                className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20 bg-black/80 backdrop-blur-[10px]"
                onClick={() => {
                    setPresentsShop(false)
                }}
            >
                <div
                    className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                    onClick={(e) => e.stopPropagation()}
                    ref={presentsRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <PresentsShop page={"stream"} />
                </div>
            </div>
        )}
      {/* <div className="flex flex-col justify-start items-center absolute h-[100%]"> */}
      {/* <img
        src="/icons/Frame 158.svg"
        className="absolute bottom-[21px] "
        alt=""
      /> */}
      {/* <div className="flex justify-center items-center gap-[10px]"></div> */}
      {/* </div> */}
    </div>
  );
}

export default WatchingStream;
