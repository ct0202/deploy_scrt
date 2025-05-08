import React, { useState, useEffect } from 'react';
import ProgressBar from '../components/shared/ProgressBar';
import Step1 from '../steps/Step1';
import Step2 from '../steps/Step2';
import Step3 from '../steps/Step3';
import Step4 from '../steps/Step4';
import Step5 from '../steps/Step5';
import { useRegistration } from '../context/RegistrationContext';
import axios from '../axios'
import { useNavigate, useParams } from 'react-router-dom';

function CalculatePage() {
  const [step, setStep] = useState(3);
  const { registrationData, setRegistrationData } = useRegistration();

  const navigate = useNavigate();
  // console.log('registrationData from calculate page', registrationData);

  return (
    <div className={`flex flex-col justify-center items-center w-[100%] ${step === 1 ? 'pt-[300px]' : ''} h-screen overflow-y-auto overflow-x-hidden`}>
      <div className={`flex flex-col justify-start items-center w-[343px] mt-[90px]`} >
        <ProgressBar
          current={step} 
          max={6} 
          onArrowClick={step >= 2 ? () => setStep((prev) => prev - 1) : () => {navigate(-1)}}
        />
      </div>

      {/* Шаги */}
      {step === 1 && <Step1 setStep={setStep}/>}
      {step === 2 && <Step2 setStep={setStep}/>}
      {step === 3 && <Step3 setStep={setStep}/>}
      {step === 4 && <Step4 setStep={setStep}/>}
      {step === 5 && <Step5 setStep={setStep}/>}
    </div>
  );
}

export default CalculatePage;
