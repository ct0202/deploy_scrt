import React, { useState, useEffect } from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../context/RegistrationContext";

function Step1({ setStep }) {
  const navigate = useNavigate();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [disabled, setDisabled] = useState(true);

  const genders = [
    { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
    { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" }
  ];

  const targetGenders = [
    { id: "male", label: "Мужчин", emoji: "👱🏻‍♂️" },
    { id: "female", label: "Женщин", emoji: "👱🏻‍♀️" },
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

  useEffect(() => {
    if (
      registrationData.name.trim() &&
      registrationData.gender &&
      registrationData.wantToFind &&
      registrationData.birthDay &&
      registrationData.country &&
      registrationData.city.trim()
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [registrationData]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    updateRegistrationData(name, value);
  };

  return (
    <div className="flex flex-col justify-start items-start w-[343px]">
      <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
        Как вас зовут?
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
        value={registrationData.name}
        onChange={handleChange}
      />
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваш пол
      </h1>
      <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
        {genders.map((gender) => (
          <div
            key={gender.id}
            onClick={() => updateRegistrationData("gender", gender.id)}
            className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
              ${
                registrationData.gender === gender.id
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
            onClick={() => updateRegistrationData("wantToFind", gender.id)}
            className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
              ${
                registrationData.wantToFind === gender.id
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
        name="birthDay"
        placeholder="Выбрать дату"
        value={registrationData.birthDay}
        onChange={handleChange}
        className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 text-white outline-none focus:border-[#a1f69e]"
      />
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваша страна
      </h1>
      <select
        name="country"
        onChange={handleChange}
        value={registrationData.country}
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
        name="city"
        placeholder="Введите название"
        value={registrationData.city}
        onChange={handleChange}
        className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
      />
      <Button
        className={"mt-[37px] mb-[20px]"}
        onclick={() => setStep(2)}
        disabled={disabled}
      >
        Далее
      </Button>
    </div>
  );
}

export default Step1;
