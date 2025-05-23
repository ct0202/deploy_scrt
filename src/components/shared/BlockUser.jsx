import React, {useState} from "react";
import {Button} from "../Button";

function BlockUser() {
    const [openReport, setOpenReport] = useState(false);
    return (
        <div
            className="w-[100%] h-[580px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white"
            style={{borderRadius: "32px 32px 0 0 "}}>
            <div className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                .
            </div>


            {!openReport ?
                <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                    <img src='/icons/Layer_1.svg' alt="Заблокировать пользователя" className='w-[80px] h-[80px]'/>
                    <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Вы действительно хотите заблокировать данного пользователя?</p>
                    <p className='text-center text-[16px] mt-[20px] font-normal pl-2 pr-2'>Заблокированный пользователь больше не сможет видеть ваш профиль и общаться с вами через наше приложение. Мы скроем профиль, чат и уведомления от этого пользователя</p>
                    <div className='text-black mt-[40px]'>
                        <Button onclick={() => setOpenReport(!openReport)}>
                            Заблокировать
                        </Button>
                    </div>
                    <div className='text-[#FFFFFF] opacity-50 mt-[20px]' onClick={() => {setOpenReport(false)}}>Отмена</div>
                </div>
                :
                <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                    <img src='/icons/blocked_success.svg' alt="Пользователь заблокирован" className='w-[80px] h-[80px]'/>
                    <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Пользователь был успешно заблокирован! Больше вас не побеспокоят</p>
                </div>
            }
        </div>
    );
}

export default BlockUser;