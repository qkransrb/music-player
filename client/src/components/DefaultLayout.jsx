import React from "react";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="main">
      <header className="header flex justify-between items-center p-5 shadow">
        <h1 className="text-3xl text-gray-700 font-bold">Music Player</h1>
        <div className="flex items-center gap-2">
          <span className="text-xl">{user?.name}</span>
          <i
            className="ri-logout-circle-r-line text-xl cursor-pointer"
            onClick={logout}
          ></i>
        </div>
      </header>
      <div className="content">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
