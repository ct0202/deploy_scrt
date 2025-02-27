import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Streams() {
  const navigate = useNavigate();
  const [menuAction, setMenuAction] = useState(3);


  return (
    <div className="flex flex-col justify-center items-center pt-[70px] w-[100%] h-[auto] relative">
      <div className="flex justify-between items-center w-[343px] h-[44px] mt-[21px]">
        <img src="/icons/Button-menu.svg" alt="" />
        <div className="flex gap-[8px]">
          <img src="/icons/Button-filters.svg" alt="" onClick={() => navigate("/StreamFilters")} />
          <img src="/icons/Button-notifications.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-wrap relative w-[343px] gap-[11px] mt-[12px] mb-[120px]">
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card.svg"
          alt=""
        />
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card1.svg"
          alt=""
        />
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card.svg"
          alt=""
        />
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card1.svg"
          alt=""
        />
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card.svg"
          alt=""
        />
        <img
          onClick={() => navigate("/watchStreams")}
          src="/images/Card1.svg"
          alt=""
        />
      </div>
      <img
        src="/icons/strimBtn.svg"
        className="fixed bottom-[112px] right-[24px] "
        alt=""
      />
      <div className="w-[100%] flex items-center justify-center fixed bottom-0 bg-[#032b2b] ">
        <div className="w-[338px] mt-[20px] h-[70px] mb-4 bg-[#FFFFFF1A] flex flex-row justify-evenly items-center rounded-[400px]">
          <div
            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
              menuAction === 1 ? "bg-[#FFFFFF1A]" : "bg-transparent"
            }`}
            onClick={() => {
              setMenuAction(1);
              navigate("/Meet");
            }}
          >
            <img
              src="/icons/bottom_bar_button_1.svg"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div
            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
              menuAction === 2 ? "bg-[#FFFFFF1A]" : "bg-transparent"
            }`}
            onClick={() => {
              setMenuAction(2);
              navigate("/Chat")
            }}
          >
            <img
              src="/icons/bottom_bar_button_2.svg"
              className=" w-[24px] h-[24px]"
            />
          </div>
          <div
            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
              menuAction === 3 ? "bg-[#FFFFFF1A]" : "bg-transparent"
            }`}
            onClick={() => {
              setMenuAction(3);
              navigate("/streams");
            }}
          >
            <img
              src="/icons/bottom_bar_button_3.svg"
              className=" w-[24px] h-[24px]"
            />
          </div>
          <div
            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
              menuAction === 4 ? "bg-[#FFFFFF1A]" : "bg-transparent"
            }`}
            onClick={() => {
              setMenuAction(4);
            }}
          >
            <img
              src="/icons/bottom_bar_button_4.svg"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div
            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
              menuAction === 5 ? "bg-[#FFFFFF1A]" : "bg-transparent"
            }`}
            onClick={() => {
              setMenuAction(5);
            }}
          >
            <img src="/icons/myta-coin.svg" className="w-[24px] h-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Streams;
