import React from "react";

export const Button = ({ children, className, onClick, disabled, loading }) => {
  return (
    <div
      onClick={disabled ? null : onClick}
      className={`flex w-[343px] ${disabled ? 'opacity-30' : 'opacity-100'} h-16 items-center justify-center gap-2 p-2 relative bg-mint rounded-[400px] ${className}`}
    >
      <div className="relative w-fit font-raleway font-medium text-textbutton text-lg text-center tracking-[0] leading-[27px] whitespace-nowrap">
        {loading ? 'Сохранение...' : children}
      </div>
    </div>
  );
};
