import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button} from "../components/Button";

function Premium() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState(2);

    const price = choice === 1 ? '4.49' : choice === 2 ? '2.26' : '1.43';


    return (
        <div className='w-full pt-[90px] h-[12000px] bg-[#010D0D] overflow-scroll flex flex-col items-center justify-start relative'>
            <img src='/icons/premium_people.svg' />
            <img src='/icons/Rectangle%2074.svg' className='absolute' />
            <img src='/icons/Button-close.svg' className='absolute top-[130px] right-[16px]' onClick={() => {navigate(-1)}} />
            <img src='/icons/laurel-wreath_3217720%201.svg' className='absolute top-[190px] right-[150px]'/>
            <p className='font-raleway text-[40px] font-bold absolute top-[250px] text-white'>MYTA PREMIUM</p>
            <p className='font-raleway text-[16px] font-medium text-white top-[310px] absolute text-center w-[254px]'>C Premium вы найдёте партнёра в два раза быстрее</p>


            <div className='absolute flex flex-row justify-center gap-[8px] top-[400px]'>
                <div key='1' className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 1 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                    onClick={() => {setChoice(1)}}>
                    <span className='border-b pt-[10px] pb-[5px] border-[#233636] text-[16px] w-[100px] text-center'>Неделя</span>
                    <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>4.49 $</span>
                    <span className='text-[14px]'>в неделю</span>
                    <span className='opacity-50 text-[14px]'>4.49 $</span>
                    <div className='flex flex-row justify-center items-center gap-[2px]'>
                        <span className='text-[17.21px] font-raleway'>+1000</span>
                        <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                    </div>
                </div>

                <img src='/icons/popular_label.svg' className='absolute bottom-[130px]'/>

                <div className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 2 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                     onClick={() => {setChoice(2)}}>
                    <span className='border-b pt-[10px] pb-[5px] border-[#233636] text-[16px] w-[100px] text-center'>1 месяц</span>
                    <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>2.26 $</span>
                    <span className='text-[14px]'>в неделю</span>
                    <span className='opacity-50 text-[14px]'>9.99 $</span>
                    <div className='flex flex-row justify-center items-center gap-[2px]'>
                        <span className='text-[17.21px] font-raleway'>+5300</span>
                        <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                    </div>
                </div>
                <div key='3' className={`flex flex-col items-center justify-start w-[109px] h-[142px] text-white border ${choice === 3 ? 'border-[#A1F69E] bg-[#043939]' : 'border-[#233636] bg-[#022424]'}  rounded-[16px]`}
                     onClick={() => {setChoice(3)}}>
                    <span className='border-b pt-[10px] pb-[5px] border-[#233636] text-[16px] w-[100px] text-center'>3 месяца</span>
                    <span className='text-[22px] font-semibold mt-[10px] leading-[15px] mb-[4px]'>1.43 $</span>
                    <span className='text-[14px]'>в неделю</span>
                    <span className='opacity-50 text-[14px]'>18.99 $</span>
                    <div className='flex flex-row justify-center items-center gap-[2px]'>
                        <span className='text-[17.21px] font-raleway'>+20000</span>
                        <img src='/icons/myta-coin.svg' className='w-[16.9px] h-[16.9px]'/>
                    </div>
                </div>
            </div>

            <img src='/icons/Group%2048095574.svg' className='absolute top-[560px]'/>
            <span className='absolute top-[1066px] right-[37px] bg-[#010D0D]'>🎁</span>
            <div className='absolute top-[1120px] pb-[100px] w-full flex items-center justify-center'>
                <img src='/icons/Text.svg' />
            </div>
            <div className='fixed bottom-[30px]'>
                <Button>
                    Подписаться за {price} $ в неделю
                </Button>
            </div>
        </div>
    );
}

export default Premium;