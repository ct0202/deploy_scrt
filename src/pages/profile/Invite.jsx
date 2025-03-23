import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {Button} from "../../components/Button";

function ProfileMenu() {
    const navigate = useNavigate();

    const textToCopy = "https://invite.fake123/cominvite/fake123.com";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Убираем уведомление через 2 сек
            })
            .catch(err => console.error("Ошибка копирования: ", err));
    };

    return (
        <div className='w-[100vw] h-[100%] flex flex-col items-center justify-center font-raleway overflow-scroll pt-[90px]'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full pb-[26px] pt-[26px] mt-[140px]
            border-b border-[#233636]'>
                <div className="w-[343px] flex justify-center items-center relative">
                    <img src='/icons/Button-back.svg' onClick={() => {
                        navigate(-1)
                    }} className='absolute left-0 w-[44px] h-[44px]'/>
                    <p className=''>Пригласить</p>
                </div>
            </div>
            <img src='/icons/invite_info_block.svg' className='mt-[10px]'/>
            <img src='/icons/invite-info-block-2.svg' className='mt-[10px]'/>
            <div className='mb-[120px]'>
                <div
                    className='w-[343px] border border-[#233636] p-[15px] text-white rounded-[24px] h-[138px] flex flex-col mt-[10px]'>
                    <p className='w-full text-center text-[20px] font-semibold'>Ссылка приглашение</p>
                    <div className='flex flex-row w-full mt-[15px]'>
                        <p className='w-[260px] text-[16px] text-left'>https://invite.fake123/cominvite/<br/>fake123.com</p>
                    <img src='/icons/Button-copy.svg' onClick={handleCopy}/>
                </div>
            </div>
            {copied && <div className='w-[343px] h-[48px] mt-[10px] pt-1 pb-1 bg-[#043939] flex items-center justify-start pl-3 rounded-[8px]'>
                <img src='/icons/success-copy.svg' className='w-[24px] h-[24px]'/>
                <p className='text-white ml-1 text-[16px]'>Ссылка скопирована</p>
            </div>}
            </div>
            <div className='text-black fixed bottom-[20px]'>
                <Button onclick={ () => {
                    if (navigator.share) {
                        navigator
                            .share({
                                title: "Пригласить друга",
                                text: "Пригласить друга",
                                url: window.location.href,
                            })
                            .then(() => console.log("Успешно поделились"))
                            .catch((error) => console.log("Ошибка при отправке:", error));
                    } else {
                        alert("Ваш браузер не поддерживает данную функцию");
                    }
                }}>
                    Отправить
                </Button>
            </div>
        </div>
    );
}

export default ProfileMenu;