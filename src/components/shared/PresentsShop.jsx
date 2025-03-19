import React, {useState} from "react";

function PresentsShop({page}) {
    const [option, setOption] = useState(1);
    const [selectedPresent, setSelectedPresent] = useState(-1);

    const [presents, setPresents] = useState([
        {id: 1, name: 'Молочный шоколад', price: '3', bonus: '60'},
        {id: 2, name: 'Вишня', price: '3', bonus: '60'},
        {id: 3, name: 'Банан в шоколаде', price: '3', bonus: '60'},
        {id: 4, name: 'Ты пахнешь как любовь', price: '3', bonus: '60'},
        {id: 5, name: 'Расстояние любви не помеха', price: '6', bonus: '120'},
        {id: 6, name: 'Ключик к сердцу', price: '6', bonus: '120'},
        {id: 7, name: 'Это мэтч', price: '6', bonus: '120'},
        {id: 8, name: 'Пишу с любовью', price: '12', bonus: '240'},
        {id: 9, name: 'Сладкий персик', price: '12', bonus: '240'},
        {id: 10, name: 'Может выпьем?', price: '12', bonus: '240'},
        {id: 11, name: 'Шикарный букет', price: '24', bonus: '360'},
        {id: 12, name: 'Безграничная любовь', price: '24', bonus: '360'}
    ]);


    return (
        <div
            className="w-[100%] h-[680px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white"
            style={{borderRadius: "32px 32px 0 0 "}}>
            <div className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                .
            </div>
            <h1 className="text-[18px] font-semibold ml-1 mr-1 mt-3 text-center font-raleway">{page !== "stream" ? 'Напишите тому, кто вам понравился, не дожидаясь симпатии, за подарок 🎁 Возможно, это ваша судьба ❤' : 'Обозначь себя, сделав человеку приятно. Это шаг к новым знакомствам!'}</h1>
            <div className="mt-4 rounded-[400px] flex flex-row bg-[#FFFFFF1A] h-[44px] w-[343px] justify-center items-center">
                <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway flex justify-center items-center cursor-pointer rounded-[400px] ${option === 1 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"} `} onClick={() => setOption(1)}>
                    Магазин подарков
                </div>
                <div className={`w-[167px] h-[33px] pt-1 pb-1 font-raleway flex justify-center items-center rounded-[400px] cursor-pointer ${option === 2 ? "bg-[#FFFFFF1A] text-[#A1F69E]" : "bg-transparent"}`} onClick={() => setOption(2)}>
                    Купленные подарки
                </div>
            </div>
            {option === 1 ?
                <div className="mt-6 flex justify-center items-center">
                    <div className="w-full grid gap-1.5 grid-cols-3">

                        {
                            presents.map((present, index) => (
                                <div className={`relative w-[109px] h-[109px]`} onClick={() => {setSelectedPresent(index)}}>
                                    <div>
                                        <div
                                            className="absolute right-0 top-0 mr-1 mt-1 text-[11px] font-raleway flex flex-row items-center">+{present.bonus}
                                            <img src="/icons/myta-coin.svg" className="w-[11px] h-[11px]"/></div>
                                    </div>
                                    <div
                                        className={`flex justify-center items-center flex-col w-[109px] h-[109px] rounded-[13.42px] bg-[#FFFFFF1A]`}>
                                        <img src={`/icons/presents/${present.id}.svg`} className="w-[50px] h-[50px]"
                                             alt="present-icon"/>
                                        <p className={`font-raleway text-[11px] font-normal text-center ml-1 mr-1`}>{present.name}</p>
                                        <div
                                            className="absolute bottom-0 mb-0.2 text-[11px] flex flex-row items-center">
                                            <img src="/icons/coin.svg"
                                                 className="w-[11px] h-[11px] mr-0.5"/>{present.price}
                                        </div>
                                    </div>
                                    { selectedPresent === index ?
                                    <div className='absolute w-[109px] bottom-0 h-[29px] flex justify-center items-center bg-[#A1F69E] rounded-bl-[13.42px] rounded-br-[13.42px]'>
                                        <span className='text-black text-center text-[12px]'>Отправить</span>
                                    </div>
                                        : null
                                    }
                                </div>
                            ))
                        }

                    </div>
                </div>

                :

                <div className="mt-6 flex justify-center items-center">
                    <div className="w-full grid gap-1.5 grid-cols-3">

                        {
                            presents.map((present) => (
                                <div className={`relative w-[109px] h-[109px]`}>
                                    <div>
                                        <div
                                            className="absolute right-0 top-0 mr-1 mt-1 text-[11px] font-raleway flex flex-row items-center">+{present.bonus}
                                            <img src="/icons/myta-coin.svg" className="w-[11px] h-[11px]"/></div>
                                    </div>
                                    <div
                                        className={`flex justify-center items-center flex-col w-[109px] h-[109px] rounded-[13.42px] bg-[#FFFFFF1A]`}>
                                        <img src={`/icons/presents/${present.id}.svg`} className="w-[50px] h-[50px]"
                                             alt="present-icon"/>
                                        <p className={`font-raleway text-[11px] font-normal text-center ml-1 mr-1`}>{present.name}</p>
                                        <div
                                            className="absolute bottom-0 mb-0.2 text-[11px] flex flex-row items-center">
                                            <img src="/icons/coin.svg"
                                                 className="w-[11px] h-[11px] mr-0.5"/>{present.price}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            }
            <div className="bg-[#010D0D] w-[100%] h-[44px] font-raleway flex flex-row justify-between p-1.5">
                <div className=" flex flex-row justify-center items-center ">
                    <p className="text-[#FFFFFF] text-[18px] ml-1 flex flex-row">Счет: <span
                        className="text-[white] ml-1">100</span></p><img src="/icons/coin.svg"
                                                                         className="w-[20px] h-[20px] ml-1"/>
                </div>
                <div className="text-[#A1F69E] text-[18px]">
                    Пополнить счет
                </div>
            </div>
        </div>
    );
}

export default PresentsShop;