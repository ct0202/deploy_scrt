import React from "react";
import PropTypes from "prop-types";


function ProgressBar({ current, max, onArrowClick }) {
  const progressPercentage = (current / max) * 100;

  return (
    <div className="flex flex-row justify-start items-center">
      {/* Кнопка-стрелка */}
      <button
        onClick={onArrowClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginRight: "16px",
          padding: "0",
        }}
      >
        <img src="/icons/Button-back.svg" className="w-[44px]" alt="" />
      </button>

      {/* Прогресс-бар */}
      <div
        style={{
          position: "relative",
          width: "283px",
          height: "8px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: "100%",
            background: "#a1f69e",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onArrowClick: PropTypes.func.isRequired,
};

export default ProgressBar;
