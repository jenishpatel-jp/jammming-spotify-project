import React, { ChangeEvent } from "react";
import TrackList from "./TrackList";
import { Tracks } from "../page";

interface PlaylistProps {
  playlistTracks: Tracks[];
  onRemove: (track: Tracks) => void;
  onNameChange: (name: string) => void;
  savePlaylist: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  playlistTracks,
  onRemove,
  onNameChange,
  savePlaylist
}) => {

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="flex flex-col w-1/2 lg:flex-1 justify-items-center border-4 border-purple-500 ml-10 mr-10 mt-10 p-2 shadow-lg" >
      
      <input 
      placeholder="Enter Playlist Name"
      onChange={handleNameChange} 
      className="hidden lg:inline border-4 text-center mx-2 my-4 text-xl p-4 rounded-md border-pink-200 shadow-md font-medium active:border-purple-500 focus:border-purple-500 focus:outline-none placeholder-purple-500"
      />

      <TrackList tracks={playlistTracks} onRemove={onRemove}  isRemoval={true} />

      <button 
      className="border-4 rounded-md w-fit p-5 mx-auto hover:bg-pink-200 border-pink-200 shadow-md text-lg font-bold mt-7 hidden lg:inline"
      onClick={savePlaylist}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
