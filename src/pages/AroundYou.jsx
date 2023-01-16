import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components'
import axios from 'axios'
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [ country, setCountry ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongsByCountryQuery(country)

    console.log(country)

    //render for country changes
    useEffect(()=>{
      // personal api key
      // at_CVIXvBeKJbkXL1yNir2iDjIlpHRJr
      axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_CVIXvBeKJbkXL1yNir2iDjIlpHRJr`)
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    },[country]);
    
    if(isFetching && loading) return <Loader title="Loading songs around you"/>
    if(error && country) return <Error />

    // use the country to fetch shazamCore API
    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You <span className="font-black">{country}</span>
            </h2>
            
            {/* wrapper for the song */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song,i)=>
                  (<SongCard 
                    i={i}
                    song={song}
                    key={song.key}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    data={data}
                  />
                  ))}
            </div>
        </div>
    )
}

export default AroundYou;
