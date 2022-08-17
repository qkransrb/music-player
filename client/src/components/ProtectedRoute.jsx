import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SetUser } from "../redux/userSlice";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(ShowLoading());
        const { data } = await axios.post(
          "/api/users/get-user-data",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(SetUser(data));
        setReadyToRender(true);
        dispatch(HideLoading());
      } catch (error) {
        console.error(`getUserData - ${error}`);
        dispatch(HideLoading());
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    getUserData();
  }, [navigate]);

  return (
    <Fragment>
      {readyToRender && <DefaultLayout>{children}</DefaultLayout>}
    </Fragment>
  );
};

export default ProtectedRoute;
