import React, { useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux' 
import { Swiper,SwiperSlide } from 'swiper/react' //could swiper content
import { FreeMode } from 'swiper'

import PlayPause from './PlayPause'
import { playPause,setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'

import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartCard=({song,i,isPlaying,activeSong,handlePauseClick,handlePlayClick})=>(
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {/* the number */}
    <h3 className="fot-bold text-base text-white mr-3">{i+1}.</h3>
    {/* the content */}
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title}
      className="w-20 h-20 rounded-lg"/>
      <div className="flex-1 flex flex-col justify-center mx-3">
        {/* show the name of song */}
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        
        {/* show the author of song */}
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>

    {/* handle pause or play*/}
    <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song}
    handlePause={handlePauseClick} handlePlay={handlePlayClick}>
    </PlayPause>
  </div>
)

const TopPlay = () => {
  //initiate some states
  const disPatch=useDispatch()
  const { activeSong,isPlaying } = useSelector((state)=>state.player)
  const { data }=useGetTopChartsQuery() //50 songs
  const divRef=useRef(null)

  //scorll the page to top
  useEffect(()=>{
    divRef.current.scrollIntoView({behavior:'smooth'})
  })

  const topPlays=data?.slice(0,5) //only take the first 5 songs

  //pause or play the song
  const handlePauseClick=()=>{
    disPatch(playPause(false))
  }
  
  const handlePlayClick=(song,i)=>{
    disPatch(setActiveSong({song,data,i}))
    disPatch(playPause(true))
  }

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      {/* Top Charts*/}
      <div className="w-full flex flex-col">

        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        {/* map top plays*/}
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song,i)=>(
            <TopChartCard key={song.key} song={song} i={i}
            isPlaying={isPlaying} activeSong={activeSong}
            handlePauseClick={handlePauseClick} handlePlayClick={()=>handlePlayClick(song,i)}/>
          ))}
        </div>
      </div>
      
      {/* Top Artists*/}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        
        {/* swiper the artists,top plays' first artist*/}
        <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds
        modules={[FreeMode]} className="mt-4">
          {topPlays?.map((song,i)=>(
            <SwiperSlide key={song?.key} style={{width:'25%',height:'auto'}}
            className="shadow-lg rounded-full animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images?.background}
                alt="name" className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default TopPlay;
