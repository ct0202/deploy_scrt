import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col justify-start items-center w-[100%] h-[100%]">
      <div className="flex flex-col w-full h-full overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;
