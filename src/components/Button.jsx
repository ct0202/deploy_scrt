import React from "react";

export const Button = ({ children, className, onclick, disabled }) => {
  return (
    <div
      onClick={disabled ? null : onclick}
      className={`flex w-[343px] ${disabled ? 'opacity-30' : 'opacity-100'} h-16 items-center justify-center gap-2 p-2 relative bg-mint rounded-[400px] ${className}`}
    >
      <div className="relative w-fit font-raleway font-medium text-textbutton text-lg text-center tracking-[0] leading-[27px] whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};
