import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/userSlice";

const Player = () => {
  const audioRef = useRef();

  const dispatch = useDispatch();
  const { currentSong, currentSongIndex, allSongs } = useSelector(
    (state) => state.user
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const onPlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const onPause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const onPrev = () => {
    if (currentSongIndex > 0) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    }
  };

  const onNext = () => {
    if (currentSongIndex + 1 < allSongs.length) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [currentSong, dispatch, allSongs]);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 shadow-lg bg-gray-100 border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-1/3">
          <img
            src="https://www.pngimages.pics/images/quotes/english/general/music-symbol-png-clipart-52650-297684.png"
            alt="music"
            className="h-20 w-32"
          />
          <div className="flex flex-col">
            <span>{currentSong?.title}</span>
            <span>
              {currentSong &&
                `${currentSong.title}, ${currentSong.album}, ${currentSong.year}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <audio
            ref={audioRef}
            src={currentSong?.src}
            onTimeUpdate={(e) => {
              setCurrentTime(e.target.currentTime);
            }}
          ></audio>
          <div className="flex gap-4">
            <i className="ri-skip-back-line text-3xl" onClick={onPrev}></i>
            {isPlaying ? (
              <i className="ri-pause-line text-3xl" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-3xl" onClick={onPlay}></i>
            )}
            <i className="ri-skip-forward-line text-3xl" onClick={onNext}></i>
          </div>
          <div className="flex gap-3 items-center">
            <span>
              {Math.floor(currentTime / 60)}:
              {String(Math.floor(currentTime % 60)).length === 1
                ? `0${Math.floor(currentTime % 60)}`
                : Math.floor(currentTime % 60)}
            </span>
            <input
              type="range"
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
              }}
              min={0}
              // max={String(Number(currentSong?.duration.replace(":", ".")) * 60)}
              className="p-0 w-96"
            />
            <span>{currentSong?.duration}</span>
          </div>
        </div>

        <div className="w-1/3 flex justify-end items-center pr-14 gap-3">
          <i
            className="ri-volume-mute-line text-3xl"
            onClick={() => {
              audioRef.current.volume = 0;
              setVolume(0);
            }}
          ></i>
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />
          <i
            className="ri-volume-down-line text-3xl"
            onClick={() => {
              audioRef.current.volume = 1;
              setVolume(1);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Player;
