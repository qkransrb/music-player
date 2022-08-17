import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(ShowLoading());
      const { data } = await axios.post("/api/users/register", inputs);
      toast.success(data.message);
      navigate("/login");
      dispatch(HideLoading());
    } catch (error) {
      console.error(`register - ${error}`);
      dispatch(HideLoading());
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 w-96 p-5 shadow border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to Music</h1>
        <hr />
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={onChangeHandler}
            placeholder="Name"
            required
            className="focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={onChangeHandler}
            placeholder="Email"
            required
            className="focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={onChangeHandler}
            placeholder="Passsword"
            required
            className="focus:outline-none"
            autoComplete="false"
          />
          <button type="submit" className="primary">
            Register
          </button>
        </form>
        <Link to="/login" className="text-gray-600 underline">
          Click Here to Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
