import React, { useState } from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";

function Step1({ setStep }) {
  console.log("step1");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedTargetGender, setSelectedTargetGender] = useState(null);
  const navigate = useNavigate();


  const genders = [
    { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
    { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" }
  ];

  const targetGenders = [
      { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
      { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" },
      { id: "all", label: "Всех", emoji: "💕" },
  ];

    const countries = [
        "Россия",
        "США",
        "Канада",
        "Германия",
        "Франция",
        "Великобритания",
        "Япония",
        "Китай"
    ];

  return (
      <div className="flex flex-col justify-start items-start w-[343px]">
          <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
              Как вас зовут?
          </h1>
          <input
              type="text"
              placeholder="Ваше имя"
              className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
          />
          <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
              Ваш пол
          </h1>
          <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
              {genders.map((gender) => (
                  <div
                      key={gender.id}
                      onClick={() => setSelectedGender(gender.id)}
                      className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
            ${
                          selectedGender === gender.id
                              ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                              : "bg-[#022424] border border-transparent"
                      }`}
                  >
                      <span className="text-[24px]">{gender.emoji}</span>
                      <span>{gender.label}</span>
                  </div>
              ))}
          </div>
          <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
              Кого вам показывать?
          </h1>
          <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
              {targetGenders.map((gender) => (
                  <div
                      key={gender.id}
                      onClick={() => setSelectedTargetGender(gender.id)}
                      className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
            ${
                          selectedTargetGender === gender.id
                              ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                              : "bg-[#022424] border border-transparent"
                      }`}
                  >
                      <span className="text-[24px]">{gender.emoji}</span>
                      <span>{gender.label}</span>
                  </div>
              ))}
          </div>
          <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
              Ваша дата рождения?
          </h1>
          <input
              type="date"
              placeholder="Выбрать дату"
              className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 text-white outline-none focus:border-[#a1f69e]"
          />
          <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
              Ваша страна
          </h1>
          <select
              id="countrySelect"
              className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
          >
              <option value="" disabled>— выберите страну —</option>
              {countries.map((country, index) => (
                  <option key={index} value={country}>
                      {country}
                  </option>
              ))}
          </select>
          <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
              Населенный пункт (город, деревня)
          </h1>
          <input
              type="text"
              placeholder="Введите название"
              className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
          />
          <Button
              className={"mt-[37px] mb-6"}
              onclick={() => setStep(2)}
          >
              Далее
          </Button>
      </div>
  );
}

export default Step1;
