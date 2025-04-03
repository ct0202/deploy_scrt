import {useNavigate} from "react-router-dom";
import React from "react";
import {Button} from "../../components/Button";

function DeleteProfile() {
    const navigate = useNavigate();

    return (
        <div className='w-[100vw] h-[100%] flex flex-col items-center justify-start font-raleway overflow-scroll'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full
            border-b border-[#233636] relative pb-[10px] pt-[90px]'>
                <img alt="Назад" src='/icons/Button-back.svg' onClick={() => {navigate(-1)}} className='absolute top-[105px] left-[16px] w-[44px] h-[44px]'/>
                <p className='mt-5'>Удаление аккаунта</p>
            </div>
            <div className='w-[343px] text-[20px] text-white'>
                <p className='pt-[10px] pb-[15px]'>Удаление аккаунта приведёт к безвозвратной потере ваших данных в этом приложении.</p>
                <p>Возможно, что-то вас огорчило, но нет неразрешимых проблем. Напишите, пожалуйста, что вас расстроило, и мы приложим все усилия, чтобы вам помочь в кратчайшие сроки!</p>
                <textarea className='w-full bg-[#022424] rounded-[8px] border border-[#233636] text-[18px] pl-[10px] pt-[7px] h-[240px] mt-[10px]' placeholder="Опишите сложившуюся ситуацию"/>
            </div>

            <div className='text-black pt-[50px] pb-[30px] flex flex-col items-center justify-center'>
                    <Button>
                        Отправить
                    </Button>
                    <p className='text-[18px] text-white opacity-50 pt-[15px]' onClick={()=>{navigate('/confirmdeleteprofile')}}>Всё равно хочу удалить</p>
            </div>
        </div>
    );
}

export default DeleteProfile;