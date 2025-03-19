import {useNavigate} from "react-router-dom";

function Premium() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-[12000px] overflow-scroll flex flex-col items-center justify-start relative'>
            <img src='/icons/premium_people.svg' />
            <img src='/icons/Button-close.svg' className='absolute top-[40px] right-[16px]' onClick={() => {navigate(-1)}} />
            <img src='/icons/Group.svg' className='absolute top-[150px] right-[150px]'/>
            <p className='font-raleway text-[40px] font-bold absolute top-[200px] text-white'>MYTA PREMIUM</p>
            <p className='font-raleway text-[16px] font-medium text-white top-[260px] absolute text-center w-[254px]'>C Premium вы найдёте партнёра в два раза быстрее</p>
            <img src='/icons/Group%2048095574.svg' className='absolute top-[480px]'/>
            <img src='/icons/Text.svg' className='absolute top-[1040px]'/>
            <img src='/icons/premium-button-main.svg' className='absolute top-[1120px]'/>
        </div>
    );
}

export default Premium;