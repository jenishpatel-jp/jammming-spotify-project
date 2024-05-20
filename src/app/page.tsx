'use client'

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from 'react';
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

export interface Track {
  id:string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

export default function Home() {

  const [accessToken, setAccessToken] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlistName, setPlayListName] = useState<string>("");
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);



  const addTrack = () => {

  }

  const removeTrack = () => {
    
  }

  const updatePlaylistName = () => {

  }


  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-stone-900 text-white">
      <Header/>
      <h1 className="m-4 p-5 text-5xl">Jammming</h1>
      <SearchBar />
      <div className="border flex flex-row mt-4 flex-1 w-full justify-between">
        <SearchResults  />
        <Playlist playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName}/>
      </div>

    </main>
  );
}