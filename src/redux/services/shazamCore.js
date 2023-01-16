// fetch data from api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// call the api from store
export const shazamCoreApi = createApi({
  // name of the api
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '70827c2b51msh0f5e3c72b90b188p132898jsn68adb19c8ca1');
      return headers;
    } }),
  // build endpoints of api
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongDetails: builder.query({ query: ({songid})=> `v1/tracks/details?track_id=${songid}`}),
    getSongRelated: builder.query({ query: ({songid})=> `v1/tracks/related?track_id=${songid}`}),
    getArtistDetails: builder.query({ query: (artistId)=> `v2/artists/details?artist_id=${artistId}`}),
    getSongsByCountry: builder.query({ query: (countryCode)=> `v1/charts/country?country_code=${countryCode}`}),
    getSongsByGenre: builder.query({ query: (genre)=> `v1/charts/genre-world?genre_code=${genre}`}),
    getSongsBySearch: builder.query({ query: (searchTerm)=> `v1/search/multi/?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
