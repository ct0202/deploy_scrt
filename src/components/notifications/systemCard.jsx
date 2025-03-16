import {useNavigate} from "react-router-dom";

export const SystemCard = ({title, desc, status})  => {
    const navigate = useNavigate();
    return (
        <div className="text-white w-full flex flex-row h-[200px] items-center font-raleway relative">
            <div className="flex flex-col w-full gap-1 ml-[16px]">
                <p className='text-[16px] font-semibold leading-[24px]'>{title}</p>
                <p className='text-[14px] font-normal '>{desc}</p>
            </div>
            <div className="absolute top-[40px] right-1 flex flex-col justify-center w-[100px] items-end mr-3">
                {status === 'new' ?
                    <div className={`rounded-[400px] bg-[#A1F69E] w-[58px] h-[25px] flex items-center justify-center
                text-black`}>NEW</div>
                    : <></>}
            </div>
        </div>
    );
}