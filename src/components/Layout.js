import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#03141c] to-[#1d3743] text-white">
      <div className="relative h-full w-full z-0">
        <div className="flex flex-col h-full w-full z-50 px-5">{children}</div>
        <h1 className="absolute top-3 left-1/2 -translate-x-1/2 font-bold text-[40px] text-[#B3D8B9] text-center">
          KING OF DIAMONDS
        </h1>
        <span className="absolute w-full h-[2px] top-1/2 -translate-y-1/2 bg-[#50746c] "></span>
        <div className="absolute right-10 bottom-10 flex gap-5 items-center select-none">
          <span className="w-10 h-10 rotate-45 bg-gray-500"></span>
          <h3 className="text-gray-500 text-5xl font-bold">K</h3>
        </div>
      </div>
    </div>
  );
};

export default Layout;
