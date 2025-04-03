import React, {useRef, useState, useEffect} from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

function MytaIdea() {
    const navigate = useNavigate();
    const [tonInput, setTonInput] = useState(false);
    const [tonString, setTonString] = useState("");
    const [tonStringCorrect, setTonStringCorrect] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const handleFocus = () => {
            setTimeout(() => {
                inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        };

        const input = inputRef.current;
        input?.addEventListener("focus", handleFocus);

        return () => input?.removeEventListener("focus", handleFocus);
    }, []);

    const handleTonString = (e) => {
        setTonString(e.target.value);
        if (e.target.value.length > 1) {
            setTonStringCorrect(true);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-[100%] h-[auto] mt-[90px] relative">
            <div
                className="w-[100%] h-[81px] flex justify-center items-center"
                style={{ borderBottom: "1px solid #233636" }}
                onClick={()=>{navigate(-1)}}
            >
                <img
                    src="/icons/Button-back.svg"
                    alt=""
                    className="w-[44px] absolute top-[20px] left-[16px]"
                />
                <img src="/logo1.svg" className="w-[134px] my-[19px]" alt="" />
            </div>

            <p className="font-raleway font-bold w-[100%] text-[24px] text-[#a1f69e] mt-2 text-center">
                О нашем приложении
            </p>
            <div className="w-[343px] h-[100%] flex flex-col justify-start items-start">
                <div className="flex justify-start items-center gap-[6px] mt-[17px]">
                    <img src="/icons/myta-coin2.svg" className="w-[20px]" alt="" />
                    <h1 className="font-raleway font-bold text-[24px] text-white">
                        MYTA COIN
                    </h1>
                </div>
                <p className="font-raleway text-[16px] text-white">
                    Добро пожаловать в MYTA Dating! Совмещай знакомства и заработок
                    криптовалюты.
                </p>
                <div className="flex justify-start items-start flex-wrap font-raleway text-[16px] text-white mt-4">
                    <img src="/icons/myta-coin2.svg" alt="" />
                    <span className="font-bold ml-2 whitespace-nowrap">
            Монета MYTA (MYTA COIN) —{" "}
          </span>
                    это криптомонета, которой можно расплачиваться в заведениях наших
                    партнёров (кафе, барах, ресторанах и пр.).
                    <br />
                    <br />
                    Выход монеты планируется на криптобирже, о которой вы узнаете позже.
                </div>
                <div className="flex justify-start items-start flex-wrap font-raleway text-[16px] text-white mt-4">
                    <p><img src="/icons/myta-coin.svg" alt="" className="inline"/><span
                        className="font-bold ml-2 whitespace-nowrap inline">
            Очки активности —{" "}
          </span>
                        пользователи получают очки активности участвуя в жизни приложения,
                        начиная с регистрации и приглашения друзей до обмена сообщениями.</p>
                </div>
                <div className="flex justify-start items-start flex-wrap font-raleway text-[16px] text-white mt-1">
                    <p>
                        <img src="/icons/myta-coin.svg" alt="" className="inline"/>
                        <span className="font-bold ml-2 whitespace-nowrap">
            Очки активности </span>
                        можно будет конвертировать в{" "}
                        <img src="/icons/myta-coin2.svg" alt="" className="inline"/>
                        <span className="font-bold ml-2  text-[16px]">MYTA COIN</span>
                        {"  "}после официального выхода.
                    </p>
                </div>

                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-4">
          <span className="font-bold whitespace-nowrap">
            За что начисляются
          </span>
                    <img src="/icons/myta-coin.svg" className="mx-1" alt="" />
                    <span className="font-bold whitespace-nowrap">очки активности:</span>
                </div>

                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-1">
                    <p>1) Регистрация аккаунта</p>
                    <span className="font-bold whitespace-nowrap ml-1">+100</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>2) Приглашение друзей</p>
                    <span className="font-bold whitespace-nowrap ml-1">+350</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>3) Взаимная симпатия</p>
                    <span className="font-bold whitespace-nowrap ml-1">+25</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex flex-col justify-start items-start font-raleway text-[16px] text-white mt-[2px]">
                    <span>4) 4 фотографии в профиле (за</span>
                    <div className="flex flex-row">
                        <span className="whitespace-nowrap ml-1">каждую фотографию <span className="font-bold">+25</span></span>
                        <img src="/icons/myta-coin.svg" className="w-[20px] h-[20px] ml-1" alt="" />)
                    </div>
                </div>

                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>5) Добавление аудио визитки</p>
                    <span className="font-bold whitespace-nowrap ml-1">+50</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center  flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    6) Первое сообщение после взаимной симпатии
                    <span className="font-bold ml-1">+20</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>7) Покупка подарков</p>
                    <span className="font-bold whitespace-nowrap ml-1">+20</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                    <span className="font-bold whitespace-nowrap ml-1">за 1</span>
                    <img src="/icons/coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>8) Покупка MYTA Premium до</p>
                    <span className="font-bold whitespace-nowrap ml-1">+20000</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
                <div className="flex justify-start items-center flex-wrap font-raleway text-[16px] text-white mt-[2px]">
                    <p>
                        9) Просмотр трансляций в течении 15 минут (ежедневное
                        вознаграждение)
                    </p>
                    <span className="font-bold whitespace-nowrap ml-1">+60</span>
                    <img src="/icons/myta-coin.svg" className="mx-2" alt="" />
                </div>
            </div>
            {
                tonInput && (
                    <div className='relative'>
                        <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                            Ваш TON кошелек:
                        </h1>
                        <input
                            ref={inputRef}
                            type="text"
                            name="ton"
                            value={tonString}
                            onChange={handleTonString}
                            className="w-[343px] h-[64px] rounded-[8px] bg-[#053939] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
                        />
                        { tonStringCorrect ? (
                        <img alt="Успешно" className='absolute w-[24px] h-[24px] top-[95px] right-[10px]' src='/icons/input-success.svg' />
                            ) : null}
                    </div>
                )
            }
            <div className='h-[64px] mb-[60px] mt-[20px]'>
                <Button
                    onclick={() => setTonInput(true)}
                >
                    Привязать TON кошелёк
                </Button>
            </div>

        </div>
    );
}

export default MytaIdea;
