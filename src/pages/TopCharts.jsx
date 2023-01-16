import React from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetTopChartsQuery()
    
    if(isFetching) return <Loader title="Loading top charts"/>
    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>
            
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

export default TopCharts;