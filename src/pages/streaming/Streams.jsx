import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Navigation} from "../../components/shared/Navigation";
import config from "../../config";
import { axiosPrivate } from "../../axios";
import { toast } from "react-toastify";

function Streams() {
  const navigate = useNavigate();
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
              className="relative cursor-pointer"
              onClick={() => navigate(`${config.ROUTES.STREAMS.WATCH}/${stream}`)}
            >
              <img
                src={stream.thumbnail || "/images/Card.svg"}
                alt={stream.title}
                className="w-[164px] h-[164px] object-cover rounded-[16px]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-[16px]">
                <p className="text-white text-sm font-medium truncate">
                  {stream.title}
                </p>
                <p className="text-white/80 text-xs">
                  {stream.viewerCount || 0} watching
                </p>
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
