'use client'

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from 'react';
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import { useSession, signIn} from "next-auth/react";

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
  const {data: session} = useSession();
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tracks[]>([]);
  const [playlistName, setPlayListName] = useState<string>("");
  const [playlistTracks, setPlaylistTracks] = useState<Tracks[]>([]);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      const user = session.user as CustomSessionUser;
      console.log("Session user:", user)
      setAccessToken(user.accessToken || "");
    };
    console.log(session)
  }, 
  [session]);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken})
      });

      if (!response.ok){
        throw new Error('Failed to refresh access token')
      }
      
      const data = await response.json();
      console.log('New access token:', data.accessToken);

      setAccessToken(data.accessToken);

    } catch(error) {
      console.error('Failed to refresh access token:', error)
      signIn();
    }
  };



  useEffect(() => {

    const getUserProfile = async () => {
      if (!accessToken) {
        console.log('Access token not available yet');
        return;
      }
      const searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      };

      try {
        console.log('Fetching user profile with access token:', accessToken);
        const response = await fetch('https://api.spotify.com/v1/me', searchParameters);
        if (response.status === 401){
          const user = session?.user as CustomSessionUser;
          if (user.refreshToken){
            console.log('Access token expired, refresshing...');
            await refreshAccessToken(user.refreshToken);
          } else {
            throw new Error('No refresh token available');
          }
        } else if (response.ok){
          const data = await response.json();
          setUserID(data.id);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to get user profile', error);
      }
    };

    getUserProfile();
  }, [accessToken, session]);

  console.log(`user id is: ${userID}`);


  const addTrack = (track: Tracks) => {
    const existingTrack = playlistTracks.find(playlistTrack => playlistTrack.id === track.id);
    if (existingTrack) {
      console.log('Track already exists');
    } else {
      setPlaylistTracks([...playlistTracks, track]);
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
      const spotifyPlaylistName = playlistName;
      console.log(accessToken)
      const createPlaylistParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({name: spotifyPlaylistName, description:'Temporary playlist description', public: true})
      };

      const createPlayListResponse = await fetch (`https://api.spotify.com/v1/users/${userID}/playlists`, createPlaylistParameters);
      if (!createPlayListResponse.ok){
        throw new Error(`Failed to create playlist. Status: ${createPlayListResponse.status}`);
      }

      const playListData = await createPlayListResponse.json();
      console.log('Playlist created:', playListData)

    } catch (error) {
      console.error('failed to save playlist: ', error)
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-white text-purple-500">
      <Header/>
      <h1 className="m-4 p-5 text-5xl">Jammming</h1>
      <SearchBar onSearch={search} />
      <div className="flex flex-row mt-4 flex-1 w-full justify-between">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} savePlaylist={savePlaylist} />
      </div>
    </main>
  );
}