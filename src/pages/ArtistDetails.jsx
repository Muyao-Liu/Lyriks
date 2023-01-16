import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Error, Loader, DetailsHeader, RelatedSongs } from '../components'
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore'
import { data } from 'autoprefixer'

const ArtistDetails = () =>{
    const { id:artistId } = useParams()
    // why do you need the detail from song
    const { activeSong, isPlaying } = useSelector((state)=>state.player)
    const { data:artistData, isFetching:isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId)
    
    if(isFetchingArtistDetails) return <Loader title="Loading artist details"/>
    if(error) return <Error />

    //lead to a new page, show details about the artist on that page 
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

            <RelatedSongs 
                data={Object.values(artistData?.data[0].views['top-songs']?.data)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
}

export default ArtistDetails;
