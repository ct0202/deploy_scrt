import React from "react";
import { useNavigate } from "react-router-dom";
import {Navigation} from "../../components/shared/Navigation";

function Streams() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center pt-[90px] w-[100%] h-[auto] relative">
      <div className="flex justify-between items-center w-[343px] h-[44px] mt-[21px]">
        <img alt='menu' src="/icons/Button-menu.svg" onClick={() => navigate("/profileMenu")}
        />
        <div className="flex gap-[8px]">
          <img alt='filters' src="/icons/Button-filters.svg" onClick={() => navigate("/StreamFilters")} />
          <img alt='notifications' src="/icons/Button-notifications.svg"
               onClick={() => {navigate('/notifications')}}
          />
        </div>
      </div>
      <div className="flex flex-wrap relative w-[343px] h-[auto] gap-[11px] mt-[12px] mb-[120px]">
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
        <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
            <Navigation tab={3} />
        </div>
    </div>
  );
}

export default Streams;
