// the graphic icon
import React from 'react';
import { FaPauseCircle,FaPlayCircle } from 'react-icons/fa'

const PlayPause = ({song,
  handlePause,handlePlay,isPlaying,activeSong}) => 
  (isPlaying && activeSong?.title===song.title?(
  //is playing the song, could pause it
  <FaPauseCircle size={35} className='text-gray-300' onClick={handlePause}/>
):(
  //is not playing the song, could play it
  <FaPlayCircle size={35} className='text-gray-300' onClick={handlePlay}/>
));

export default PlayPause;
