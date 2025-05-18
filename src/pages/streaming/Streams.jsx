import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Navigation} from "../../components/shared/Navigation";
import config from "../../config";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Streams() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveStreams();
  }, []);

  const fetchActiveStreams = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get('/streams');
      console.log('Active streams:', response.data.data);
      setStreams(response.data.data);
    } catch (error) {
      console.error('Error fetching active streams:', error);
      toast.error('Failed to load streams. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        {isLoading ? (
          <div className="w-full text-center text-white">
            Loading streams...
          </div>
        ) : streams?.length === 0 ? (
          <div className="w-full text-center text-white">
            No active streams at the moment
          </div>
        ) : (
          streams?.map((stream) => (
            <div 
              key={stream.id}
              className="relative cursor-pointer w-[163px] h-[220px]"
              onClick={() => navigate(`${config.ROUTES.STREAMS.WATCH}/${stream}`)}
            >
              <img
                src={stream.thumbnail || ""}
                alt={stream.title}
                className="w-[100%] h-[100%] object-cover rounded-[16px]"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-[16px]"> */}
              <div className="absolute top-[8px] left-[8px] flex flex-row items-center gap-[8px]">
                {/* <p className="text-white text-sm font-medium truncate">
                  {stream.title}
                </p> */}
                <div className="bg-[#CE5D49] rounded-[46px] text-[12px] w-[59px] p-[8px] h-[33px] text-white">СТРИМ</div>
                <p className="text-white/80 text-xs">
                  <img src="/icons/views.png" alt="eye" className="w-[20px] h-[20px] inline-block"/> {stream.viewerCount || 0}
                </p>
              </div>
              <div className="mt-[12px] text-white text-[16px] font-medium truncate">
                {stream.title}
              </div>
            </div>
          ))
        )}
      </div>
      <img
        src="/icons/strimBtn.svg"
        onClick={() => navigate(`${config.ROUTES.STREAMS.BROADCASTER}`)}
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
