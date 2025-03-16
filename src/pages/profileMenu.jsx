import {useNavigate} from "react-router-dom";

function ProfileMenu() {
    const navigate = useNavigate();
    return (
        <div className='w-[100vw] flex flex-col items-center justify-center font-raleway mt-[30px]'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full h-[120px]
            border-b border-[#233636]'>
                <img src='/icons/Button-close.svg' onClick={() => {navigate(-1)}} className='absolute top-[45px] left-[16px] w-[44px] h-[44px]'/>
                <p className='mt-5'>Меню</p>
            </div>
            <img src='/icons/premium-connect-banner.svg' className='w-[343px] mt-[20px]'/>
            <div className='flex flex-row text-white w-full ml-[48px] mt-[30px]'>
                <img src='/mock/user_5/user_5_avatar_2.svg' className='w-[64px] h-[64px] mr-[20px]'/>
                <div className='flex flex-col'>
                    <p className='text-[18px] font-medium'>Андрей, 35 лет</p>
                    <div className='flex flex-row mt-[10px] gap-[30px]'>
                        <div className='flex flex-col '>
                            <p className='opacity-50'>Монеты:</p>
                            <div className='flex flex-row'><img src='/icons/coin.svg' className='mr-[4px]'/> 100</div>
                        </div>
                        <div className='flex flex-col '>
                            <p className='opacity-50'>Монеты MYTA:</p>
                            <div className='flex flex-row'><img src='/icons/myta-coin.svg' className='mr-[4px]'/> 20</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='bg-[#A1F69E1A] h-[44px] rounded-[400px] w-[343px] text-[#A1F69E] text-[18px] flex flex-row items-center justify-center mt-[20px]'>
                        Пополнить баланс <img src='/icons/coin.svg' className='ml-2 w-[20px] h-[20px]'/>
                </div>
            </div>
            <div className='flex flex-col justify-start w-full ml-[25px] mt-[20px] text-white gap-[15px]'>
                <div className='flex flex-row items-center w-full'>
                    <img src='/icons/profile_edit.svg' className='w-[32px] h-[32px] mr-[20px]'/>
                    Мой профиль
                </div>
                <div className='flex flex-row items-center w-full'>
                    <img src='/icons/profile_presents_shop.svg' className='w-[32px] h-[32px] mr-[20px]'/>
                    Магазин подарков
                </div>
                <div className='flex flex-row items-center w-full'>
                    <img src='/icons/profile_share.svg' className='w-[32px] h-[32px] mr-[20px]'/>
                    Пригласить друга
                </div>
                <div className='flex flex-row items-center w-full'>
                    <img src='/icons/support.svg' className='w-[32px] h-[32px] mr-[20px]'/>
                    Техническая поддержка
                </div>
            </div>
            <div className='absolute bottom-[30px] left-[20px] flex flex-col gap-[15px] text-white opacity-70'>
                <p>Политика конфиденциальности</p>
                <p>Удалить аккаунт</p>
            </div>
        </div>
    );
}

export default ProfileMenu;