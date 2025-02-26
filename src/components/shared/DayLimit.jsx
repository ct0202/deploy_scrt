import {Button} from "../Button";
import React from "react";

function DayLimit() {
    return (
        <div
            className="w-[100%] h-[400px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white pb-5"
            style={{borderRadius: "32px 32px 0 0 "}}>
            <div className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                .
            </div>
            <img src='/icons/photo_overlay_button_4.svg' className="w-[80px] h-[80px] mt-5"/>
            <h1 className="text-[22px] font-semibold mt-3">Лайки закончились (70/70)</h1>
            <p className="text-[16px] font-normal mt-2">Новые будут доступны через:</p>
            <div className="mt-5 rounded-[8px] bg-[#0B6666] pl-[12px] pr-[12px] pt-[8px] pb-[8px]">23 ч 59 мин</div>
            <Button className="mt-8 text-[#010D0D]">Хочу оценивать без ограничений</Button>
        </div>
    );
}

export default DayLimit;