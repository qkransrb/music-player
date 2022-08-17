import React from "react";

const Spinner = () => {
  return (
    <div className="absolute inset-0 bg-black opacity-80 z-50 flex justify-center items-center">
      <div className="h-20 w-20 border-4 border-gray-300 border-t-black/80 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
