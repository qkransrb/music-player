import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { SetAllSongs } from "../redux/userSlice";
import SongList from "../components/SongList";
import PlayList from "../components/PlayList";
import Player from "../components/Player";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        dispatch(ShowLoading());

        const { data } = await axios.post(
          "/api/songs/get-all-songs",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        dispatch(SetAllSongs(data.songs));
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        console.error(error);
        throw error;
      }
    };
    getAllSongs();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex gap-5">
        <div className="w-1/2">
          <SongList />
        </div>
        <div>
          <PlayList />
        </div>
      </div>
      <Player />
    </Fragment>
  );
};

export default Home;
