import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/userSlice";

const SongList = () => {
  const dispatch = useDispatch();
  const { allSongs, currentSong } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Song, Artist, Album"
        className="rounded w-full"
      />
      {allSongs.map((song, index) => {
        const isPlaying = currentSong?._id === song._id;
        return (
          <div
            key={song._id}
            onClick={() => {
              dispatch(SetCurrentSong(song));
              dispatch(SetCurrentSongIndex(index));
            }}
            className={`flex justify-between items-center cursor-pointer p-2 hover:scale-105 duration-300 ${
              isPlaying && "shadow rounded border border-gray-300"
            }`}
          >
            <div className="flex flex-col">
              <span>{song.title}</span>
              <span>
                {song.artist} {song.album} {song.year}
              </span>
            </div>
            <div>
              <span>{song.duration}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
