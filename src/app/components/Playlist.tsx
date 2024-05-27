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
    <div className="flex flex-col flex-1 justify-items-center border border-blue-500 ml-5 p-2" >
      
      <input 
      defaultValue={"Enter Playlist Name"} 
      onChange={handleNameChange} 
      className="border text-center mx-2 my-4 text-xl p-4 text-purple"
      />

      <TrackList tracks={playlistTracks} onRemove={onRemove}  isRemoval={true} />

      <button 
      className="border rounded-md w-fit p-5 mx-auto hover:bg-pink-200 text"
      onClick={savePlaylist}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
