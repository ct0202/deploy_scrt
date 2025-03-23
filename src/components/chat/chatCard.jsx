import {useNavigate} from "react-router-dom";

export const ChatCard = ({id, img, name, age, lMsg, time, count})  => {
    const navigate = useNavigate();
    return (
        <div className="text-white w-[343px] flex flex-row h-[84px] items-center font-raleway">
            <img src={img} alt="user avatar" className='w-[48px] h-[48px] rounded-[50%] mr-[16px]' onClick={() => {navigate(`/${id}/profile`)}}/>
            <div className="flex flex-col w-[220px] gap-1">
                <p className='text-[16px] font-semibold leading-[24px] '>{name}, {age}</p>
                <p className='text-[14px] font-normal'>{lMsg}</p>
            </div>
            <div className="flex flex-col justify-center w-[100px] items-end">
                <p className="text-[14px] font-normal opacity-70 text-white text-right">{time}</p>
                {count > 0 ?
                <div className={`rounded-[50%] bg-[#A1F69E] w-[24px] h-[24px] flex items-center justify-center
                text-black`}>{count}</div>
                : <></>}
            </div>
        </div>
    );
}