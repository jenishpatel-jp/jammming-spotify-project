'use client'

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from 'react';
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import { useSession, signIn, signOut } from "next-auth/react";

export interface Tracks {
  id:string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

interface CustomSessionUser {
  accessToken?: string; 
  refreshToken?: string;
  accessTokenExpires: number;
  name?: string;
  email?: string;
  image?: string;
}

export default function Home() {
  const {data: session, status} = useSession();
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tracks[]>([]);
  const [playlistName, setPlayListName] = useState<string>("");
  const [playlistTracks, setPlaylistTracks] = useState<Tracks[]>([]);

  useEffect(() => {
    if (session?.user) {
      setAccessToken((session.user as CustomSessionUser).accessToken || "");
    };
    console.log(accessToken)
  }, 
  [session]);


  const addTrack = (track: Tracks) => {
    const existingTrack = playlistTracks.find(playlistTrack => playlistTrack.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('Track already exists');
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  const removeTrack = (track: Tracks) => {
    const updatedPlaylist = playlistTracks.filter(song => song.id !== track.id);
    setPlaylistTracks(updatedPlaylist);
  }

  const updatePlaylistName = (name:string) => {
    setPlayListName(name);
  }

  // Search parameters needed for Get requests 
  let searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }

  const search = async (term:string) => {
    console.log(term);

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, searchParameters);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const searchedSongs = data.tracks.items.map((x:any) => ({
        id: x.id,
        name: x.name, 
        artist: x.artists[0].name,
        album: x.album.name,
        uri: x.uri
        }));
        setSearchResults(searchedSongs);
    } catch (error) {
      console.error('failed to search for songs: ', error)
    }
  }

  const savePlaylist = async() => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', searchParameters);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('failed to save playlist: ', error)
    }
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-stone-900 text-white">
      <Header/>
      <h1 className="m-4 p-5 text-5xl">Jammming</h1>
      <SearchBar onSearch={search} />
      <div className="border flex flex-row mt-4 flex-1 w-full justify-between">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName}/>
      </div>
    </main>
  );
}