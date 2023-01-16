import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';//the component
import { playPause, setActiveSong } from '../redux/features/playerSlice';//the function

// display each song
const SongCard = ({song, i, activeSong, isPlaying, data}) => {
  //make change to the state
  const disPatch = useDispatch()

  const handlePauseClick=()=>{
    disPatch(playPause(false))
  }
  const handlePlayClick=()=>{
    disPatch(setActiveSong({song,data,i}))
    disPatch(playPause(true))
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        {/* The song currently plays*/}
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex${activeSong?.title===song.title ?'flex bg-black bg-opacity-70': 'hidden'}`}>
          <PlayPause song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick}
          isPlaying={isPlaying} activeSong={activeSong}/>
        </div>
        <img alt="song_image" src={song.images?.coverart}/>
      </div>

      {/* Show the title and subtitle */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song?.artists ? `/artists/${song?.artists[0]?.adamid}`:'/top-artists'}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  );
  
  }


export default SongCard;
