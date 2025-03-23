import React, {useState} from "react";
import {Button} from "../Button";

function ReportMenu() {
    const [openReport, setOpenReport] = useState(false);
    return (
        <div
            className="w-[100%] h-[580px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white"
            style={{borderRadius: "32px 32px 0 0 "}}>
            <div className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                .
            </div>


            {!openReport ?
                <>
            <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                <p className="font-semibold text-[22px]">Пожаловаться</p>
                <p className="font-normal text-[16px]">Это останется между нами</p>
            </div>

            <div className='w-full pr-[16px] pl-[16px]'>
                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                 onClick={() => setOpenReport(!openReport)}>
                    <span>Фейк</span>
                </div>
                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                onClick={() => setOpenReport(!openReport)}>
                    <span>Неприемлемый контент</span>
                </div>
                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                onClick={() => setOpenReport(!openReport)}>
                    <span>Возраст</span>
                </div>
                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                onClick={() => setOpenReport(!openReport)}>
                    <span>Поведение вне MYTA</span>
                </div>
                <div className='h-[60px] flex items-center'
                onClick={() => setOpenReport(!openReport)}>
                    <span>Мошенничество или спам</span>
                </div>
            </div>
                </>
                :
            <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                <img src='/icons/Layer_1.svg' className='w-[80px] h-[80px]'/>
                <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Вы действительно хотите заблокировать данного пользователя?</p>
                <p className='text-center text-[16px] mt-[20px] font-normal pl-2 pr-2'>Заблокированный пользователь больше не сможет видеть ваш профиль и общаться с вами через наше приложение. Мы скроем профиль, чат и уведомления от этого пользователя</p>
                <div className='text-black mt-[40px]'>
                    <Button onclick={() => setOpenReport(!openReport)}>
                        Заблокировать
                    </Button>
                </div>
                {/*<div className='text-[#FFFFFF] opacity-50 mt-[20px]' onClick={() => {setReportMenu(false)}}>Отмена</div>*/}
            </div>
            }
        </div>
    );
}

export default ReportMenu;