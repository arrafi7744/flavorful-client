import React from "react";

const OffersPage = () => {
  return (
    <div className="h-[85vh]">
      <div className="h-[40vh] bg-orange-100 flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide">Offers</h1>
          <p className="text-xl tracking-wide font-bold">{`Home > Offers`}</p>
        </div>
      </div>
      <div className="h-[45vh] text-center">
        <div className="grid grid-cols-6 gap-10  mx-20 py-20">
          <div className="">
            <div className="shadow-xl h-[20vh] rounded-sm bg-yellow-300 flex items-center justify-center">
              <p className="font-bold text-2xl">20$ off</p>
            </div>
            <div className="bg-yellow-200 h-[5vh] rounded-sm px-4 flex items-center justify-between">
              <p className="text-sm">BGBAZAR</p>
              <p className="text-xs text-slate-500">unavailable</p>
            </div>
          </div>
          <div className="">
            <div className="shadow-xl h-[20vh] rounded-sm bg-green-300 flex items-center justify-center">
              <p className="font-bold text-2xl">2$ off</p>
            </div>
            <div className="bg-green-200 h-[5vh] rounded-sm px-4 flex items-center justify-between">
              <p className="text-sm">EIDY</p>
              <p className="text-xs text-slate-500">unavailable</p>
            </div>
          </div>
          <div className="">
            <div className="shadow-xl h-[20vh] rounded-sm bg-pink-300 flex items-center justify-center">
              <p className="font-bold text-2xl">10$ off</p>
            </div>
            <div className="bg-pink-200 h-[5vh] rounded-sm px-4 flex items-center justify-between">
              <p className="text-sm">RAMADAN</p>
              <p className="text-xs text-slate-500">unavailable</p>
            </div>
          </div>
          <div className="">
            <div className="shadow-xl h-[20vh] rounded-sm bg-blue-300 flex items-center justify-center">
              <p className="font-bold text-2xl">5$ off</p>
            </div>
            <div className="bg-blue-200 h-[5vh] rounded-sm px-4 flex items-center justify-between">
              <p className="text-sm">WC2022</p>
              <p className="text-xs text-slate-500">unavailable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
