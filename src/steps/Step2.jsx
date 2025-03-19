import React, { useState } from "react";
import { Button } from "../components/Button";

function Step2({ setStep }) {
  console.log("step2");

  return (
    <div className="flex flex-col items-center w-[343px] h-screen overflow-y-auto overflow-x-hidden">
      <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
        Добавьте фото
      </h1>
      <h1 className="font-raleway font-light mt-2 text-white text-[16px]">
        Минимум одно, а лучше – все четыре
      </h1>
      <div className={`w-[343px] h-[343px] mt-5 grid grid-cols-2 gap-[15px]`}>
        <div
          id="photo1"
          className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex items-center justify-center cursor-pointer`}
        >
          <img
            src="/icons/main_photo_label.svg"
            className="absolute top-0 left-0"
          />
          <img src="/icons/camera.svg" />
        </div>
        <div
          id="photo2"
          className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex justify-center items-center cursor-pointer`}
        >
            <span
                className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium"
            >
                +25 <img src="/icons/myta-coin.svg" alt="" className="inline w-[16px]"/>
            </span>
          <img src="/icons/camera.svg" />
        </div>
        <div
          id="photo3"
          className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex justify-center items-center cursor-pointer`}
        >
            <span
                className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium"
            >
                +25 <img src="/icons/myta-coin.svg" alt="" className="inline w-[16px]"/>
            </span>
          <img src="/icons/camera.svg" />
        </div>
        <div
          id="photo4"
          className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex justify-center items-center cursor-pointer`}
        >
            <span
                className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium"
            >
                +25 <img src="/icons/myta-coin.svg" alt="" className="inline w-[16px]"/>
            </span>
          <img src="/icons/camera.svg" />
        </div>
      </div>
      <h1 className="font-raleway font-light mt-[15px] text-white text-[16px]">
        Перетащите, чтобы изменить порядок
      </h1>
        <div className="fixed bottom-[20px]">
          <Button onclick={() => setStep(3)}>
            Далее
          </Button>
        </div>
    </div>
  );
}

export default Step2;
