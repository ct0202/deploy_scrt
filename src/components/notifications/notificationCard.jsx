import {useNavigate} from "react-router-dom";

export const NotificationCard = ({id, img, name, age, type, status})  => {
    const navigate = useNavigate();
    return (
        <div className="text-white w-full flex flex-row h-[84px] items-center font-raleway">
            <img src={img} alt="user avatar" className='w-[48px] h-[48px] rounded-[50%] ml-[16px] mr-[16px]' onClick={() => {navigate(`/${id}/profile`)}}/>
            <div className="flex flex-col w-[220px] gap-1">
                <p className='text-[14px] font-normal'>{type === 'superlike'}</p>
                <p className='text-[16px] font-semibold leading-[24px] '>{name}, {age}</p>
            </div>
            <div className="flex flex-col justify-center w-[100px] items-end mr-5">
                {status === 'new' ?
                    <div className={`rounded-[400px] bg-[#A1F69E] w-[58px] h-[25px] flex items-center justify-center
                text-black`}>NEW</div>
                    : <></>}
            </div>
        </div>
    );
}