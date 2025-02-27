  import React, { useState } from "react";
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

        <Button onclick={() => navigate("/menu")} className="mt-[200px]">
          Начать
        </Button>
        <div className="mt-[13px] flex justify-start items-center gap-[12px]">
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

      {showPolicy && (
        <div
          className="fixed inset-0  bg-opacity-50 flex justify-center items-end z-20"
          onClick={closePolicy}
        >
          <div
            className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Policy />
          </div>
        </div>
      )}
    </div>
  );
};
