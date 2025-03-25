import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button} from "../components/Button";

function Premium() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState(2);
    const [payment, setPayment] = useState(1);

    const price = choice === 1 ? '4.49' : choice === 2 ? '2.26' : '1.43';


    return (
        <div className='w-full flex items-center justify-center bg-[#010D0D]'>
            <div className='w-full pt-[90px] overflow-scroll flex flex-col items-center justify-start relative'>
                <img src='/icons/premium_people.svg' className='w-full' />
                <img src='/icons/Rectangle%2074.svg' className='absolute w-full' />
                <img src='/icons/Button-close.svg' className='absolute top-[130px] right-[16px]' onClick={() => {navigate(-1)}} />
                <img src='/icons/laurel-wreath_3217720%201.svg' className='absolute top-[190px] right-55%'/>
                <p className='font-raleway text-[40px] font-bold absolute top-[250px] w-full text-center text-white'>MYTA PREMIUM</p>
                <p className='font-raleway text-[16px] font-medium text-white top-[310px] absolute text-center w-[254px]'>C Premium вы найдёте партнёра в два раза быстрее</p>



                <div className='absolute flex flex-row items-center justify-center w-[343px] h-[44px] top-[370px] bg-[#022424] rounded-[400px] font-raleway'>
                    <div onClick={() => {setPayment(1)}} className={` ${payment === 1 ? 'bg-[#043939]' : 'bg-transparent'} w-[167px] h-[33px] rounded-[400px] flex justify-center items-center `}>
                        <span className={`${payment === 1 ? 'text-[#A1F69E]' : 'text-white'} text-[14px]`}>Деньги</span>
                    </div>
                    <div onClick={() => {setPayment(2)}} className={` ${payment === 2 ? 'bg-[#043939]' : 'bg-transparent'} w-[167px] h-[33px] rounded-[400px] flex justify-center items-center`}>
                        <span className={`${payment === 2 ? 'text-[#A1F69E]' : 'text-white'} text-[14px]`}>Telegram звезды</span>
                    </div>
                </div>

                <div className='absolute flex flex-row justify-center gap-[8px] top-[445px] font-raleway'>
                    <div key='1' className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 1 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                        onClick={() => {setChoice(1)}}>
                        <span className={`border-b pt-[10px] pb-[5px] ${choice === 1 ? 'border-[#0F7474]' : 'border-[#233636]'} text-[16px] w-[100px] text-center`}>Неделя</span>
                        <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>{payment === 1 ? '4.49 $' : <div className='flex flex-row items-center justify-center'>220 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                        <span className='text-[14px]'>в неделю</span>
                        <span className='opacity-50 text-[14px]'>{payment === 1 ? '4.49 $' : <div className='flex flex-row items-center justify-center'>220 <img src='/icons/tg_star.png' className='ml-[4px] w-[12px] h-[12px]'/></div>}</span>
                        <div className='flex flex-row justify-center items-center gap-[2px]'>
                            <span className='text-[17.21px] font-raleway'>+1000</span>
                            <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                        </div>
                    </div>

                    <img src='/icons/popular_label.svg' className='absolute bottom-[130px]'/>

                    <div className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 2 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                         onClick={() => {setChoice(2)}}>
                        <span className={`border-b pt-[10px] pb-[5px] ${choice === 2 ? 'border-[#0F7474]' : 'border-[#233636]'} text-[16px] w-[100px] text-center`}>1 месяц</span>
                        <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>{payment === 1 ? '2.26 $' : <div className='flex flex-row items-center justify-center'>110 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                        <span className='text-[14px]'>в неделю</span>
                        <span className='opacity-50 text-[14px]'>{payment === 1 ? '9.99 $' : <div className='flex flex-row items-center justify-center'>487 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                        <div className='flex flex-row justify-center items-center gap-[2px]'>
                            <span className='text-[17.21px] font-raleway'>+5300</span>
                            <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                        </div>
                    </div>
                    <div key='3' className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 3 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                         onClick={() => {setChoice(3)}}>
                        <span className={`border-b pt-[10px] pb-[5px] ${choice === 3 ? 'border-[#0F7474]' : 'border-[#233636]'} text-[16px] w-[100px] text-center`}>3 месяца</span>
                        <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>{payment === 1 ? '1.43 $' : <div className='flex flex-row items-center justify-center'>70 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                        <span className='text-[14px]'>в неделю</span>
                        <span className='opacity-50 text-[14px]'>{payment === 1 ? '18.99 $' : <div className='flex flex-row items-center justify-center'>930 <img src='/icons/tg_star.png' className='ml-[4px] w-[16px] h-[16px]'/></div>}</span>
                        <div className='flex flex-row justify-center items-center gap-[2px]'>
                            <span className='text-[17.21px] font-raleway'>+20000</span>
                            <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                        </div>
                    </div>
                </div>

                {/*<img src='/icons/Group%2048095574.svg' className='absolute top-[560px]'/>*/}

                <div className='w-[343px] mt-[60px]'>
                    <table className='w-full text-center text-white font-raleway border-separate border-spacing-0'>
                        <tr>
                            <th className='w-[50%]'></th>
                            <th className='w-[20%]'>FREE</th>
                            <th className='w-[30%] text-[#A1F69E]'>PREMIUM</th>
                        </tr>
                        <tr className='h-[35px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[35px]'>Монеты MYTA</td>
                            <td className='border-b border-r border-[#233636] h-[35px]'>—</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[35px]'>{choice === 1 ? '1000' : choice === 2 ? '5300' : '20000'} <img
                                src='/icons/myta-coin.svg' className='ml-[7px] w-[20px] h-[20px]'/></td>
                        </tr>
                        <tr className='h-[35px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[35px]'>Лайк анкеты <span
                                className='text-lightGray'>(в день)</span>
                            </td>
                            <td className='border-b border-r border-[#233636] h-[35px]'>70</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[35px]'>∞</td>
                        </tr>
                        <tr className='h-[55px]'>
                            <td className='border-b border-r border-[#233636] text-left'>Узнать кто вас лайкнул</td>
                            <td className='border-b border-r border-[#233636] h-full'>—</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[55px]'>∞</td>
                        </tr>
                        <tr className='h-[35px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[35px]'>Супер-лайк <span
                                className='text-lightGray'>(в день)</span>
                            </td>
                            <td className='border-b border-r border-[#233636] h-[35px]'>1</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[35px]'>5</td>
                        </tr>
                        <tr className='h-[55px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[55px]'>Вернуть анкету<br/><span
                                className='text-lightGray'>(в день)</span>
                            </td>
                            <td className='border-b border-r border-[#233636] h-[55px]'>1</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[55px]'>5</td>
                        </tr>
                        <tr className='h-[55px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[55px]'>Видео-знакомства<br/><span
                                className='text-lightGray'>(в день)</span>
                            </td>
                            <td className='border-b border-r border-[#233636] h-[55px]'>40</td>
                            <td className='border-b border-[#233636] flex flex-row items-center justify-center h-[55px]'>250</td>
                        </tr>
                        <tr className='h-[62px]'>
                            <td className='border-b border-r border-[#233636] h-[62px] text-left'>Лайк в видео-знакомствах<br/><span
                                className='text-lightGray'>(в день)</span>
                            </td>
                            <td className='border-b border-r border-[#233636] h-[62px]'>4</td>
                            <td className='border-b border-[#233636] h-full'>15</td>
                        </tr>
                        <tr className='h-[35px]'>
                            <td className='border-b border-r border-[#233636] text-left h-[35px]'>Реклама</td>
                            <td className='border-b border-r border-[#233636] h-[35px]'>есть</td>
                            <td className='border-b border-[#233636] h-[35px]r'>—</td>
                        </tr>
                        <tr className='h-[35px]'>
                            <td className='border-r border-[#233636] text-left h-[35px]'>Бонус <span>(подарки)</span></td>
                            <td className='border-r border-[#233636] h-[35px]'>—</td>
                            <td className='border-[#233636] flex flex-row items-center justify-center h-[35px]'>4 🎁</td>
                        </tr>
                    </table>
                </div>
                <p className='w-[343px] mt-[20px] text-center font-normal left-1.4 text-[12px] text-white opacity-70 pb-[120px]'>
                    Подписка будет продлеваться автоматически, если она не отменена как минимум за 24 часа до окончания текущего периода. Подписку можно отменить в любой момент
                </p>
                <div className='fixed bottom-[30px]'>
                    <Button>
                        Подписаться за {price} $ в неделю
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Premium;