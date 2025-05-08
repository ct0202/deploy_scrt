import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from '../store/userSlice';
import LocationSelect from '../components/LocationSelect';
import DatePicker from '../components/DatePicker';

function Step1({ setStep }) {
  const dispatch = useDispatch();
  const registrationData = useSelector((state) => state.user.registrationData);
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

  useEffect(() => {
    const isNameValid = registrationData.name?.trim()?.length > 0;
    const isGenderValid = registrationData.gender && ['male', 'female'].includes(registrationData.gender);
    const isWantToFindValid = registrationData.wantToFind && ['male', 'female', 'all'].includes(registrationData.wantToFind);
    const isBirthDayValid = registrationData.birthDay && new Date(registrationData.birthDay) < new Date();
    const isCountryValid = registrationData.country?.trim()?.length > 0;
    const isCityValid = registrationData.city?.trim()?.length > 0;
    const isCoordinatesValid = registrationData.coordinates?.latitude && registrationData.coordinates?.longitude;

    setDisabled(!(
      isNameValid &&
      isGenderValid &&
      isWantToFindValid &&
      isBirthDayValid &&
      isCountryValid &&
      isCityValid
    ));
  }, [registrationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value.length > 20) return;
    dispatch(updateRegistrationData({ [name]: value }));
  };

  const handleLocationSelect = (locationData) => {
    dispatch(updateRegistrationData({
      country: locationData.country,
      city: locationData.city,
      coordinates: locationData.coordinates
    }));
  };

  const handleDateChange = (date) => {
    dispatch(updateRegistrationData({ birthDay: date }));
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
        maxLength={20}
        className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
        value={registrationData.name || ''}
        onChange={handleChange}
      />
      <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
        Ваш пол
      </h1>
      <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
        {genders.map((gender) => (
          <div
            key={gender.id}
            onClick={() => dispatch(updateRegistrationData({ gender: gender.id }))}
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
            onClick={() => dispatch(updateRegistrationData({ wantToFind: gender.id }))}
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
      <div className="w-[343px] h-[64px] flex justify-center items-center rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]">
        <DatePicker 
          value={registrationData.birthDay} 
          onChange={handleDateChange}
      />
      </div>

      <LocationSelect onLocationSelect={handleLocationSelect} />

      <Button
        className={"mt-[37px] mb-[20px]"}
        onClick={() => setStep(2)}
        disabled={disabled}
      >
        Далее
      </Button>
    </div>
  );
}

export default Step1;
