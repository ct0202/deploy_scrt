import React, {useRef, useState} from "react";
import { Button } from "../components/Button";
import background from "../assets/background.svg";
import { useNavigate } from "react-router-dom";
import Policy from "../components/shared/Policy";

export const HomePage = () => {
  const navigate = useNavigate();
  const [showPolicy, setShowPolicy] = useState(false);

  const handlePolicyClick = () => {
    setShowPolicy(true);
  };

  const closePolicy = () => {
    setShowPolicy(false);
  };

  const [swipeStart, setSwipeStart] = useState(0);
  const policyRef = useRef(null);

  const handleTouchStart = (e) => {
    setSwipeStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const swipeEnd = e.touches[0].clientY;
    const diff = swipeEnd - swipeStart;

    // Если свайпнули вниз на 100px — закрываем
    if (diff > 100) {
      closePolicy();
    }
  };



  return (
    <div className="relative w-[100%] h-[100%] overflow-x-hidden overflow-y-hidden">
      <img src={background} alt="" className="absolute w-[100vw] z-0" />

      <div className="z-20 flex flex-col justify-center items-center w-[100%] mt-[227px]">
        <img src="/logo1.svg" alt="" className="z-20" />
        <div className="z-20 w-[343px] mt-[30px] font-medium text-textmain text-[28px] text-center font-raleway text-white">
          Счастье пахнет мятой
        </div>

        <p className="z-20 text-white w-[343px] mt-[15px] font-raleway font-normal text-lg text-center">
          Расскажи о себе – это поможет создать профиль и сразу начать общаться
        </p>

        <div className="absolute bottom-2">

        <Button onclick={() => navigate("/menu")} >
          Начать
        </Button>

        <div className="flex justify-start items-center gap-[12px] mt-3">
          <img
            className="w-[24px] cursor-pointer"
            alt="Checkbox"
            src={"/icons/famicons_checkbox.svg"}
          />
          <div className="w-[309px] h-[42px]">
            <p className="w-[309px] opacity-70 font-raleway font-medium text-sm text-white">
              Нажав кнопку “Начать”, я соглашаюсь с{" "}
              <span
                className="underline cursor-pointer"
                onClick={handlePolicyClick}
              >
                Политикой конфиденциальности
              </span>
            </p>
          </div>
        </div>

        </div>

      </div>


      {showPolicy && (
        <div
          className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20"
          onClick={closePolicy}
        >
          <div
            className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            ref={policyRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <Policy />
          </div>
        </div>
      )}
    </div>
  );
};
