import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Navigation} from "../../components/shared/Navigation";
import config from "../../config";

function Streams() {
  const navigate = useNavigate();
  const [streams] = useState([
    {
      id: "test-stream-1",
      image: "/images/Card.svg",
      title: "Стрим 1"
    },
    {
      id: "test-stream-2",
      image: "/images/Card1.svg",
      title: "Стрим 2"
    },
    {
      id: "test-stream-3",
      image: "/images/Card.svg",
      title: "Стрим 3"
    },
    {
      id: "test-stream-4",
      image: "/images/Card1.svg",
      title: "Стрим 4"
    },
    {
      id: "test-stream-5",
      image: "/images/Card.svg",
      title: "Стрим 5"
    },
    {
      id: "test-stream-6",
      image: "/images/Card1.svg",
      title: "Стрим 6"
    }
  ]);

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
        {streams.map((stream) => (
          <img
            key={stream.id}
            onClick={() => navigate(`${config.ROUTES.STREAMS.WATCH}/${stream.id}`)}
            src={stream.image}
            alt={stream.title}
            className="cursor-pointer"
          />
        ))}
      </div>
      <img
        src="/icons/strimBtn.svg"
        onClick={() => navigate(`${config.ROUTES.STREAMS.BROADCASTER}/${"test-stream-id"}`)}
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
