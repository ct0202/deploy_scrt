import React, {useRef, useState, useEffect} from "react";
import { Button } from "../components/Button";
import background from "../assets/background.svg";
import { useNavigate } from "react-router-dom";
import Policy from "../components/shared/Policy";
import config from "../config";

export default function HomePage() {
  const navigate = useNavigate();
  const [showPolicy, setShowPolicy] = useState(false);
  const [agree, setAgree] = useState(false);

  const status = localStorage.getItem("auth_status");
  

  useEffect(() => {
    if(status === "registering") {
      // Redirect to calculate page if user not found
      // window.location.href = config.ROUTES.CALCULATE;
      return;
    }
    if(status === "authorized") {
      // Redirect to calculate page if user not found
      window.location.href = config.ROUTES.MEET;
      return;
    }
    const checkUser = async () => {
      // if(localStorage.getItem("userId")){
      //   const res = await axios.get(`/getUserInfo/${localStorage.getItem("userId")}`);
      //   if(res.data){
      //     navigate("/menu");
      //   }
      // }
    };
    checkUser();
  }, []);


  

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

        <div className="absolute bottom-4 pointer-events-none">

        <Button onclick={() => navigate("/menu")} disabled={!agree} className="pointer-events-auto">
          Начать
        </Button>

        <div className="flex justify-start items-center gap-[12px] mt-3">
          {agree ?
          <div className='w-[25px] h-[25px] p-0'>
          <img
            className="w-[28px] cursor-pointer pointer-events-auto"
            alt="Checkbox"
            src={"/icons/famicons_checkbox.svg"}
            onClick={() => setAgree(!agree)}
          /></div>:
          <div
              className="w-[25px] h-[25px] cursor-pointer border border-white rounded-[4px] pointer-events-auto"
              alt="Checkbox"
              onClick={() => setAgree(!agree)}
          />
          }
          <div className="w-[309px] h-[42px]">
            <p className="w-[309px] opacity-70 font-raleway font-medium text-sm text-white">
              Нажав кнопку "Начать", я соглашаюсь с{" "}
              <span
                className="underline cursor-pointer pointer-events-auto"
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
            className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
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
