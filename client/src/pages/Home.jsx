import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-5xl">{user?.name}</h1>
    </div>
  );
};

export default Home;
